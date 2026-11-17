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
    const siteName = settings.siteName || "Shri Mata Vaishno Devi Travels";
    const companyPhone = settings.phone || "";
    const companyEmail = settings.email || "";
    const companyAddress = settings.address || "";
    const license = settings.license || "";

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const { width, height } = page.getSize();
    const margin = 48;
    let y = height - margin;

    const ink = rgb(0.11, 0.12, 0.14);
    const muted = rgb(0.4, 0.42, 0.45);
    const line = rgb(0.86, 0.86, 0.86);
    const accent = rgb(0.09, 0.36, 0.28);

    // Header
    page.drawText(siteName, { x: margin, y, size: 18, font: fontBold, color: ink });
    y -= 20;
    const headerLines = [
      companyAddress && `Address: ${companyAddress}`,
      companyPhone && `Phone: ${companyPhone}`,
      companyEmail && `Email: ${companyEmail}`,
      license && `License: ${license}`,
    ].filter(Boolean) as string[];
    for (const hl of headerLines) {
      page.drawText(hl, { x: margin, y, size: 9.5, font, color: muted });
      y -= 12;
    }

    // Receipt box (right)
    const receiptNo = `RCP-${safeText(booking.bookingId, booking.id)}`;
    const receiptDate = formatDate(booking.updatedAt || booking.createdAt || new Date().toISOString());
    const boxW = 200;
    const boxH = 68;
    const boxX = width - margin - boxW;
    const boxY = height - margin - boxH + 10;
    page.drawRectangle({ x: boxX, y: boxY, width: boxW, height: boxH, borderColor: line, borderWidth: 1, color: rgb(0.985, 0.985, 0.98) });
    page.drawText("PAYMENT RECEIPT", { x: boxX + 12, y: boxY + boxH - 20, size: 13, font: fontBold, color: accent });
    page.drawText(`Receipt No: ${receiptNo}`, { x: boxX + 12, y: boxY + boxH - 38, size: 9.5, font, color: ink });
    page.drawText(`Receipt Date: ${receiptDate}`, { x: boxX + 12, y: boxY + boxH - 52, size: 9.5, font, color: ink });

    y = Math.min(y, boxY - 18);
    page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 1, color: line });
    y -= 22;

    // Bill to / booking details
    const colGap = 24;
    const colW = (width - margin * 2 - colGap) / 2;
    const leftX = margin;
    const rightX = margin + colW + colGap;

    page.drawText("Received From", { x: leftX, y, size: 10.5, font: fontBold, color: ink });
    page.drawText("Payment Details", { x: rightX, y, size: 10.5, font: fontBold, color: ink });
    y -= 14;

    const customerLines = [
      safeText(booking.guestName),
      booking.guestEmail ? String(booking.guestEmail) : null,
      booking.guestPhone ? String(booking.guestPhone) : null,
    ].filter(Boolean) as string[];

    const paymentStatus = safeText(booking.paymentStatus, "pending");
    const isPaid = String(booking.paymentStatus || "").toLowerCase() === "paid";
    const bookingLines = [
      `Booking ID: ${safeText(booking.bookingId)}`,
      `Booking Status: ${safeText(booking.status, "pending")}`,
      `Payment Status: ${paymentStatus}`,
      `Service Date: ${formatDate(booking.date)}`,
      `Guests: ${safeText(booking.guests, "1")}`,
    ];

    const startY = y;
    let ly = startY;
    for (const cl of customerLines) {
      const wrapped = wrapText(cl, font, 10, colW);
      for (const wl of wrapped) {
        page.drawText(wl, { x: leftX, y: ly, size: 10, font, color: ink });
        ly -= 13;
      }
    }

    let ry = startY;
    for (const bl of bookingLines) {
      const wrapped = wrapText(bl, font, 10, colW);
      for (const wl of wrapped) {
        page.drawText(wl, { x: rightX, y: ry, size: 10, font, color: ink });
        ry -= 13;
      }
    }

    y = Math.min(ly, ry) - 10;

    // Service description
    const serviceLabel = [serviceName || booking.serviceId || booking.serviceType, booking.serviceType ? `(${booking.serviceType})` : null]
      .filter(Boolean)
      .join(" ");

    page.drawText("Payment For", { x: margin, y, size: 10.5, font: fontBold, color: ink });
    y -= 14;
    const serviceLines = wrapText(serviceLabel || "Service booking", font, 10, width - margin * 2);
    for (const sl of serviceLines) {
      page.drawText(sl, { x: margin, y, size: 10, font, color: ink });
      y -= 13;
    }
    y -= 8;

    // Totals
    const totalAmount = Number(booking.totalAmount || 0);
    const discountAmount = Number(booking.discountAmount || 0);
    const finalAmount = Number(booking.finalAmount ?? totalAmount - discountAmount);
    const amountReceived = isPaid ? finalAmount : 0;
    const balanceDue = isPaid ? 0 : finalAmount;

    const totalsLabelX = margin + (width - margin * 2) * 0.55;
    const valueRight = width - margin;
    const drawTotalRow = (label: string, value: string, bold = false, valueColor = ink) => {
      const f = bold ? fontBold : font;
      page.drawText(label, { x: totalsLabelX, y, size: bold ? 11 : 10, font: f, color: ink });
      drawRight(page, value, valueRight, y, f, bold ? 11 : 10, valueColor);
      y -= bold ? 18 : 15;
    };

    page.drawLine({ start: { x: totalsLabelX - 6, y: y + 6 }, end: { x: width - margin, y: y + 6 }, thickness: 0.5, color: line });
    y -= 8;
    drawTotalRow("Subtotal", formatCurrency(totalAmount, currency));
    if (discountAmount > 0) {
      drawTotalRow(`Discount${booking.couponCode ? ` (${booking.couponCode})` : ""}`, `- ${formatCurrency(discountAmount, currency)}`, false, rgb(0.6, 0.1, 0.1));
    }
    drawTotalRow("Total Amount", formatCurrency(finalAmount, currency), true, ink);
    drawTotalRow("Amount Received", formatCurrency(amountReceived, currency), true, accent);
    drawTotalRow("Balance Due", formatCurrency(balanceDue, currency), false, balanceDue > 0 ? rgb(0.6, 0.1, 0.1) : ink);

    y -= 6;
    if (!isPaid) {
      page.drawText(
        "Note: This receipt reflects the recorded payment status. Amount received will be shown once payment is marked as paid.",
        { x: margin, y, size: 9, font, color: muted }
      );
      y -= 14;
    }

    // Footer
    const footerY = 60;
    page.drawLine({ start: { x: margin, y: footerY + 18 }, end: { x: width - margin, y: footerY + 18 }, thickness: 0.5, color: line });
    const footer1 = "Thank you for your payment. This is a computer-generated receipt.";
    const footer2 = "For queries, contact us using the details above.";
    const f1w = font.widthOfTextAtSize(footer1, 9);
    const f2w = font.widthOfTextAtSize(footer2, 9);
    page.drawText(footer1, { x: (width - f1w) / 2, y: footerY + 6, size: 9, font, color: muted });
    page.drawText(footer2, { x: (width - f2w) / 2, y: footerY - 6, size: 9, font, color: muted });

    const pdfBytes = await pdfDoc.save();
    const filename = `${receiptNo.replace(/[^a-zA-Z0-9-_]/g, "_")}.pdf`;

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("Receipt generation error:", err);
    return NextResponse.json({ error: err?.message || "Failed to generate receipt" }, { status: 500 });
  }
}
