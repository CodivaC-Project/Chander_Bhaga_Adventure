import { Metadata } from "next";
import { GalleryClient } from "./GalleryClient";
import { supabase } from "@/lib/supabase";

// Always render fresh data from the DB — admin CRUD should appear immediately
// without needing a rebuild/redeploy (otherwise the page is statically prerendered).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Glimpses of the breathtaking beauty of Kashmir and our adventure experiences.",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80";

export default async function GalleryPage() {
  const { data: galleryItems } = await supabase
    .from("gallery")
    .select("*")
    .order("order", { ascending: true });

  const images = (galleryItems || []).map((item) => ({
    src: item.imageUrl || DEFAULT_IMAGE,
    title: item.title || "Photo",
    category: item.category || "All",
  }));

  // Fallback if no gallery items exist
  const displayImages = images.length > 0 ? images : [
    { src: DEFAULT_IMAGE, title: "Dal Lake Sunset", category: "Srinagar" },
    { src: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200&q=80", title: "Gulmarg Skiing", category: "Gulmarg" },
    { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", title: "Mountain Peaks", category: "Pahalgam" },
  ];

  return <GalleryClient images={displayImages} />;
}
