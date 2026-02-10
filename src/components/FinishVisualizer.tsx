import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Troweled Earth Logo component
const TreeLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img 
    src="/TEM--V2/images/logo.png" 
    alt="Troweled Earth" 
    className={`${className} object-contain`}
    style={{ filter: 'brightness(0) invert(0.5)' }}
  />
);

interface Texture {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface UserSession {
  email: string;
  generationsUsed: number;
  createdAt: string;
}

interface LocationSelection {
  location: string;
  textureId: string | null;
}

interface LocationCategory {
  id: string;
  name: string;
  areas: string[];
}

const MAX_GENERATIONS = 10;

const locationCategories: LocationCategory[] = [
  {
    id: 'exterior-level1',
    name: 'Exterior - Level 1',
    areas: ['Main Walls', 'Balcony / Terrace', 'Columns & Pillars', 'Window Surrounds']
  },
  {
    id: 'exterior-ground',
    name: 'Exterior - Ground Floor',
    areas: ['Street Facade', 'Entry / Portico', 'Garage / Carport', 'Garden Walls']
  },
  {
    id: 'interior',
    name: 'Interior',
    areas: ['Feature Walls', 'Bathroom / Wet Areas', 'Stairwell', 'Fireplace Surround']
  }
];

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

const textureCategories = ['All', 'Marbellino', 'Concretum', 'Rokka', 'Metallics'];

export default function FinishVisualizer() {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [locationSelections, setLocationSelections] = useState<Record<string, string | null>>({});
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [activeTextureCategory, setActiveTextureCategory] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tem-visualizer-session');
    if (saved) {
      try {
        const session = JSON.parse(saved) as UserSession;
        setUserSession(session);
      } catch (e) {
        localStorage.removeItem('tem-visualizer-session');
      }
    }
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    const session: UserSession = {
      email,
      generationsUsed: 0,
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem('tem-visualizer-session', JSON.stringify(session));
    setUserSession(session);
  };

  const remainingGenerations = userSession 
    ? MAX_GENERATIONS - userSession.generationsUsed 
    : 0;

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

  const selectTextureForLocation = (textureId: string) => {
    if (!activeLocation) return;
    setLocationSelections(prev => ({
      ...prev,
      [activeLocation]: prev[activeLocation] === textureId ? null : textureId
    }));
  };

  const getSelectedLocationsCount = () => {
    return Object.values(locationSelections).filter(v => v !== null).length;
  };

  const filteredTextures = activeTextureCategory === 'All' 
    ? textures 
    : textures.filter(t => t.category === activeTextureCategory);

  const handleGenerate = async () => {
    if (!uploadedImage || getSelectedLocationsCount() === 0 || !userSession) return;
    if (remainingGenerations <= 0) return;
    
    setIsGenerating(true);
    
    // TODO: Integrate with AI API (Replicate/OpenAI)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update generation count
    const updatedSession = {
      ...userSession,
      generationsUsed: userSession.generationsUsed + 1,
    };
    localStorage.setItem('tem-visualizer-session', JSON.stringify(updatedSession));
    setUserSession(updatedSession);
    
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
    setLocationSelections({});
    setActiveLocation(null);
    setGeneratedImage(null);
    setShowResult(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getTextureById = (id: string) => textures.find(t => t.id === id);

  // Email Gate
  if (!userSession) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              FINISH VISUALIZER
            </h1>
            <p className="text-neutral-400">
              See your space transformed with our premium plaster finishes. 
              Enter your email to get 10 free visualizations.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-4 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
              />
              {emailError && (
                <p className="text-red-400 text-sm mt-2">{emailError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Start Visualizing
            </button>
          </form>

          <p className="text-neutral-600 text-xs text-center mt-6">
            By continuing, you agree to receive updates about Troweled Earth products. 
            You can unsubscribe at any time.
          </p>

          {/* Preview Grid */}
          <div className="mt-12 grid grid-cols-4 gap-2">
            {textures.slice(0, 8).map(t => (
              <div key={t.id} className="aspect-square rounded overflow-hidden opacity-50">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <div className="py-12 px-8 text-center border-b border-neutral-800">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-light tracking-tight mb-4"
        >
          FINISH VISUALIZER
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 text-lg max-w-2xl mx-auto"
        >
          Upload your elevation, select areas, and assign finishes to each
        </motion.p>
        
        {/* Generations Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-full"
        >
          <span className="text-neutral-500 text-sm">Visualizations remaining:</span>
          <span className={`font-medium ${remainingGenerations <= 3 ? 'text-amber-400' : 'text-white'}`}>
            {remainingGenerations} / {MAX_GENERATIONS}
          </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {remainingGenerations <= 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-light mb-4">You've used all your visualizations</h2>
            <p className="text-neutral-400 mb-8">
              Contact us to discuss your project and get more visualizations.
            </p>
            <a 
              href="/TEM--V2/#contact"
              className="inline-block px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Upload & Preview */}
            <div className="lg:col-span-5">
              <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
                Step 1: Upload Your Elevation
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
                    <span className="text-neutral-400">Click to upload elevation</span>
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

              {/* Selections Summary */}
              {getSelectedLocationsCount() > 0 && (
                <div className="mt-6 p-4 bg-neutral-900 rounded-lg">
                  <h3 className="text-sm font-medium text-neutral-400 mb-3">Your Selections</h3>
                  <div className="space-y-2">
                    {Object.entries(locationSelections)
                      .filter(([_, textureId]) => textureId !== null)
                      .map(([location, textureId]) => {
                        const texture = getTextureById(textureId!);
                        return (
                          <div key={location} className="flex items-center gap-3">
                            <img 
                              src={texture?.image} 
                              alt={texture?.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white truncate">{location}</p>
                              <p className="text-xs text-neutral-500">{texture?.category} - {texture?.name}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleGenerate}
                  disabled={!uploadedImage || getSelectedLocationsCount() === 0 || isGenerating}
                  className={`flex-1 py-4 px-6 rounded-lg font-medium transition-all ${
                    !uploadedImage || getSelectedLocationsCount() === 0 || isGenerating
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
                    Save
                  </button>
                )}
              </div>
            </div>

            {/* Right: Location & Finish Selection */}
            <div className="lg:col-span-7">
              <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
                Step 2: Click an area, then select a finish
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Location Selection */}
                <div className="space-y-3">
                  {locationCategories.map(category => (
                    <div key={category.id} className="bg-neutral-900 rounded-lg overflow-hidden">
                      <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider px-4 py-2 bg-neutral-800/50">
                        {category.name}
                      </h3>
                      <div className="p-2">
                        {category.areas.map(area => {
                          const isActive = activeLocation === area;
                          const selectedTexture = locationSelections[area];
                          const texture = selectedTexture ? getTextureById(selectedTexture) : null;
                          
                          return (
                            <button
                              key={area}
                              onClick={() => setActiveLocation(isActive ? null : area)}
                              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                                isActive 
                                  ? 'bg-white text-black' 
                                  : 'hover:bg-neutral-800'
                              }`}
                            >
                              {texture ? (
                                <img 
                                  src={texture.image} 
                                  alt={texture.name}
                                  className="w-8 h-8 rounded object-cover ring-2 ring-green-500"
                                />
                              ) : (
                                <div className={`w-8 h-8 rounded flex items-center justify-center ${
                                  isActive ? 'bg-neutral-200' : 'bg-neutral-800'
                                }`}>
                                  <TreeLogo className={`w-5 h-5 ${isActive ? 'text-neutral-500' : 'text-neutral-600'}`} />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${isActive ? 'text-black' : 'text-white'}`}>
                                  {area}
                                </p>
                                {texture && (
                                  <p className={`text-xs ${isActive ? 'text-neutral-600' : 'text-neutral-500'}`}>
                                    {texture.category} - {texture.name}
                                  </p>
                                )}
                              </div>
                              <svg 
                                className={`w-5 h-5 transition-transform ${isActive ? 'rotate-90' : ''} ${
                                  isActive ? 'text-black' : 'text-neutral-600'
                                }`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Finish Selection (shows when location is active) */}
                <div>
                  <AnimatePresence mode="wait">
                    {activeLocation ? (
                      <motion.div
                        key={activeLocation}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-neutral-900 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-medium text-white">
                            Select finish for <span className="text-amber-400">{activeLocation}</span>
                          </h3>
                          {locationSelections[activeLocation] && (
                            <button
                              onClick={() => setLocationSelections(prev => ({ ...prev, [activeLocation]: null }))}
                              className="text-xs text-neutral-500 hover:text-red-400 transition-colors"
                            >
                              Clear
                            </button>
                          )}
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
                          {textureCategories.map(cat => (
                            <button
                              key={cat}
                              onClick={() => setActiveTextureCategory(cat)}
                              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                                activeTextureCategory === cat
                                  ? 'bg-white text-black'
                                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        {/* Texture Grid */}
                        <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
                          {filteredTextures.map(texture => {
                            const isSelected = locationSelections[activeLocation] === texture.id;
                            
                            return (
                              <button
                                key={texture.id}
                                onClick={() => selectTextureForLocation(texture.id)}
                                className={`relative aspect-square rounded-lg overflow-hidden group transition-all ${
                                  isSelected ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-neutral-900' : ''
                                }`}
                              >
                                <img 
                                  src={texture.image} 
                                  alt={texture.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className={`absolute inset-0 transition-opacity ${
                                  isSelected ? 'bg-green-500/20' : 'bg-black/0 group-hover:bg-black/20'
                                }`} />
                                
                                {isSelected && (
                                  <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 text-white flex items-center justify-center rounded-full">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                )}
                                
                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
                                  <p className="text-[10px] text-white font-medium truncate">{texture.name}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-neutral-900/50 rounded-lg p-8 flex flex-col items-center justify-center h-full min-h-[300px]"
                      >
                        <TreeLogo className="w-16 h-16 text-neutral-700 mb-4" />
                        <p className="text-neutral-500 text-center">
                          Click on an area to select a finish
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="border-t border-neutral-800 py-12 px-8 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-light mb-6">How It Works</h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3">
                <TreeLogo className="w-7 h-7 text-neutral-400" />
              </div>
              <h3 className="font-medium mb-1 text-sm">Upload</h3>
              <p className="text-neutral-400 text-xs">Upload your elevation drawing</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3">
                <TreeLogo className="w-7 h-7 text-neutral-400" />
              </div>
              <h3 className="font-medium mb-1 text-sm">Customize</h3>
              <p className="text-neutral-400 text-xs">Assign finishes to each area</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3">
                <TreeLogo className="w-7 h-7 text-neutral-400" />
              </div>
              <h3 className="font-medium mb-1 text-sm">Generate</h3>
              <p className="text-neutral-400 text-xs">AI creates your visualization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
