import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Troweled Earth Logo component
const TreeLogo = ({ className = "w-8 h-8", invert = true }: { className?: string; invert?: boolean }) => (
  <img 
    src="/images/logo.png" 
    alt="Troweled Earth" 
    className={`${className} object-contain`}
    style={invert ? { filter: 'invert(1)' } : undefined}
  />
);

interface Texture {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface UserSession {
  token: string;
  email: string;
  remainingGenerations: number;
  maxGenerations: number;
}

interface LocationCategory {
  id: string;
  name: string;
  areas: string[];
}

// Area colors for fill overlay
const AREA_COLORS: Record<string, { rgba: string; hex: string; name: string }> = {
  'Main Walls': { rgba: 'rgba(255, 100, 100, 0.35)', hex: '#ff6464', name: 'Red' },
  'Balcony / Terrace': { rgba: 'rgba(255, 255, 100, 0.35)', hex: '#ffff64', name: 'Yellow' },
  'Columns & Pillars': { rgba: 'rgba(100, 100, 255, 0.35)', hex: '#6464ff', name: 'Blue' },
  'Window Surrounds': { rgba: 'rgba(255, 100, 255, 0.35)', hex: '#ff64ff', name: 'Pink' },
  'Street Facade': { rgba: 'rgba(100, 255, 255, 0.35)', hex: '#64ffff', name: 'Cyan' },
  'Entry / Portico': { rgba: 'rgba(255, 165, 0, 0.35)', hex: '#ffa500', name: 'Orange' },
  'Garage / Carport': { rgba: 'rgba(100, 255, 100, 0.35)', hex: '#64ff64', name: 'Green' },
  'Garden Walls': { rgba: 'rgba(165, 100, 255, 0.35)', hex: '#a564ff', name: 'Purple' },
  'Feature Walls': { rgba: 'rgba(255, 200, 100, 0.35)', hex: '#ffc864', name: 'Gold' },
  'Bathroom / Wet Areas': { rgba: 'rgba(100, 200, 200, 0.35)', hex: '#64c8c8', name: 'Teal' },
  'Stairwell': { rgba: 'rgba(200, 150, 100, 0.35)', hex: '#c89664', name: 'Brown' },
  'Fireplace Surround': { rgba: 'rgba(255, 120, 80, 0.35)', hex: '#ff7850', name: 'Coral' },
};

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
  // Marbellino — 12 colours from palette grid
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
  
  // Tadelakt
  { id: 'tadelakt-natural', name: 'Natural', category: 'Tadelakt', image: '/images/visualizer/tadelakt-natural.png' },
  { id: 'tadelakt-green', name: 'Sage', category: 'Tadelakt', image: '/images/visualizer/tadelakt-green.png' },
  { id: 'tadelakt-blush', name: 'Blush', category: 'Tadelakt', image: '/images/visualizer/tadelakt-blush.png' },
  { id: 'tadelakt-white', name: 'Ivory', category: 'Tadelakt', image: '/images/visualizer/tadelakt-white.png' },
  
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
  
  // Custom Finishes
  { id: 'custom-fractured', name: 'Fractured', category: 'Custom', image: '/images/visualizer/custom-fractured.png' },
  { id: 'custom-volcanic', name: 'Volcanic', category: 'Custom', image: '/images/visualizer/custom-volcanic.png' },
  { id: 'custom-moroccan', name: 'Moroccan', category: 'Custom', image: '/images/visualizer/custom-moroccan.png' },
  { id: 'custom-decay', name: 'State of Decay', category: 'Custom', image: '/images/visualizer/custom-decay.png' },
];

const textureCategories = ['All', 'Marbellino', 'Concretum', 'Rokka', 'Metallics', 'Tadelakt', 'Antique Stucco', 'Earthen Hemp', 'Custom'];

// Auth form modes
type AuthMode = 'register' | 'login';

// Create boundary map with edge detection + dilation for flood fill
const createBoundaryMap = (imageData: ImageData): ImageData => {
  const { width, height, data } = imageData;
  
  // Create a grayscale version
  const gray = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    gray[i] = (data[i*4] * 0.299 + data[i*4+1] * 0.587 + data[i*4+2] * 0.114);
  }
  
  // Sobel edge detection
  const edges = new Float32Array(width * height);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      // Sobel X
      const gx = 
        -gray[(y-1)*width+(x-1)] + gray[(y-1)*width+(x+1)]
        -2*gray[y*width+(x-1)] + 2*gray[y*width+(x+1)]
        -gray[(y+1)*width+(x-1)] + gray[(y+1)*width+(x+1)];
      // Sobel Y
      const gy =
        -gray[(y-1)*width+(x-1)] - 2*gray[(y-1)*width+x] - gray[(y-1)*width+(x+1)]
        +gray[(y+1)*width+(x-1)] + 2*gray[(y+1)*width+x] + gray[(y+1)*width+(x+1)];
      
      edges[idx] = Math.sqrt(gx*gx + gy*gy);
    }
  }
  
  // Dilate edges (thicken lines by 2-3 pixels to close gaps in dashed lines)
  const dilated = new Float32Array(width * height);
  const dilateRadius = 3; // pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let maxVal = 0;
      for (let dy = -dilateRadius; dy <= dilateRadius; dy++) {
        for (let dx = -dilateRadius; dx <= dilateRadius; dx++) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
            maxVal = Math.max(maxVal, edges[ny * width + nx]);
          }
        }
      }
      dilated[y * width + x] = maxVal;
    }
  }
  
  // Create boundary image data - dark pixels where there are edges
  const boundaryData = new ImageData(width, height);
  const edgeThreshold = 30; // adjust this
  for (let i = 0; i < width * height; i++) {
    const isEdge = dilated[i] > edgeThreshold;
    // Edge pixels become black (boundary), non-edge keep original color
    if (isEdge) {
      boundaryData.data[i*4] = 0;
      boundaryData.data[i*4+1] = 0;
      boundaryData.data[i*4+2] = 0;
      boundaryData.data[i*4+3] = 255;
    } else {
      boundaryData.data[i*4] = data[i*4];
      boundaryData.data[i*4+1] = data[i*4+1];
      boundaryData.data[i*4+2] = data[i*4+2];
      boundaryData.data[i*4+3] = 255;
    }
  }
  
  return boundaryData;
};

// Flood fill that uses the boundary map for better edge detection
const floodFillWithBoundaries = (
  boundaryMap: ImageData,
  startX: number,
  startY: number,
  tolerance: number = 20
): boolean[] => {
  const { width, height, data } = boundaryMap;
  const filled = new Array(width * height).fill(false);
  
  // Bounds check
  if (startX < 0 || startX >= width || startY < 0 || startY >= height) {
    return filled;
  }
  
  // Don't fill if starting on an edge pixel
  const startIdx = (startY * width + startX) * 4;
  if (data[startIdx] === 0 && data[startIdx+1] === 0 && data[startIdx+2] === 0) {
    return filled; // started on a line
  }
  
  const startR = data[startIdx];
  const startG = data[startIdx + 1];
  const startB = data[startIdx + 2];
  
  const isEdge = (x: number, y: number): boolean => {
    const idx = (y * width + x) * 4;
    // Check if pixel is dark enough to be an edge/line
    return (data[idx] + data[idx+1] + data[idx+2]) / 3 < 50;
  };
  
  const colorMatch = (x: number, y: number): boolean => {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    if (isEdge(x, y)) return false; // Stop at edges
    const idx = (y * width + x) * 4;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    return Math.abs(r - startR) + Math.abs(g - startG) + Math.abs(b - startB) < tolerance * 3;
  };
  
  // Scanline flood fill using colorMatch with edge detection
  const stack: [number, number][] = [[startX, startY]];
  
  while (stack.length > 0) {
    let [x, y] = stack.pop()!;
    
    // Move to leftmost matching pixel in this row
    while (x > 0 && colorMatch(x - 1, y) && !filled[y * width + x - 1]) x--;
    
    let spanAbove = false;
    let spanBelow = false;
    
    while (x < width && colorMatch(x, y) && !filled[y * width + x]) {
      filled[y * width + x] = true;
      
      if (!spanAbove && y > 0 && colorMatch(x, y - 1) && !filled[(y - 1) * width + x]) {
        stack.push([x, y - 1]);
        spanAbove = true;
      } else if (spanAbove && (y <= 0 || !colorMatch(x, y - 1) || filled[(y - 1) * width + x])) {
        spanAbove = false;
      }
      
      if (!spanBelow && y < height - 1 && colorMatch(x, y + 1) && !filled[(y + 1) * width + x]) {
        stack.push([x, y + 1]);
        spanBelow = true;
      } else if (spanBelow && (y >= height - 1 || !colorMatch(x, y + 1) || filled[(y + 1) * width + x])) {
        spanBelow = false;
      }
      
      x++;
    }
  }
  
  return filled;
};

// Scanline flood fill algorithm - performant for large images (used for toggling off regions)
const floodFillScanline = (
  imageData: ImageData,
  startX: number,
  startY: number,
  tolerance: number = 20
): boolean[] => {
  const { width, height, data } = imageData;
  const filled = new Array(width * height).fill(false);
  
  // Bounds check
  if (startX < 0 || startX >= width || startY < 0 || startY >= height) {
    return filled;
  }
  
  const startIdx = (startY * width + startX) * 4;
  const startR = data[startIdx];
  const startG = data[startIdx + 1];
  const startB = data[startIdx + 2];
  
  const matches = (x: number, y: number): boolean => {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    const idx = (y * width + x) * 4;
    return Math.abs(data[idx] - startR) + Math.abs(data[idx + 1] - startG) + Math.abs(data[idx + 2] - startB) < tolerance * 3;
  };
  
  const stack: [number, number][] = [[startX, startY]];
  
  while (stack.length > 0) {
    let [x, y] = stack.pop()!;
    
    // Move to leftmost matching pixel in this row
    while (x > 0 && matches(x - 1, y) && !filled[y * width + x - 1]) x--;
    
    let spanAbove = false;
    let spanBelow = false;
    
    while (x < width && matches(x, y) && !filled[y * width + x]) {
      filled[y * width + x] = true;
      
      if (!spanAbove && y > 0 && matches(x, y - 1) && !filled[(y - 1) * width + x]) {
        stack.push([x, y - 1]);
        spanAbove = true;
      } else if (spanAbove && y > 0 && (!matches(x, y - 1) || filled[(y - 1) * width + x])) {
        spanAbove = false;
      }
      
      if (!spanBelow && y < height - 1 && matches(x, y + 1) && !filled[(y + 1) * width + x]) {
        stack.push([x, y + 1]);
        spanBelow = true;
      } else if (spanBelow && y < height - 1 && (!matches(x, y + 1) || filled[(y + 1) * width + x])) {
        spanBelow = false;
      }
      
      x++;
    }
  }
  
  return filled;
};

export default function FinishVisualizer() {
  const BYPASS_AUTH = true;
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  
  // Auth form state
  const [authMode, setAuthMode] = useState<AuthMode>('register');
  const [accessCode, setAccessCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  
  // Visualizer state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImageObj, setUploadedImageObj] = useState<HTMLImageElement | null>(null);
  const [locationSelections, setLocationSelections] = useState<Record<string, string | null>>({});
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [activeTextureCategory, setActiveTextureCategory] = useState('All');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Flood fill state (replaces paint mode)
  const [fillMode, setFillMode] = useState<string | null>(null);
  const [areaFills, setAreaFills] = useState<Record<string, boolean[]>>({});
  const [tolerance, setTolerance] = useState(20);
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null);
  const [boundaryMap, setBoundaryMap] = useState<ImageData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Touch tracking for tap detection
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  
  // Canvas refs
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Image dimensions
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      const savedToken = localStorage.getItem('tem-visualizer-token');
      if (!savedToken) {
        setIsCheckingSession(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/session', {
          headers: {
            'Authorization': `Bearer ${savedToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserSession({
            token: savedToken,
            email: data.email,
            remainingGenerations: data.remainingGenerations,
            maxGenerations: data.maxGenerations
          });
        } else {
          localStorage.removeItem('tem-visualizer-token');
        }
      } catch (error) {
        console.error('Session check failed:', error);
        localStorage.removeItem('tem-visualizer-token');
      }
      
      setIsCheckingSession(false);
    };

    checkSession();
  }, []);

  // Load image and extract ImageData when image is uploaded
  useEffect(() => {
    if (!uploadedImage) return;
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setUploadedImageObj(img);
      setCanvasSize({ width: img.width, height: img.height });
      
      // Calculate display size to fit container while maintaining aspect ratio
      const maxWidth = 600;
      const maxHeight = 450;
      const aspectRatio = img.width / img.height;
      
      let displayWidth = maxWidth;
      let displayHeight = displayWidth / aspectRatio;
      
      if (displayHeight > maxHeight) {
        displayHeight = maxHeight;
        displayWidth = displayHeight * aspectRatio;
      }
      
      setDisplaySize({ width: displayWidth, height: displayHeight });
      
      // Extract ImageData from original image for flood fill
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(img, 0, 0);
        const imgData = tempCtx.getImageData(0, 0, img.width, img.height);
        setOriginalImageData(imgData);
        
        // Compute boundary map with edge detection (async to avoid blocking UI)
        setIsProcessing(true);
        setBoundaryMap(null);
        setTimeout(() => {
          const boundary = createBoundaryMap(imgData);
          setBoundaryMap(boundary);
          setIsProcessing(false);
        }, 50); // small delay to let UI update
      }
      
      // Reset area fills
      setAreaFills({});
    };
    img.src = uploadedImage;
  }, [uploadedImage]);

  // Draw the main canvas with image and filled overlays
  const drawMainCanvas = useCallback(() => {
    const canvas = mainCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !uploadedImageObj) return;
    
    canvas.width = displaySize.width;
    canvas.height = displaySize.height;
    
    // Draw the original image
    ctx.drawImage(uploadedImageObj, 0, 0, displaySize.width, displaySize.height);
    
    // Draw all filled area overlays
    Object.entries(areaFills).forEach(([area, mask]) => {
      if (!mask || mask.length === 0) return;
      
      const color = AREA_COLORS[area];
      if (!color) return;
      
      // Check if there are any filled pixels
      const hasFill = mask.some(v => v);
      if (!hasFill) return;
      
      // Create overlay image data at display size
      const overlayCanvas = document.createElement('canvas');
      overlayCanvas.width = displaySize.width;
      overlayCanvas.height = displaySize.height;
      const overlayCtx = overlayCanvas.getContext('2d');
      if (!overlayCtx) return;
      
      const overlayData = overlayCtx.createImageData(displaySize.width, displaySize.height);
      
      // Parse color
      const r = parseInt(color.hex.slice(1, 3), 16);
      const g = parseInt(color.hex.slice(3, 5), 16);
      const b = parseInt(color.hex.slice(5, 7), 16);
      const a = Math.round(0.35 * 255);
      
      // Scale from full resolution to display size
      const scaleX = canvasSize.width / displaySize.width;
      const scaleY = canvasSize.height / displaySize.height;
      
      for (let dy = 0; dy < displaySize.height; dy++) {
        for (let dx = 0; dx < displaySize.width; dx++) {
          const sx = Math.floor(dx * scaleX);
          const sy = Math.floor(dy * scaleY);
          const srcIdx = sy * canvasSize.width + sx;
          
          if (mask[srcIdx]) {
            const dstIdx = (dy * displaySize.width + dx) * 4;
            overlayData.data[dstIdx] = r;
            overlayData.data[dstIdx + 1] = g;
            overlayData.data[dstIdx + 2] = b;
            overlayData.data[dstIdx + 3] = a;
          }
        }
      }
      
      overlayCtx.putImageData(overlayData, 0, 0);
      ctx.drawImage(overlayCanvas, 0, 0);
    });
  }, [uploadedImageObj, displaySize, canvasSize, areaFills]);

  // Redraw canvas whenever dependencies change
  useEffect(() => {
    drawMainCanvas();
  }, [drawMainCanvas]);

  // Get coordinates from mouse/touch event (full resolution coords)
  const getCoords = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    const canvas = mainCanvasRef.current;
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      if (e.type === 'touchend') {
        // For touchend, use changedTouches
        if (e.changedTouches.length === 0) return null;
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else {
        if (e.touches.length === 0) return null;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // Convert display coords to full-resolution coords
    const scaleX = canvasSize.width / rect.width;
    const scaleY = canvasSize.height / rect.height;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  // Handle touch start (track position for tap detection)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!fillMode) return;
    const coords = getCoords(e);
    if (coords) {
      touchStartRef.current = coords;
    }
  };

  // Handle canvas tap for flood fill
  const handleCanvasTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (!fillMode || !boundaryMap || isProcessing) return;
    e.preventDefault();
    
    const coords = getCoords(e);
    if (!coords) return;
    
    // For touch events, check if it was a tap (not a drag)
    if ('touches' in e && touchStartRef.current) {
      const dx = Math.abs(coords.x - touchStartRef.current.x);
      const dy = Math.abs(coords.y - touchStartRef.current.y);
      // If moved more than 20 pixels, it's a drag not a tap
      if (dx > 20 || dy > 20) {
        touchStartRef.current = null;
        return;
      }
    }
    touchStartRef.current = null;
    
    const x = Math.round(coords.x);
    const y = Math.round(coords.y);
    
    // Check bounds
    if (x < 0 || x >= canvasSize.width || y < 0 || y >= canvasSize.height) return;
    
    // Check if this pixel is already filled for this area - toggle it off
    const existingMask = areaFills[fillMode];
    const pixelIdx = y * canvasSize.width + x;
    
    if (existingMask && existingMask[pixelIdx]) {
      // This spot is filled - run flood fill to find the connected region and remove it
      // Use boundary map for consistent behavior
      const regionToRemove = floodFillWithBoundaries(boundaryMap, x, y, tolerance);
      
      // Remove the region from the existing mask
      setAreaFills(prev => {
        const existing = prev[fillMode] || [];
        const newMask = existing.map((v, i) => v && !regionToRemove[i]);
        return { ...prev, [fillMode]: newMask };
      });
    } else {
      // Run flood fill from tap point using boundary map (edge-strengthened)
      const filled = floodFillWithBoundaries(boundaryMap, x, y, tolerance);
      
      // Merge with existing fills for this area (union)
      setAreaFills(prev => {
        const existing = prev[fillMode] || new Array(canvasSize.width * canvasSize.height).fill(false);
        const merged = existing.map((v, i) => v || filled[i]);
        return { ...prev, [fillMode]: merged };
      });
    }
  };

  // Clear fill for an area
  const clearAreaFill = (area: string) => {
    setAreaFills(prev => {
      const newFills = { ...prev };
      delete newFills[area];
      return newFills;
    });
  };

  // Check if an area has any filled pixels
  const hasAreaFill = (area: string): boolean => {
    const mask = areaFills[area];
    return mask ? mask.some(v => v) : false;
  };

  // Load texture image
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Generate visualization using canvas compositing
  const handleGenerate = async () => {
    if (!uploadedImageObj || getSelectedLocationsCount() === 0) return;
    
    setGenerationError(null);
    
    try {
      // Create the output canvas at full resolution
      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = canvasSize.width;
      outputCanvas.height = canvasSize.height;
      const ctx = outputCanvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      
      // Draw original image
      ctx.drawImage(uploadedImageObj, 0, 0);
      
      // Check if any areas have been filled
      const filledAreas = Object.entries(areaFills).filter(([area, mask]) => 
        mask && mask.some(v => v) && locationSelections[area]
      );
      
      if (filledAreas.length > 0) {
        // Use filled masks for compositing
        for (const [area, mask] of filledAreas) {
          const textureId = locationSelections[area];
          if (!textureId) continue;
          
          const texture = getTextureById(textureId);
          if (!texture) continue;
          
          // Load texture image
          const textureImg = await loadImage(texture.image);
          
          // Create temporary canvas for textured area
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = canvasSize.width;
          tempCanvas.height = canvasSize.height;
          const tempCtx = tempCanvas.getContext('2d');
          if (!tempCtx) continue;
          
          // Create tiled pattern from texture
          const pattern = tempCtx.createPattern(textureImg, 'repeat');
          if (!pattern) continue;
          
          tempCtx.fillStyle = pattern;
          tempCtx.fillRect(0, 0, canvasSize.width, canvasSize.height);
          
          // Create mask canvas from boolean array
          const maskCanvas = document.createElement('canvas');
          maskCanvas.width = canvasSize.width;
          maskCanvas.height = canvasSize.height;
          const maskCtx = maskCanvas.getContext('2d');
          if (!maskCtx) continue;
          
          const maskData = maskCtx.createImageData(canvasSize.width, canvasSize.height);
          for (let i = 0; i < mask.length; i++) {
            if (mask[i]) {
              const idx = i * 4;
              maskData.data[idx] = 255;
              maskData.data[idx + 1] = 255;
              maskData.data[idx + 2] = 255;
              maskData.data[idx + 3] = 255;
            }
          }
          maskCtx.putImageData(maskData, 0, 0);
          
          // Use the mask to cut out the textured area
          tempCtx.globalCompositeOperation = 'destination-in';
          tempCtx.drawImage(maskCanvas, 0, 0);
          
          // Composite textured area onto main canvas with multiply blend
          ctx.globalCompositeOperation = 'multiply';
          ctx.drawImage(tempCanvas, 0, 0);
        }
        
        // Redraw original lines on top with reduced opacity for definition
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.5;
        ctx.drawImage(uploadedImageObj, 0, 0);
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = 'source-over';
        
      } else {
        // No filled areas - apply first texture as full overlay
        const firstSelection = Object.entries(locationSelections).find(([_, id]) => id !== null);
        if (firstSelection) {
          const texture = getTextureById(firstSelection[1]!);
          if (texture) {
            const textureImg = await loadImage(texture.image);
            
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvasSize.width;
            tempCanvas.height = canvasSize.height;
            const tempCtx = tempCanvas.getContext('2d');
            if (tempCtx) {
              const pattern = tempCtx.createPattern(textureImg, 'repeat');
              if (pattern) {
                tempCtx.fillStyle = pattern;
                tempCtx.fillRect(0, 0, canvasSize.width, canvasSize.height);
                
                // Apply with multiply blend
                ctx.globalCompositeOperation = 'multiply';
                ctx.globalAlpha = 0.7;
                ctx.drawImage(tempCanvas, 0, 0);
                ctx.globalAlpha = 1.0;
                
                // Redraw lines
                ctx.globalCompositeOperation = 'multiply';
                ctx.globalAlpha = 0.4;
                ctx.drawImage(uploadedImageObj, 0, 0);
                ctx.globalAlpha = 1.0;
                ctx.globalCompositeOperation = 'source-over';
              }
            }
          }
        }
      }
      
      // Convert to data URL
      const resultUrl = outputCanvas.toDataURL('image/jpeg', 0.92);
      setGeneratedImage(resultUrl);
      setShowResult(true);
      setFillMode(null);
      
    } catch (error) {
      console.error('Generation error:', error);
      setGenerationError(error instanceof Error ? error.message : 'Generation failed. Please try again.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: accessCode.toUpperCase(),
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('tem-visualizer-token', data.token);
      setUserSession({
        token: data.token,
        email: data.email,
        remainingGenerations: data.remainingGenerations,
        maxGenerations: 10
      });

    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('tem-visualizer-token', data.token);
      setUserSession({
        token: data.token,
        email: data.email,
        remainingGenerations: data.remainingGenerations,
        maxGenerations: 10
      });

    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tem-visualizer-token');
    setUserSession(null);
    setEmail('');
    setPassword('');
    setAccessCode('');
    setAuthMode('register');
  };

  const remainingGenerations = userSession?.remainingGenerations ?? (BYPASS_AUTH ? 999 : 0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setGeneratedImage(null);
        setShowResult(false);
        setFillMode(null);
        setAreaFills({});
        setBoundaryMap(null);
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

  const getFilledAreasCount = () => {
    return Object.entries(areaFills).filter(([_, mask]) => mask && mask.some(v => v)).length;
  };

  const filteredTextures = activeTextureCategory === 'All' 
    ? textures 
    : textures.filter(t => t.category === activeTextureCategory);

  const handleSave = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'troweled-earth-visualization.jpg';
    link.click();
  };

  const handleReset = () => {
    setUploadedImage(null);
    setUploadedImageObj(null);
    setLocationSelections({});
    setActiveLocation(null);
    setGeneratedImage(null);
    setShowResult(false);
    setGenerationError(null);
    setFillMode(null);
    setAreaFills({});
    setOriginalImageData(null);
    setBoundaryMap(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getTextureById = (id: string) => textures.find(t => t.id === id);

  // Loading state while checking session
  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-8 h-8 text-neutral-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-neutral-500">Loading...</span>
        </div>
      </div>
    );
  }

  // Auth Gate — BYPASS FOR TESTING
  if (!userSession && !BYPASS_AUTH) {
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
              {authMode === 'register' 
                ? ' Enter your access code to get started.'
                : ' Log in to continue.'}
            </p>
          </div>

          {authMode === 'register' ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-500 mb-2">Access Code</label>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  placeholder="TEM-XXXX-XXXX"
                  className="w-full px-4 py-4 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors font-mono tracking-wider"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-500 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-4 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-500 mb-2">Create Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-4 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                  required
                  minLength={6}
                />
              </div>
              
              {authError && (
                <p className="text-red-400 text-sm">{authError}</p>
              )}
              
              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full py-4 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthLoading ? 'Creating Account...' : 'Register & Start Visualizing'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-500 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-4 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-500 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full px-4 py-4 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                  required
                />
              </div>
              
              {authError && (
                <p className="text-red-400 text-sm">{authError}</p>
              )}
              
              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full py-4 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthLoading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            {authMode === 'register' ? (
              <button 
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                className="text-neutral-400 hover:text-white transition-colors text-sm"
              >
                Already have an account? <span className="underline">Log in</span>
              </button>
            ) : (
              <button 
                onClick={() => { setAuthMode('register'); setAuthError(''); }}
                className="text-neutral-400 hover:text-white transition-colors text-sm"
              >
                Have an access code? <span className="underline">Register</span>
              </button>
            )}
          </div>

          <p className="text-neutral-600 text-xs text-center mt-6">
            Access codes are provided to customers discussing projects with Troweled Earth.
            <br />
            <a href="/#contact" className="underline hover:text-neutral-400">Contact us</a> to request access.
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
          Upload your elevation, tap to fill areas, and see instant results
        </motion.p>
        
        {/* User Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-full">
            <span className="text-neutral-500 text-sm">Logged in as</span>
            <span className="text-white text-sm">{userSession?.email || 'Test Mode'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-neutral-500 hover:text-white text-sm transition-colors"
          >
            Log out
          </button>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left: Upload & Preview */}
          <div className="lg:col-span-5">
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
              Step 1: Upload Your Elevation
            </h2>
            
            <div 
              ref={containerRef}
              className={`relative rounded-lg overflow-hidden border-2 border-dashed transition-colors ${
                uploadedImage ? 'border-transparent' : 'border-neutral-700 hover:border-neutral-500'
              }`}
              style={{ aspectRatio: '4/3' }}
            >
              {uploadedImage && uploadedImageObj ? (
                <>
                  {/* Canvas for display and tap-to-fill */}
                  <div className="relative w-full h-full flex items-center justify-center bg-neutral-900">
                    <canvas
                      ref={mainCanvasRef}
                      className={`max-w-full max-h-full ${fillMode ? 'cursor-crosshair' : ''}`}
                      style={{ 
                        width: displaySize.width, 
                        height: displaySize.height,
                        touchAction: fillMode ? 'none' : 'auto'
                      }}
                      onClick={handleCanvasTap}
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleCanvasTap}
                    />
                    
                    {/* Show generated result overlay */}
                    {showResult && generatedImage && (
                      <img 
                        src={generatedImage} 
                        alt="Generated visualization" 
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    )}
                    
                    {/* Processing indicator */}
                    {isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                        <div className="bg-black/80 text-white text-sm px-4 py-3 rounded-lg flex items-center gap-3">
                          <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Processing image...
                        </div>
                      </div>
                    )}
                    
                    {/* Fill mode indicator and instruction */}
                    {fillMode && !isProcessing && (
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <div className="bg-black/70 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-2">
                          <motion.span 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: AREA_COLORS[fillMode]?.hex }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          />
                          Tap to fill: {fillMode}
                        </div>
                      </div>
                    )}
                    
                    {/* Fill mode instruction overlay */}
                    {fillMode && !hasAreaFill(fillMode) && !isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/50 text-white text-sm px-4 py-2 rounded-lg">
                          Tap on the areas you want to fill
                        </div>
                      </div>
                    )}
                    
                    {showResult && (
                      <div className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                        Visualization Complete
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={handleReset}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
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

            {/* Tolerance Slider (shows when in fill mode) */}
            {uploadedImage && fillMode && (
              <div className="mt-4 p-4 bg-neutral-900 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-neutral-400">Fill Tolerance</span>
                  <span className="text-sm text-white">{tolerance}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={tolerance}
                  onChange={(e) => setTolerance(Number(e.target.value))}
                  className="w-full accent-white"
                />
                <p className="text-xs text-neutral-500 mt-2">
                  Lower = more precise, Higher = fills more similar colors
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => clearAreaFill(fillMode)}
                    className="flex-1 py-2 px-4 bg-neutral-800 text-neutral-300 text-sm rounded-lg hover:bg-neutral-700 transition-colors"
                  >
                    Clear This Area
                  </button>
                  <button
                    onClick={() => setFillMode(null)}
                    className="flex-1 py-2 px-4 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-500 transition-colors"
                  >
                    Done Filling
                  </button>
                </div>
              </div>
            )}

            {/* Selections Summary */}
            {getSelectedLocationsCount() > 0 && (
              <div className="mt-6 p-4 bg-neutral-900 rounded-lg">
                <h3 className="text-sm font-medium text-neutral-400 mb-3">Your Selections</h3>
                <div className="space-y-2">
                  {Object.entries(locationSelections)
                    .filter(([_, textureId]) => textureId !== null)
                    .map(([location, textureId]) => {
                      const texture = getTextureById(textureId!);
                      const isFilled = hasAreaFill(location);
                      const color = AREA_COLORS[location];
                      
                      return (
                        <div key={location} className="flex items-center gap-3">
                          <img 
                            src={texture?.image} 
                            alt={texture?.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate flex items-center gap-2">
                              {location}
                              {isFilled && (
                                <span 
                                  className="w-2 h-2 rounded-full" 
                                  style={{ backgroundColor: color?.hex }}
                                  title="Area filled"
                                />
                              )}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {texture?.category} - {texture?.name}
                              {!isFilled && <span className="text-amber-500 ml-1">(tap to fill)</span>}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
                {getFilledAreasCount() === 0 && getSelectedLocationsCount() > 0 && (
                  <p className="text-xs text-amber-500 mt-3">
                    💡 Tip: Tap on areas in your image to fill them. 
                    Without filling, the first texture will be applied as a full overlay.
                  </p>
                )}
              </div>
            )}

            {/* Generation Error */}
            {generationError && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-800 rounded-lg">
                <p className="text-red-400 text-sm">{generationError}</p>
                <button 
                  onClick={() => setGenerationError(null)}
                  className="text-red-500 text-xs mt-2 hover:text-red-300"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleGenerate}
                disabled={!uploadedImage || getSelectedLocationsCount() === 0}
                className={`flex-1 py-4 px-6 rounded-lg font-medium transition-all ${
                  !uploadedImage || getSelectedLocationsCount() === 0
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                Generate Visualization
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
            
            {showResult && (
              <button
                onClick={() => { setShowResult(false); setGeneratedImage(null); }}
                className="w-full mt-3 py-3 text-neutral-400 text-sm hover:text-white transition-colors"
              >
                ← Back to editing
              </button>
            )}
          </div>

          {/* Right: Location & Finish Selection */}
          <div className="lg:col-span-7">
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
              Step 2: Select areas, assign finishes, then tap to fill regions
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
                        const isFilling = fillMode === area;
                        const isFilled = hasAreaFill(area);
                        const color = AREA_COLORS[area];
                        
                        return (
                          <div key={area} className="flex items-center gap-2">
                            <button
                              onClick={() => setActiveLocation(isActive ? null : area)}
                              className={`flex-1 flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                                isActive 
                                  ? 'bg-white text-black' 
                                  : isFilling
                                    ? 'bg-amber-900/30 ring-1 ring-amber-500'
                                    : 'hover:bg-neutral-800'
                              }`}
                            >
                              {texture ? (
                                <div className="relative">
                                  <img 
                                    src={texture.image} 
                                    alt={texture.name}
                                    className="w-8 h-8 rounded object-cover ring-2 ring-green-500"
                                  />
                                  {isFilled && (
                                    <span 
                                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-neutral-900" 
                                      style={{ backgroundColor: color?.hex }}
                                    />
                                  )}
                                </div>
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
                            
                            {/* Fill button (paint bucket icon) */}
                            {texture && uploadedImage && (
                              <button
                                onClick={() => setFillMode(isFilling ? null : area)}
                                className={`p-3 rounded-lg transition-colors relative ${
                                  isFilling 
                                    ? 'bg-amber-500 text-white' 
                                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                                }`}
                                title={isFilling ? 'Done filling' : 'Tap to fill this area'}
                              >
                                {/* Paint bucket icon */}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                                {/* Pulsing dot when filling */}
                                {isFilling && (
                                  <motion.span 
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                  />
                                )}
                              </button>
                            )}
                            
                            {/* Clear button (only show if filled) */}
                            {texture && uploadedImage && isFilled && !isFilling && (
                              <button
                                onClick={() => clearAreaFill(area)}
                                className="p-3 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-red-900/50 hover:text-red-400 transition-colors"
                                title="Clear fill"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
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
                            onClick={() => {
                              setLocationSelections(prev => ({ ...prev, [activeLocation]: null }));
                              clearAreaFill(activeLocation);
                            }}
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
      </div>

      {/* Info Section */}
      <div className="border-t border-neutral-800 py-12 px-8 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-light mb-6">How It Works</h2>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3">
                <span className="text-lg">1</span>
              </div>
              <h3 className="font-medium mb-1 text-sm">Upload</h3>
              <p className="text-neutral-400 text-xs">Upload your elevation drawing</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3">
                <span className="text-lg">2</span>
              </div>
              <h3 className="font-medium mb-1 text-sm">Select</h3>
              <p className="text-neutral-400 text-xs">Choose areas and assign finishes</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3">
                <span className="text-lg">3</span>
              </div>
              <h3 className="font-medium mb-1 text-sm">Tap to Fill</h3>
              <p className="text-neutral-400 text-xs">Tap regions to fill them</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3">
                <span className="text-lg">4</span>
              </div>
              <h3 className="font-medium mb-1 text-sm">Generate</h3>
              <p className="text-neutral-400 text-xs">See instant results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
