import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Texture {
  id: string;
  name: string;
  category: string;
  image: string;
}

const textures: Texture[] = [
  // Marbellino
  { id: 'marbellino-dark', name: 'Charcoal', category: 'Marbellino', image: '/TEM--V2/images/visualizer/marbellino-dark.jpg' },
  { id: 'marbellino-slate', name: 'Slate', category: 'Marbellino', image: '/TEM--V2/images/visualizer/marbellino-slate.jpg' },
  { id: 'marbellino-grey', name: 'Storm', category: 'Marbellino', image: '/TEM--V2/images/visualizer/marbellino-grey.jpg' },
  { id: 'marbellino-light', name: 'Mist', category: 'Marbellino', image: '/TEM--V2/images/visualizer/marbellino-light.jpg' },
  { id: 'marbellino-cream', name: 'Cream', category: 'Marbellino', image: '/TEM--V2/images/visualizer/marbellino-cream.jpg' },
  { id: 'marbellino-white', name: 'Pearl', category: 'Marbellino', image: '/TEM--V2/images/visualizer/marbellino-white.jpg' },
  
  // Concretum
  { id: 'concretum-dark', name: 'Anthracite', category: 'Concretum', image: '/TEM--V2/images/visualizer/concretum-dark.jpg' },
  { id: 'concretum-pitted', name: 'Weathered', category: 'Concretum', image: '/TEM--V2/images/visualizer/concretum-pitted.jpg' },
  { id: 'concretum-grey', name: 'Raw', category: 'Concretum', image: '/TEM--V2/images/visualizer/concretum-grey.jpg' },
  { id: 'concretum-rammed', name: 'Rammed', category: 'Concretum', image: '/TEM--V2/images/visualizer/concretum-rammed.jpg' },
  
  // Rokka
  { id: 'rokka-earth', name: 'Earth', category: 'Rokka', image: '/TEM--V2/images/visualizer/rokka-earth.jpg' },
  { id: 'rokka-grey', name: 'Stone', category: 'Rokka', image: '/TEM--V2/images/visualizer/rokka-grey.jpg' },
  
  // Metallics
  { id: 'metallic-bronze', name: 'Bronze', category: 'Metallics', image: '/TEM--V2/images/visualizer/metallic-bronze.jpg' },
  { id: 'metallic-copper', name: 'Copper', category: 'Metallics', image: '/TEM--V2/images/visualizer/metallic-copper.jpg' },
  { id: 'metallic-rust', name: 'Rust', category: 'Metallics', image: '/TEM--V2/images/visualizer/metallic-rust.jpg' },
  { id: 'metallic-steel', name: 'Steel', category: 'Metallics', image: '/TEM--V2/images/visualizer/metallic-steel.jpg' },
  { id: 'metallic-verdigris', name: 'Verdigris', category: 'Metallics', image: '/TEM--V2/images/visualizer/metallic-verdigris.jpg' },
];

const categories = ['All', 'Marbellino', 'Concretum', 'Rokka', 'Metallics'];

export default function FinishVisualizer() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedTextures, setSelectedTextures] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setGeneratedImage(null);
        setShowResult(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTexture = (id: string) => {
    setSelectedTextures(prev => {
      if (prev.includes(id)) {
        return prev.filter(t => t !== id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const filteredTextures = activeCategory === 'All' 
    ? textures 
    : textures.filter(t => t.category === activeCategory);

  const handleGenerate = async () => {
    if (!uploadedImage || selectedTextures.length === 0) return;
    
    setIsGenerating(true);
    
    // TODO: Integrate with AI API (Replicate/OpenAI)
    // For now, simulate generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Placeholder - will be replaced with actual AI generation
    setGeneratedImage(uploadedImage);
    setShowResult(true);
    setIsGenerating(false);
  };

  const handleSave = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'troweled-earth-visualization.jpg';
    link.click();
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedTextures([]);
    setGeneratedImage(null);
    setShowResult(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <div className="py-16 px-8 text-center border-b border-neutral-800">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-light tracking-tight mb-4"
        >
          FINISH VISUALIZER
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 text-lg max-w-2xl mx-auto"
        >
          Upload your elevation photo, select up to 4 finishes, and see your vision come to life
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Upload & Preview */}
          <div>
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
              Step 1: Upload Your Photo
            </h2>
            
            <div 
              className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-dashed transition-colors ${
                uploadedImage ? 'border-transparent' : 'border-neutral-700 hover:border-neutral-500'
              }`}
            >
              {uploadedImage ? (
                <>
                  <img 
                    src={showResult && generatedImage ? generatedImage : uploadedImage} 
                    alt="Uploaded elevation" 
                    className="w-full h-full object-cover"
                  />
                  {showResult && (
                    <div className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                      AI Generated
                    </div>
                  )}
                  <button
                    onClick={handleReset}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-800 transition-colors">
                  <svg className="w-12 h-12 text-neutral-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-neutral-400">Click to upload elevation photo</span>
                  <span className="text-neutral-600 text-sm mt-1">JPG, PNG up to 10MB</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Selected Textures Preview */}
            {selectedTextures.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
                  Selected Finishes ({selectedTextures.length}/4)
                </h3>
                <div className="flex gap-3">
                  {selectedTextures.map((id, index) => {
                    const texture = textures.find(t => t.id === id);
                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                      >
                        <img 
                          src={texture?.image} 
                          alt={texture?.name}
                          className="w-16 h-16 rounded object-cover ring-2 ring-white"
                        />
                        <span className="absolute -top-2 -left-2 w-5 h-5 bg-white text-black text-xs flex items-center justify-center rounded-full font-medium">
                          {index + 1}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleGenerate}
                disabled={!uploadedImage || selectedTextures.length === 0 || isGenerating}
                className={`flex-1 py-4 px-6 rounded-lg font-medium transition-all ${
                  !uploadedImage || selectedTextures.length === 0 || isGenerating
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate Visualization'
                )}
              </button>
              
              {generatedImage && (
                <button
                  onClick={handleSave}
                  className="py-4 px-6 rounded-lg font-medium bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
                >
                  Save Image
                </button>
              )}
            </div>
          </div>

          {/* Right: Texture Selection */}
          <div>
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
              Step 2: Select Finishes (up to 4)
            </h2>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-white text-black'
                      : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Texture Grid */}
            <div className="grid grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-2">
              <AnimatePresence mode="popLayout">
                {filteredTextures.map(texture => {
                  const isSelected = selectedTextures.includes(texture.id);
                  const selectionIndex = selectedTextures.indexOf(texture.id);
                  
                  return (
                    <motion.button
                      key={texture.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => toggleTexture(texture.id)}
                      className={`relative aspect-square rounded-lg overflow-hidden group transition-all ${
                        isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-950' : ''
                      } ${selectedTextures.length >= 4 && !isSelected ? 'opacity-50' : ''}`}
                    >
                      <img 
                        src={texture.image} 
                        alt={texture.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 transition-opacity ${
                        isSelected ? 'bg-black/30' : 'bg-black/0 group-hover:bg-black/20'
                      }`} />
                      
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-white text-black text-sm flex items-center justify-center rounded-full font-medium">
                          {selectionIndex + 1}
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <p className="text-xs text-white font-medium">{texture.name}</p>
                        <p className="text-xs text-neutral-400">{texture.category}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="border-t border-neutral-800 py-16 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-light mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">1</span>
              </div>
              <h3 className="font-medium mb-2">Upload</h3>
              <p className="text-neutral-400 text-sm">Upload a photo of your wall, facade, or elevation</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">2</span>
              </div>
              <h3 className="font-medium mb-2">Select</h3>
              <p className="text-neutral-400 text-sm">Choose up to 4 finishes to visualize</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">3</span>
              </div>
              <h3 className="font-medium mb-2">Generate</h3>
              <p className="text-neutral-400 text-sm">AI creates a realistic visualization of your space</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
