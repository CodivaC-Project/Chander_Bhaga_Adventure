import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, PDFFont, PDFPage } from "pdf-lib";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminAuth } from "@/lib/admin-auth";

export const runtime = "nodejs";

type Settings = Record<string, string>;

function formatCurrency(amount: number, currency = "INR") {
  const symbol = currency === "USD" ? "$" : "₹";
  const n = Number.isFinite(amount) ? amount : 0;
  return `${symbol}${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "2-digit" });
}

function safeText(v: unknown, fallback = "-") {
  if (v === null || v === undefined || v === "") return fallback;
  return String(v);
}

function drawRight(page: PDFPage, text: string, xRight: number, y: number, font: PDFFont, size: number, color = rgb(0.1, 0.1, 0.1)) {
  const width = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: xRight - width, y, size, font, color });
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length === 0) return [""];
  const lines: string[] = [];
  let line = words[0];
  for (let i = 1; i < words.length; i++) {
    const test = `${line} ${words[i]}`;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) {
      line = test;
    } else {
      lines.push(line);
      line = words[i];
    }
  }
  lines.push(line);
  return lines;
}

async function getSettingsMap(): Promise<Settings> {
  const { data, error } = await supabaseAdmin.from("settings").select("key,value");
  if (error || !data) return {};
  const out: Settings = {};
  for (const row of data) out[row.key] = row.value;
  return out;
}

async function getServiceName(serviceType?: string, serviceId?: string): Promise<string | null> {
  if (!serviceType || !serviceId) return null;
  try {
    if (serviceType === "tour") {
      const { data } = await supabaseAdmin.from("tour_packages").select("title").eq("id", serviceId).maybeSingle();
      return data?.title ?? null;
    }
    if (serviceType === "adventure") {
      const { data } = await supabaseAdmin.from("adventures").select("title").eq("id", serviceId).maybeSingle();
      return data?.title ?? null;
    }
    if (serviceType === "hotel") {
      const { data } = await supabaseAdmin.from("hotels").select("name").eq("id", serviceId).maybeSingle();
      return data?.name ?? null;
    }
    if (serviceType === "taxi") {
      const { data } = await supabaseAdmin.from("taxis").select("vehicleName").eq("id", serviceId).maybeSingle();
      return data?.vehicleName ?? null;
    }
  } catch {
    return null;
  }
  return null;
}

export async function GET(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Booking ID required" }, { status: 400 });

    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();
    if (error || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const [settings, serviceName] = await Promise.all([
      getSettingsMap(),
      getServiceName(booking.serviceType, booking.serviceId),
    ]);

    const currency = settings.currency || "INR";
    const siteName = settings.siteName || "Chander Bhaga Adventure";
    const companyPhone = settings.phone || "";
    const companyEmail = settings.email || "";
    const companyAddress = settings.address || "";
    const companyWhatsapp = settings.whatsappNumber || "";
    const tagline = settings.tagline || "";

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const { width, height } = page.getSize();
    const margin = 48;
    let y = height - margin;

    const ink = rgb(0.12, 0.12, 0.12);
    const muted = rgb(0.38, 0.38, 0.38);
    const line = rgb(0.85, 0.85, 0.85);
    const accent = rgb(0.13, 0.33, 0.25); // deep green-ish

    // Header
    page.drawText(siteName, { x: margin, y, size: 20, font: fontBold, color: accent });
    y -= 18;
    if (tagline) {
      page.drawText(tagline, { x: margin, y, size: 9, font, color: muted });
      y -= 14;
    }
    const companyLines = [companyAddress, [companyPhone && `Phone: ${companyPhone}`, companyEmail && `Email: ${companyEmail}`].filter(Boolean).join("  |  "), companyWhatsapp && `WhatsApp: ${companyWhatsapp}`].filter(Boolean) as string[];
    for (const cl of companyLines) {
      for (const wl of wrapText(cl, font, 9, 300)) {
        page.drawText(wl, { x: margin, y, size: 9, font, color: muted });
        y -= 12;
      }
    }

    // Invoice title block (right)
    const invoiceNo = `INV-${safeText(booking.bookingId || booking.id)}`;
    const invoiceDate = formatDate(booking.createdAt || new Date().toISOString());
    const rightX = width - margin;
    let ry = height - margin;
    page.drawText("INVOICE", { x: rightX - fontBold.widthOfTextAtSize("INVOICE", 22), y: ry, size: 22, font: fontBold, color: ink });
    ry -= 22;
    drawRight(page, `Invoice No: ${invoiceNo}`, rightX, ry, font, 10, ink); ry -= 14;
    drawRight(page, `Invoice Date: ${invoiceDate}`, rightX, ry, font, 10, ink); ry -= 14;
    drawRight(page, `Booking ID: ${safeText(booking.bookingId)}`, rightX, ry, font, 10, muted); ry -= 14;
    drawRight(page, `Status: ${safeText(booking.status)} / ${safeText(booking.paymentStatus)}`, rightX, ry, font, 9, muted);

    y = Math.min(y, ry) - 18;
    page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 1, color: line });
    y -= 22;

    // Bill To & Booking Details columns
    const colGap = 24;
    const colW = (width - margin * 2 - colGap) / 2;
    const leftX = margin;
    const midX = margin + colW + colGap;

    page.drawText("Bill To", { x: leftX, y, size: 11, font: fontBold, color: ink });
    page.drawText("Booking Details", { x: midX, y, size: 11, font: fontBold, color: ink });
    y -= 16;

    const billTo = [
      safeText(booking.guestName),
      booking.guestEmail ? `Email: ${booking.guestEmail}` : null,
      booking.guestPhone ? `Phone: ${booking.guestPhone}` : null,
    ].filter(Boolean) as string[];

    const serviceLabel = serviceName
      ? `${serviceName} (${safeText(booking.serviceType)})`
      : `${safeText(booking.serviceType)}${booking.serviceId ? ` — ${booking.serviceId}` : ""}`;

    const bookingDetails = [
      `Service: ${serviceLabel}`,
      `Travel Date: ${formatDate(booking.date)}${booking.endDate ? ` to ${formatDate(booking.endDate)}` : ""}`,
      `Guests: ${safeText(booking.guests, "1")}`,
      booking.specialRequests ? `Notes: ${booking.specialRequests}` : null,
    ].filter(Boolean) as string[];

    const drawBlock = (lines: string[], x: number, startY: number) => {
      let yy = startY;
      for (const l of lines) {
        const wrapped = wrapText(l, font, 10, colW);
        for (const wl of wrapped) {
          page.drawText(wl, { x, y: yy, size: 10, font, color: ink });
          yy -= 14;
        }
      }
      return yy;
    };

    const yAfterLeft = drawBlock(billTo, leftX, y);
    const yAfterRight = drawBlock(bookingDetails, midX, y);
    y = Math.min(yAfterLeft, yAfterRight) - 18;

    // Items table
    const tableX = margin;
    const tableW = width - margin * 2;
    const colDesc = tableX + 10;
    const colQty = tableX + tableW * 0.62;
    const colRate = tableX + tableW * 0.78;
    const colAmtRight = tableX + tableW - 10;

    const drawTableHeader = (yy: number) => {
      page.drawRectangle({ x: tableX, y: yy - 6, width: tableW, height: 22, color: rgb(0.96, 0.96, 0.95) });
      page.drawText("Description", { x: colDesc, y: yy, size: 10, font: fontBold, color: ink });
      page.drawText("Qty", { x: colQty, y: yy, size: 10, font: fontBold, color: ink });
      drawRight(page, "Rate", colRate + 30, yy, fontBold, 10, ink);
      drawRight(page, "Amount", colAmtRight, yy, fontBold, 10, ink);
      return yy - 28;
    };

    y = drawTableHeader(y);

    const qty = Number(booking.guests || 1);
    const totalAmount = Number(booking.totalAmount || 0);
    const discountAmount = Number(booking.discountAmount || 0);
    const finalAmount = Number(booking.finalAmount ?? totalAmount - discountAmount);
    const rate = qty > 0 ? totalAmount / qty : totalAmount;

    const desc = serviceLabel;
    const descLines = wrapText(desc, font, 10, colQty - colDesc - 10);
    const rowHeight = Math.max(18, descLines.length * 14 + 4);
    let descY = y;
    for (const dl of descLines) {
      page.drawText(dl, { x: colDesc, y: descY, size: 10, font, color: ink });
      descY -= 14;
    }
    page.drawText(String(qty), { x: colQty, y, size: 10, font, color: ink });
    drawRight(page, formatCurrency(rate, currency), colRate + 30, y, font, 10, ink);
    drawRight(page, formatCurrency(totalAmount, currency), colAmtRight, y, font, 10, ink);
    y -= rowHeight;
    page.drawLine({ start: { x: tableX, y: y + 6 }, end: { x: tableX + tableW, y: y + 6 }, thickness: 0.5, color: line });
    y -= 10;

    // Totals
    const totalsLabelX = tableX + tableW * 0.6;
    const drawTotalRow = (label: string, value: string, bold = false, valueColor = ink) => {
      const f = bold ? fontBold : font;
      page.drawText(label, { x: totalsLabelX, y, size: bold ? 11 : 10, font: f, color: ink });
      drawRight(page, value, colAmtRight, y, f, bold ? 11 : 10, valueColor);
      y -= bold ? 18 : 15;
    };

    drawTotalRow("Subtotal", formatCurrency(totalAmount, currency));
    if (discountAmount > 0) {
      drawTotalRow(`Discount${booking.couponCode ? ` (${booking.couponCode})` : ""}`, `- ${formatCurrency(discountAmount, currency)}`, false, rgb(0.6, 0.1, 0.1));
    }
    page.drawLine({ start: { x: totalsLabelX - 6, y: y + 10 }, end: { x: tableX + tableW, y: y + 10 }, thickness: 0.8, color: line });
    drawTotalRow("Grand Total", formatCurrency(finalAmount, currency), true, accent);

    y -= 10;
    page.drawText(`Payment Status: ${safeText(booking.paymentStatus, "pending")}`, { x: margin, y, size: 10, font: fontBold, color: muted });

    // Footer
    const footerY = 60;
    page.drawLine({ start: { x: margin, y: footerY + 18 }, end: { x: width - margin, y: footerY + 18 }, thickness: 0.5, color: line });
    const footer1 = "Thank you for choosing us. This is a computer-generated invoice.";
    const footer2 = "For queries, contact us using the details above.";
    const f1w = font.widthOfTextAtSize(footer1, 9);
    const f2w = font.widthOfTextAtSize(footer2, 9);
    page.drawText(footer1, { x: (width - f1w) / 2, y: footerY + 6, size: 9, font, color: muted });
    page.drawText(footer2, { x: (width - f2w) / 2, y: footerY - 6, size: 9, font, color: muted });

    const pdfBytes = await pdfDoc.save();
    const filename = `${invoiceNo.replace(/[^a-zA-Z0-9-_]/g, "_")}.pdf`;

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("Invoice generation error:", err);
    return NextResponse.json({ error: err?.message || "Failed to generate invoice" }, { status: 500 });
  }
}
