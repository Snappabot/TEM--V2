import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Texture {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface UserMaterial {
  file: File;
  preview: string;
  label: string;
}

type Step = 'upload' | 'finish' | 'materials' | 'options' | 'result';

// ─── Textures (copied from FinishVisualizer.tsx) ──────────────────────────────

const textures: Texture[] = [
  // Marbellino
  { id: 'marbellino-taupe', name: 'Taupe', category: 'Marbellino', image: '/images/visualizer/marbellino-taupe.jpg' },
  { id: 'marbellino-charcoal', name: 'Charcoal', category: 'Marbellino', image: '/images/visualizer/marbellino-charcoal.jpg' },
  { id: 'marbellino-plum', name: 'Plum', category: 'Marbellino', image: '/images/visualizer/marbellino-plum.jpg' },
  { id: 'marbellino-sage', name: 'Sage', category: 'Marbellino', image: '/images/visualizer/marbellino-sage.jpg' },
  { id: 'marbellino-olive', name: 'Olive', category: 'Marbellino', image: '/images/visualizer/marbellino-olive.jpg' },
  { id: 'marbellino-steel', name: 'Steel', category: 'Marbellino', image: '/images/visualizer/marbellino-steel.jpg' },
  { id: 'marbellino-sand', name: 'Sand', category: 'Marbellino', image: '/images/visualizer/marbellino-sand.jpg' },
  { id: 'marbellino-seafoam', name: 'Seafoam', category: 'Marbellino', image: '/images/visualizer/marbellino-seafoam.jpg' },
  { id: 'marbellino-warmgrey', name: 'Warm Grey', category: 'Marbellino', image: '/images/visualizer/marbellino-warmgrey.jpg' },
  { id: 'marbellino-linen', name: 'Linen', category: 'Marbellino', image: '/images/visualizer/marbellino-linen.jpg' },
  { id: 'marbellino-silver', name: 'Silver', category: 'Marbellino', image: '/images/visualizer/marbellino-silver.jpg' },
  { id: 'marbellino-ivory', name: 'Ivory', category: 'Marbellino', image: '/images/visualizer/marbellino-ivory.jpg' },
  { id: 'marbellino-bianco', name: 'Bianco', category: 'Marbellino', image: '/images/visualizer/marbellino-bianco.jpg' },
  { id: 'marbellino-coldgrey', name: 'Cold Grey', category: 'Marbellino', image: '/images/visualizer/marbellino-coldgrey.jpg' },
  { id: 'marbellino-slateblue', name: 'Slate Blue', category: 'Marbellino', image: '/images/visualizer/marbellino-slateblue.jpg' },
  { id: 'marbellino-storm', name: 'Storm', category: 'Marbellino', image: '/images/visualizer/marbellino-storm.jpg' },
  { id: 'marbellino-eucalyptus', name: 'Eucalyptus', category: 'Marbellino', image: '/images/visualizer/marbellino-eucalyptus.jpg' },
  // Concretum
  { id: 'concretum-dark', name: 'Anthracite', category: 'Concretum', image: '/images/visualizer/concretum-dark.jpg' },
  { id: 'concretum-pitted', name: 'Weathered', category: 'Concretum', image: '/images/visualizer/concretum-pitted.jpg' },
  { id: 'concretum-grey', name: 'Raw', category: 'Concretum', image: '/images/visualizer/concretum-grey.jpg' },
  { id: 'concretum-rammed', name: 'Rammed', category: 'Concretum', image: '/images/visualizer/concretum-rammed.jpg' },
  // Rokka
  { id: 'rokka-earth', name: 'Earth', category: 'Rokka', image: '/images/visualizer/rokka-earth.jpg' },
  { id: 'rokka-grey', name: 'Stone', category: 'Rokka', image: '/images/visualizer/rokka-grey.jpg' },
  { id: 'rokka-bone', name: 'Warm Bone', category: 'Rokka', image: '/images/visualizer/rokka-bone.png' },
  { id: 'rokka-pilbara', name: 'Pilbara', category: 'Rokka', image: '/images/visualizer/rokka-pilbara.png' },
  { id: 'rokka-sample', name: 'Natural', category: 'Rokka', image: '/images/visualizer/rokka-sample.png' },
  // Metallics
  { id: 'metallic-bronze', name: 'Bronze', category: 'Metallics', image: '/images/visualizer/metallic-bronze.jpg' },
  { id: 'metallic-copper', name: 'Copper', category: 'Metallics', image: '/images/visualizer/metallic-copper.jpg' },
  { id: 'metallic-rust', name: 'Rust', category: 'Metallics', image: '/images/visualizer/metallic-rust.jpg' },
  { id: 'metallic-steel', name: 'Steel', category: 'Metallics', image: '/images/visualizer/metallic-steel.jpg' },
  { id: 'metallic-verdigris', name: 'Verdigris', category: 'Metallics', image: '/images/visualizer/metallic-verdigris.jpg' },
  // Tadellino
  { id: 'tadellino-natural', name: 'Natural', category: 'Tadellino', image: '/images/visualizer/tadelakt-natural.png' },
  { id: 'tadellino-green', name: 'Sage', category: 'Tadellino', image: '/images/visualizer/tadelakt-green.png' },
  { id: 'tadellino-blush', name: 'Blush', category: 'Tadellino', image: '/images/visualizer/tadelakt-blush.png' },
  { id: 'tadellino-white', name: 'Ivory', category: 'Tadellino', image: '/images/visualizer/tadelakt-white.png' },
  // Antique Stucco
  { id: 'stucco-raw', name: 'Raw', category: 'Antique Stucco', image: '/images/visualizer/stucco-raw.png' },
  { id: 'stucco-gold', name: 'Gold Patina', category: 'Antique Stucco', image: '/images/visualizer/stucco-gold.png' },
  { id: 'stucco-aged', name: 'Aged', category: 'Antique Stucco', image: '/images/visualizer/stucco-aged.png' },
  { id: 'stucco-exterior', name: 'Exterior', category: 'Antique Stucco', image: '/images/visualizer/stucco-exterior.png' },
  // Earthen Hemp
  { id: 'hemp-natural', name: 'Natural', category: 'Earthen Hemp', image: '/images/visualizer/hemp-natural.png' },
  { id: 'hemp-sand', name: 'Sand', category: 'Earthen Hemp', image: '/images/visualizer/hemp-sand.jpg' },
  { id: 'hemp-sandstone', name: 'Sandstone', category: 'Earthen Hemp', image: '/images/visualizer/hemp-sandstone.jpg' },
  { id: 'hemp-charcoal', name: 'Charcoal', category: 'Earthen Hemp', image: '/images/visualizer/hemp-charcoal.jpg' },
  { id: 'hemp-sage', name: 'Sage', category: 'Earthen Hemp', image: '/images/visualizer/hemp-sage.jpg' },
  { id: 'hemp-cream', name: 'Cream', category: 'Earthen Hemp', image: '/images/visualizer/hemp-cream.jpg' },
  { id: 'hemp-mocha', name: 'Mocha', category: 'Earthen Hemp', image: '/images/visualizer/hemp-mocha.jpg' },
  { id: 'hemp-lightsage', name: 'Light Sage', category: 'Earthen Hemp', image: '/images/visualizer/hemp-lightsage.jpg' },
  { id: 'hemp-grey', name: 'Grey', category: 'Earthen Hemp', image: '/images/visualizer/hemp-grey.jpg' },
  { id: 'hemp-white', name: 'White', category: 'Earthen Hemp', image: '/images/visualizer/hemp-white.jpg' },
  // Custom
  { id: 'custom-fractured', name: 'Fractured', category: 'Custom', image: '/images/visualizer/custom-fractured.png' },
  { id: 'custom-volcanic', name: 'Volcanic', category: 'Custom', image: '/images/visualizer/custom-volcanic.png' },
  { id: 'custom-moroccan', name: 'Moroccan', category: 'Custom', image: '/images/visualizer/custom-moroccan.png' },
  { id: 'custom-decay', name: 'State of Decay', category: 'Custom', image: '/images/visualizer/custom-decay.png' },
];

const CATEGORIES = ['Marbellino', 'Concretum', 'Rokka', 'Metallics', 'Tadellino', 'Antique Stucco', 'Earthen Hemp', 'Custom'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function imageUrlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return fileToBase64(blob as File);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TELogo() {
  return (
    <img
      src="/images/logo.png"
      alt="Troweled Earth"
      className="w-8 h-8 object-contain"
      style={{ filter: 'invert(1)' }}
    />
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-0.5 w-8 transition-all duration-300 ${
            i < current ? 'bg-[#8b7355]' : i === current ? 'bg-white' : 'bg-white/20'
          }`}
        />
      ))}
    </div>
  );
}

function UploadZone({
  onFile,
  preview,
  label,
  small = false,
}: {
  onFile: (file: File) => void;
  preview?: string;
  label: string;
  small?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  if (preview) {
    return (
      <div
        className={`relative overflow-hidden rounded-sm cursor-pointer group border border-white/10 ${
          small ? 'h-32' : 'h-64 md:h-96'
        }`}
        onClick={() => inputRef.current?.click()}
      >
        <img src={preview} alt="Preview" className="w-full h-full object-contain bg-white/5" />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-sm tracking-widest uppercase">Change</span>
        </div>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,application/pdf" className="hidden" onChange={handleChange} />
      </div>
    );
  }

  return (
    <div
      className={`border ${dragging ? 'border-[#8b7355]' : 'border-white/20'} border-dashed rounded-sm cursor-pointer transition-colors hover:border-white/40 flex flex-col items-center justify-center gap-4 ${
        small ? 'h-32' : 'h-64 md:h-96'
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-white/70 text-sm">{label}</p>
        <p className="text-white/30 text-xs mt-1">JPG, PNG — drag & drop or click</p>
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,application/pdf" className="hidden" onChange={handleChange} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ElevationVisualizer() {
  // State
  const [step, setStep] = useState<Step>('upload');
  const [elevationFile, setElevationFile] = useState<File | null>(null);
  const [elevationPreview, setElevationPreview] = useState<string>('');
  const [selectedTexture, setSelectedTexture] = useState<Texture | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Marbellino');
  const [userMaterials, setUserMaterials] = useState<UserMaterial[]>([]);
  const [applyToAll, setApplyToAll] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  // ── Handlers ──

  const handleElevationFile = useCallback(async (file: File) => {
    if (file.type === 'application/pdf') {
      setError('PDF upload is not supported in this browser. Please export your drawing as JPG or PNG first.');
      return;
    }
    setElevationFile(file);
    const preview = URL.createObjectURL(file);
    setElevationPreview(preview);
    setStep('finish');
    setError('');
  }, []);

  const handleUserMaterialFile = useCallback((file: File, index: number) => {
    const preview = URL.createObjectURL(file);
    setUserMaterials((prev) => {
      const next = [...prev];
      if (index < next.length) {
        next[index] = { ...next[index], file, preview };
      } else {
        next.push({ file, preview, label: '' });
      }
      return next;
    });
  }, []);

  const handleMaterialLabel = useCallback((index: number, label: string) => {
    setUserMaterials((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], label };
      return next;
    });
  }, []);

  const removeMaterial = useCallback((index: number) => {
    setUserMaterials((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!elevationFile || !selectedTexture) return;
    setGenerating(true);
    setError('');

    try {
      const elevationBase64 = await fileToBase64(elevationFile);
      const teFinishBase64 = await imageUrlToBase64(selectedTexture.image);

      const materials = await Promise.all(
        userMaterials.map(async (m) => ({
          image: await fileToBase64(m.file),
          label: m.label || 'reference material',
        }))
      );

      const response = await fetch('/api/visualize-elevation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          elevationImage: elevationBase64,
          teFinishImage: teFinishBase64,
          teFinishName: `${selectedTexture.category} ${selectedTexture.name}`,
          userMaterials: materials,
          applyToAllSurfaces: applyToAll,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Server error ${response.status}`);
      }

      const data = await response.json();
      if (!data.output) throw new Error('No output returned from API');
      setResultUrl(data.output);
      setStep('result');
    } catch (err: any) {
      setError(err.message || 'Generation failed. Please try again.');
    } finally {
      setGenerating(false);
    }
  }, [elevationFile, selectedTexture, userMaterials, applyToAll]);

  const resetToFinish = useCallback(() => {
    setSelectedTexture(null);
    setUserMaterials([]);
    setApplyToAll(false);
    setResultUrl('');
    setError('');
    setStep('finish');
  }, []);

  const resetAll = useCallback(() => {
    setElevationFile(null);
    setElevationPreview('');
    setSelectedTexture(null);
    setUserMaterials([]);
    setApplyToAll(false);
    setResultUrl('');
    setError('');
    setStep('upload');
  }, []);

  // ── Step map for indicator ──
  const stepIndex: Record<Step, number> = { upload: 0, finish: 1, materials: 2, options: 3, result: 4 };
  const TOTAL_STEPS = 4; // result not counted

  const filteredTextures = textures.filter((t) => t.category === activeCategory);

  // ── Render ──

  return (
    <div className="min-h-screen bg-black text-white font-['Inter',sans-serif]">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <TELogo />
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/40">Troweled Earth</p>
              <h1 className="text-sm tracking-[0.15em] uppercase text-white font-light">Elevation Visualiser</h1>
            </div>
          </div>
          {step !== 'upload' && step !== 'result' && (
            <StepIndicator current={stepIndex[step]} total={TOTAL_STEPS} />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">

          {/* ── Step: Upload ── */}
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-light tracking-wide text-white mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Upload your elevation drawing
                </h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  Upload a JPG or PNG of your architectural elevation. We'll apply your chosen TE finish and generate a photorealistic visualisation.
                </p>
              </div>
              <UploadZone onFile={handleElevationFile} label="Drop your elevation drawing here" />
              {error && (
                <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
              )}
            </motion.div>
          )}

          {/* ── Step: Finish Selection ── */}
          {step === 'finish' && (
            <motion.div
              key="finish"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <button onClick={resetAll} className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
                  <span>←</span> Start over
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
                {/* Left — elevation preview */}
                <div className="space-y-4">
                  <p className="text-xs tracking-widest uppercase text-white/40">Your drawing</p>
                  <div className="border border-white/10 rounded-sm overflow-hidden">
                    <img src={elevationPreview} alt="Elevation" className="w-full object-contain bg-white/5" />
                  </div>
                  {selectedTexture && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-[#8b7355]/40 rounded-sm p-3 flex items-center gap-3"
                    >
                      <img src={selectedTexture.image} alt={selectedTexture.name} className="w-12 h-12 object-cover rounded-sm" />
                      <div>
                        <p className="text-white text-sm">{selectedTexture.name}</p>
                        <p className="text-[#8b7355] text-xs">{selectedTexture.category}</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right — finish grid */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-light tracking-wide text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      Select a TE finish
                    </h2>
                    <p className="text-white/40 text-sm">Choose the finish to apply to your elevation.</p>
                  </div>

                  {/* Category tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 text-xs tracking-widest uppercase border transition-all ${
                          activeCategory === cat
                            ? 'border-[#8b7355] text-[#8b7355]'
                            : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/70'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Swatch grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {filteredTextures.map((texture) => (
                      <button
                        key={texture.id}
                        onClick={() => setSelectedTexture(texture)}
                        className={`group relative aspect-square rounded-sm overflow-hidden border transition-all ${
                          selectedTexture?.id === texture.id
                            ? 'border-[#8b7355] ring-1 ring-[#8b7355]'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <img
                          src={texture.image}
                          alt={texture.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute bottom-1.5 left-1.5 right-1.5 text-white text-[10px] leading-tight tracking-wide">
                          {texture.name}
                        </span>
                        {selectedTexture?.id === texture.id && (
                          <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#8b7355] rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => setStep('materials')}
                      disabled={!selectedTexture}
                      className={`flex-1 py-3.5 text-xs tracking-[0.2em] uppercase border transition-all ${
                        selectedTexture
                          ? 'border-white/30 text-white hover:border-white'
                          : 'border-white/10 text-white/20 cursor-not-allowed'
                      }`}
                    >
                      Next — Add Materials
                    </button>
                    <button
                      onClick={() => setStep('options')}
                      disabled={!selectedTexture}
                      className={`flex-1 py-3.5 text-xs tracking-[0.2em] uppercase border transition-all ${
                        selectedTexture
                          ? 'border-[#8b7355] text-[#8b7355] hover:bg-[#8b7355] hover:text-black'
                          : 'border-white/10 text-white/20 cursor-not-allowed'
                      }`}
                    >
                      Skip to Options →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step: User Materials ── */}
          {step === 'materials' && (
            <motion.div
              key="materials"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-8 flex items-center justify-between">
                <button onClick={() => setStep('finish')} className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
                  <span>←</span> Back
                </button>
                <StepIndicator current={2} total={TOTAL_STEPS} />
              </div>

              <h2 className="text-2xl font-light tracking-wide text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Add your own materials
                <span className="text-white/30 text-lg ml-2">(optional)</span>
              </h2>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">
                Upload up to 3 reference images for other materials on the elevation — timber, stone, tiles, cladding etc. Label each so the AI knows what it is.
              </p>

              <div className="space-y-4">
                {[0, 1, 2].map((i) => {
                  const mat = userMaterials[i];
                  return (
                    <div key={i} className="border border-white/10 rounded-sm p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-32 flex-shrink-0">
                          <UploadZone
                            onFile={(file) => handleUserMaterialFile(file, i)}
                            preview={mat?.preview}
                            label="Upload reference"
                            small
                          />
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-xs tracking-widest uppercase text-white/30 mb-2">Reference {i + 1}</p>
                          <input
                            type="text"
                            value={mat?.label || ''}
                            onChange={(e) => handleMaterialLabel(i, e.target.value)}
                            placeholder="e.g. spotted gum cladding"
                            disabled={!mat}
                            className="w-full bg-white/5 border border-white/20 rounded-sm px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#8b7355] disabled:opacity-30 transition-colors"
                          />
                          {mat && (
                            <button
                              onClick={() => removeMaterial(i)}
                              className="mt-2 text-xs text-white/30 hover:text-red-400 transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setStep('options')}
                className="mt-8 w-full py-3.5 text-xs tracking-[0.2em] uppercase border border-[#8b7355] text-[#8b7355] hover:bg-[#8b7355] hover:text-black transition-all"
              >
                Next →
              </button>
            </motion.div>
          )}

          {/* ── Step: Options ── */}
          {step === 'options' && (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-8 flex items-center justify-between">
                <button
                  onClick={() => setStep('materials')}
                  className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>←</span> Back
                </button>
                <StepIndicator current={3} total={TOTAL_STEPS} />
              </div>

              <h2 className="text-2xl font-light tracking-wide text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Surface options
              </h2>
              <p className="text-white/40 text-sm mb-10 leading-relaxed">
                Tell us how broadly to apply the finish across your elevation.
              </p>

              {/* Summary card */}
              <div className="border border-white/10 rounded-sm p-5 mb-8 flex items-center gap-4">
                {selectedTexture && (
                  <img src={selectedTexture.image} alt={selectedTexture.name} className="w-16 h-16 object-cover rounded-sm flex-shrink-0" />
                )}
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-0.5">Selected finish</p>
                  <p className="text-white font-medium">{selectedTexture?.name}</p>
                  <p className="text-[#8b7355] text-sm">{selectedTexture?.category}</p>
                  {userMaterials.length > 0 && (
                    <p className="text-white/30 text-xs mt-1">+ {userMaterials.length} reference material{userMaterials.length > 1 ? 's' : ''}</p>
                  )}
                </div>
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={applyToAll}
                    onChange={(e) => setApplyToAll(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border transition-all ${
                      applyToAll ? 'border-[#8b7355] bg-[#8b7355]' : 'border-white/30 bg-transparent group-hover:border-white/50'
                    } flex items-center justify-center`}
                  >
                    {applyToAll && (
                      <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-white text-sm leading-relaxed">
                    Apply finish to <strong>all wall surfaces</strong> including fascias, soffits, columns and piers
                  </p>
                  <p className="text-white/40 text-xs mt-1">
                    Leave unchecked to apply to walls only and skip ambiguous surfaces.
                  </p>
                </div>
              </label>

              {error && (
                <div className="mt-6 p-4 border border-red-500/30 bg-red-500/5 rounded-sm">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={generating}
                className={`mt-10 w-full py-4 text-sm tracking-[0.25em] uppercase transition-all ${
                  generating
                    ? 'border border-white/10 text-white/30 cursor-not-allowed'
                    : 'border border-[#8b7355] bg-[#8b7355] text-black hover:bg-transparent hover:text-[#8b7355]'
                }`}
              >
                {generating ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating your visualisation...
                  </span>
                ) : (
                  'Visualise'
                )}
              </button>
              {generating && (
                <p className="text-center text-white/30 text-xs mt-3">This usually takes 20–60 seconds</p>
              )}
            </motion.div>
          )}

          {/* ── Step: Result ── */}
          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 text-[#8b7355] mb-4"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs tracking-[0.2em] uppercase">Visualisation complete</span>
                </motion.div>
                <h2 className="text-3xl font-light tracking-wide text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {selectedTexture?.category} {selectedTexture?.name}
                </h2>
              </div>

              {/* Side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="space-y-2">
                  <p className="text-xs tracking-widest uppercase text-white/30 text-center">Original</p>
                  <div className="border border-white/10 rounded-sm overflow-hidden">
                    <img src={elevationPreview} alt="Original elevation" className="w-full object-contain bg-white/5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs tracking-widest uppercase text-[#8b7355] text-center">With {selectedTexture?.name}</p>
                  <div className="border border-[#8b7355]/30 rounded-sm overflow-hidden">
                    <img src={resultUrl} alt="Visualisation result" className="w-full object-contain bg-white/5" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={resultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border border-[#8b7355] text-[#8b7355] text-xs tracking-[0.2em] uppercase hover:bg-[#8b7355] hover:text-black transition-all"
                >
                  Download result
                </a>
                <button
                  onClick={resetToFinish}
                  className="px-8 py-3 border border-white/20 text-white/60 text-xs tracking-[0.2em] uppercase hover:border-white hover:text-white transition-all"
                >
                  Try another finish
                </button>
                <button
                  onClick={resetAll}
                  className="px-8 py-3 text-white/30 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
                >
                  New drawing
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
