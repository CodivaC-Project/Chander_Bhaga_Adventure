"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",
    title: "Dal Lake Sunset",
    category: "Srinagar",
  },
  {
    src: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200&q=80",
    title: "Gulmarg Skiing",
    category: "Gulmarg",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    title: "Mountain Peaks",
    category: "Pahalgam",
  },
  {
    src: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=1200&q=80",
    title: "Temple View",
    category: "Vaishno Devi",
  },
  {
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
    title: "Trek Trail",
    category: "Trekking",
  },
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
    title: "Kayaking Adventure",
    category: "Activities",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    title: "River Rafting",
    category: "Activities",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
    title: "Luxury Hotel",
    category: "Hotels",
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    title: "Resort View",
    category: "Hotels",
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
    title: "Mountain Resort",
    category: "Hotels",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
    title: "Valley Lodge",
    category: "Hotels",
  },
  {
    src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",
    title: "Houseboat Life",
    category: "Srinagar",
  },
];

const categories = [
  "All",
  "Srinagar",
  "Gulmarg",
  "Pahalgam",
  "Activities",
  "Hotels",
  "Vaishno Devi",
  "Trekking",
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        (selectedImage - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-20">
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Photo Gallery
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Glimpses of the breathtaking beauty of Kashmir and our adventure
            experiences.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container-custom py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((img, i) => (
              <div
                key={i}
                onClick={() => openLightbox(i)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-semibold">{img.title}</p>
                    <p className="text-white/70 text-sm">{img.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].title}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <p className="text-white font-semibold">
                {filteredImages[selectedImage].title}
              </p>
              <p className="text-white/60 text-sm">
                {filteredImages[selectedImage].category}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 text-white/60 text-sm">
            {selectedImage + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </>
  );
}
