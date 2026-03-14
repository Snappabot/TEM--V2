import { useState, useEffect } from 'react';

interface GalleryImage {
  src: string;
  title: string;
}

interface Props {
  gallery: GalleryImage[];
}

export default function GalleryWithLightbox({ gallery }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex(i => i === null ? null : (i + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setLightboxIndex(i => i === null ? null : (i - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, gallery.length]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((img, i) => (
          <div
            key={i}
            className="group relative aspect-square overflow-hidden bg-[#1a1a1a] cursor-pointer"
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-medium">{img.title}</span>
            </div>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-10"
            onClick={() => setLightboxIndex(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 text-white/70 hover:text-white p-2 z-10"
            onClick={e => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length); }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[90vh] px-16" onClick={e => e.stopPropagation()}>
            <img
              src={gallery[lightboxIndex].src}
              alt={gallery[lightboxIndex].title}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <p className="text-white/70 text-center mt-3 text-sm tracking-wide">
              {gallery[lightboxIndex].title}
            </p>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 text-white/70 hover:text-white p-2 z-10"
            onClick={e => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % gallery.length); }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs">
            {lightboxIndex + 1} / {gallery.length}
          </div>
        </div>
      )}
    </>
  );
}
