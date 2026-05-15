"use client";

import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  src: string;
  thumb: string;
}

export function ClassroomGallery({ photos }: { photos: Photo[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setLightboxIndex(index), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + photos.length) % photos.length : null
    );
  }, [photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, close, goNext, goPrev]);

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img
              src={photo.thumb}
              alt={`课堂照片 ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 sm:left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 sm:right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].src}
              alt={`课堂照片 ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>

          <p className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
