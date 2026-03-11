import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_v7mqCAwT.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_D3qCqjnZ.mjs';
import { C as CustomCursor, S as ScrollProgress } from '../chunks/ScrollProgress_CKVF3J0N.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { A as AnimatedFooter } from '../chunks/AnimatedFooter_DDJMlaug.mjs';
export { renderers } from '../renderers.mjs';

const TreeLogo = ({ className = "w-8 h-8", invert = true }) => /* @__PURE__ */ jsx(
  "img",
  {
    src: "/images/logo.png",
    alt: "Troweled Earth",
    className: `${className} object-contain`,
    style: invert ? { filter: "invert(1)" } : void 0
  }
);
const AREA_COLORS = {
  "Main Walls": { rgba: "rgba(255, 100, 100, 0.35)", hex: "#ff6464", name: "Red" },
  "Balcony / Terrace": { rgba: "rgba(255, 255, 100, 0.35)", hex: "#ffff64", name: "Yellow" },
  "Columns & Pillars": { rgba: "rgba(100, 100, 255, 0.35)", hex: "#6464ff", name: "Blue" },
  "Window Surrounds": { rgba: "rgba(255, 100, 255, 0.35)", hex: "#ff64ff", name: "Pink" },
  "Street Facade": { rgba: "rgba(100, 255, 255, 0.35)", hex: "#64ffff", name: "Cyan" },
  "Entry / Portico": { rgba: "rgba(255, 165, 0, 0.35)", hex: "#ffa500", name: "Orange" },
  "Garage / Carport": { rgba: "rgba(100, 255, 100, 0.35)", hex: "#64ff64", name: "Green" },
  "Garden Walls": { rgba: "rgba(165, 100, 255, 0.35)", hex: "#a564ff", name: "Purple" },
  "Feature Walls": { rgba: "rgba(255, 200, 100, 0.35)", hex: "#ffc864", name: "Gold" },
  "Bathroom / Wet Areas": { rgba: "rgba(100, 200, 200, 0.35)", hex: "#64c8c8", name: "Teal" },
  "Stairwell": { rgba: "rgba(200, 150, 100, 0.35)", hex: "#c89664", name: "Brown" },
  "Fireplace Surround": { rgba: "rgba(255, 120, 80, 0.35)", hex: "#ff7850", name: "Coral" }
};
const locationCategories = [
  {
    id: "exterior-level1",
    name: "Exterior - Level 1",
    areas: ["Main Walls", "Balcony / Terrace", "Columns & Pillars", "Window Surrounds"]
  },
  {
    id: "exterior-ground",
    name: "Exterior - Ground Floor",
    areas: ["Street Facade", "Entry / Portico", "Garage / Carport", "Garden Walls"]
  },
  {
    id: "interior",
    name: "Interior",
    areas: ["Feature Walls", "Bathroom / Wet Areas", "Stairwell", "Fireplace Surround"]
  }
];
const textures = [
  // Marbellino — 12 colours from palette grid
  { id: "marbellino-taupe", name: "Taupe", category: "Marbellino", image: "/images/visualizer/marbellino-taupe.jpg" },
  { id: "marbellino-charcoal", name: "Charcoal", category: "Marbellino", image: "/images/visualizer/marbellino-charcoal.jpg" },
  { id: "marbellino-plum", name: "Plum", category: "Marbellino", image: "/images/visualizer/marbellino-plum.jpg" },
  { id: "marbellino-sage", name: "Sage", category: "Marbellino", image: "/images/visualizer/marbellino-sage.jpg" },
  { id: "marbellino-olive", name: "Olive", category: "Marbellino", image: "/images/visualizer/marbellino-olive.jpg" },
  { id: "marbellino-steel", name: "Steel", category: "Marbellino", image: "/images/visualizer/marbellino-steel.jpg" },
  { id: "marbellino-sand", name: "Sand", category: "Marbellino", image: "/images/visualizer/marbellino-sand.jpg" },
  { id: "marbellino-seafoam", name: "Seafoam", category: "Marbellino", image: "/images/visualizer/marbellino-seafoam.jpg" },
  { id: "marbellino-warmgrey", name: "Warm Grey", category: "Marbellino", image: "/images/visualizer/marbellino-warmgrey.jpg" },
  { id: "marbellino-linen", name: "Linen", category: "Marbellino", image: "/images/visualizer/marbellino-linen.jpg" },
  { id: "marbellino-silver", name: "Silver", category: "Marbellino", image: "/images/visualizer/marbellino-silver.jpg" },
  { id: "marbellino-ivory", name: "Ivory", category: "Marbellino", image: "/images/visualizer/marbellino-ivory.jpg" },
  { id: "marbellino-bianco", name: "Bianco", category: "Marbellino", image: "/images/visualizer/marbellino-bianco.jpg" },
  { id: "marbellino-coldgrey", name: "Cold Grey", category: "Marbellino", image: "/images/visualizer/marbellino-coldgrey.jpg" },
  { id: "marbellino-slateblue", name: "Slate Blue", category: "Marbellino", image: "/images/visualizer/marbellino-slateblue.jpg" },
  { id: "marbellino-storm", name: "Storm", category: "Marbellino", image: "/images/visualizer/marbellino-storm.jpg" },
  { id: "marbellino-eucalyptus", name: "Eucalyptus", category: "Marbellino", image: "/images/visualizer/marbellino-eucalyptus.jpg" },
  // Concretum
  { id: "concretum-dark", name: "Anthracite", category: "Concretum", image: "/images/visualizer/concretum-dark.jpg" },
  { id: "concretum-pitted", name: "Weathered", category: "Concretum", image: "/images/visualizer/concretum-pitted.jpg" },
  { id: "concretum-grey", name: "Raw", category: "Concretum", image: "/images/visualizer/concretum-grey.jpg" },
  { id: "concretum-rammed", name: "Rammed", category: "Concretum", image: "/images/visualizer/concretum-rammed.jpg" },
  // Rokka
  { id: "rokka-earth", name: "Earth", category: "Rokka", image: "/images/visualizer/rokka-earth.jpg" },
  { id: "rokka-grey", name: "Stone", category: "Rokka", image: "/images/visualizer/rokka-grey.jpg" },
  { id: "rokka-bone", name: "Warm Bone", category: "Rokka", image: "/images/visualizer/rokka-bone.png" },
  { id: "rokka-pilbara", name: "Pilbara", category: "Rokka", image: "/images/visualizer/rokka-pilbara.png" },
  { id: "rokka-sample", name: "Natural", category: "Rokka", image: "/images/visualizer/rokka-sample.png" },
  // Metallics
  { id: "metallic-bronze", name: "Bronze", category: "Metallics", image: "/images/visualizer/metallic-bronze.jpg" },
  { id: "metallic-copper", name: "Copper", category: "Metallics", image: "/images/visualizer/metallic-copper.jpg" },
  { id: "metallic-rust", name: "Rust", category: "Metallics", image: "/images/visualizer/metallic-rust.jpg" },
  { id: "metallic-steel", name: "Steel", category: "Metallics", image: "/images/visualizer/metallic-steel.jpg" },
  { id: "metallic-verdigris", name: "Verdigris", category: "Metallics", image: "/images/visualizer/metallic-verdigris.jpg" },
  // Tadelakt
  { id: "tadelakt-natural", name: "Natural", category: "Tadelakt", image: "/images/visualizer/tadelakt-natural.png" },
  { id: "tadelakt-green", name: "Sage", category: "Tadelakt", image: "/images/visualizer/tadelakt-green.png" },
  { id: "tadelakt-blush", name: "Blush", category: "Tadelakt", image: "/images/visualizer/tadelakt-blush.png" },
  { id: "tadelakt-white", name: "Ivory", category: "Tadelakt", image: "/images/visualizer/tadelakt-white.png" },
  // Antique Stucco
  { id: "stucco-raw", name: "Raw", category: "Antique Stucco", image: "/images/visualizer/stucco-raw.png" },
  { id: "stucco-gold", name: "Gold Patina", category: "Antique Stucco", image: "/images/visualizer/stucco-gold.png" },
  { id: "stucco-aged", name: "Aged", category: "Antique Stucco", image: "/images/visualizer/stucco-aged.png" },
  { id: "stucco-exterior", name: "Exterior", category: "Antique Stucco", image: "/images/visualizer/stucco-exterior.png" },
  // Earthen Hemp
  { id: "hemp-natural", name: "Natural", category: "Earthen Hemp", image: "/images/visualizer/hemp-natural.png" },
  { id: "hemp-sand", name: "Sand", category: "Earthen Hemp", image: "/images/visualizer/hemp-sand.jpg" },
  { id: "hemp-sandstone", name: "Sandstone", category: "Earthen Hemp", image: "/images/visualizer/hemp-sandstone.jpg" },
  { id: "hemp-charcoal", name: "Charcoal", category: "Earthen Hemp", image: "/images/visualizer/hemp-charcoal.jpg" },
  { id: "hemp-sage", name: "Sage", category: "Earthen Hemp", image: "/images/visualizer/hemp-sage.jpg" },
  { id: "hemp-cream", name: "Cream", category: "Earthen Hemp", image: "/images/visualizer/hemp-cream.jpg" },
  { id: "hemp-mocha", name: "Mocha", category: "Earthen Hemp", image: "/images/visualizer/hemp-mocha.jpg" },
  { id: "hemp-lightsage", name: "Light Sage", category: "Earthen Hemp", image: "/images/visualizer/hemp-lightsage.jpg" },
  { id: "hemp-grey", name: "Grey", category: "Earthen Hemp", image: "/images/visualizer/hemp-grey.jpg" },
  { id: "hemp-white", name: "White", category: "Earthen Hemp", image: "/images/visualizer/hemp-white.jpg" },
  // Custom Finishes
  { id: "custom-fractured", name: "Fractured", category: "Custom", image: "/images/visualizer/custom-fractured.png" },
  { id: "custom-volcanic", name: "Volcanic", category: "Custom", image: "/images/visualizer/custom-volcanic.png" },
  { id: "custom-moroccan", name: "Moroccan", category: "Custom", image: "/images/visualizer/custom-moroccan.png" },
  { id: "custom-decay", name: "State of Decay", category: "Custom", image: "/images/visualizer/custom-decay.png" }
];
const textureCategories = ["All", "Marbellino", "Concretum", "Rokka", "Metallics", "Tadelakt", "Antique Stucco", "Earthen Hemp", "Custom"];
const createBoundaryMap = (imageData) => {
  const { width, height, data } = imageData;
  const gray = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    gray[i] = data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114;
  }
  const edges = new Float32Array(width * height);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const gx = -gray[(y - 1) * width + (x - 1)] + gray[(y - 1) * width + (x + 1)] - 2 * gray[y * width + (x - 1)] + 2 * gray[y * width + (x + 1)] - gray[(y + 1) * width + (x - 1)] + gray[(y + 1) * width + (x + 1)];
      const gy = -gray[(y - 1) * width + (x - 1)] - 2 * gray[(y - 1) * width + x] - gray[(y - 1) * width + (x + 1)] + gray[(y + 1) * width + (x - 1)] + 2 * gray[(y + 1) * width + x] + gray[(y + 1) * width + (x + 1)];
      edges[idx] = Math.sqrt(gx * gx + gy * gy);
    }
  }
  const dilated = new Float32Array(width * height);
  const dilateRadius = 3;
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
  const boundaryData = new ImageData(width, height);
  const edgeThreshold = 30;
  for (let i = 0; i < width * height; i++) {
    const isEdge = dilated[i] > edgeThreshold;
    if (isEdge) {
      boundaryData.data[i * 4] = 0;
      boundaryData.data[i * 4 + 1] = 0;
      boundaryData.data[i * 4 + 2] = 0;
      boundaryData.data[i * 4 + 3] = 255;
    } else {
      boundaryData.data[i * 4] = data[i * 4];
      boundaryData.data[i * 4 + 1] = data[i * 4 + 1];
      boundaryData.data[i * 4 + 2] = data[i * 4 + 2];
      boundaryData.data[i * 4 + 3] = 255;
    }
  }
  return boundaryData;
};
const floodFillWithBoundaries = (boundaryMap, startX, startY, tolerance = 20) => {
  const { width, height, data } = boundaryMap;
  const filled = new Array(width * height).fill(false);
  if (startX < 0 || startX >= width || startY < 0 || startY >= height) {
    return filled;
  }
  const startIdx = (startY * width + startX) * 4;
  if (data[startIdx] === 0 && data[startIdx + 1] === 0 && data[startIdx + 2] === 0) {
    return filled;
  }
  const startR = data[startIdx];
  const startG = data[startIdx + 1];
  const startB = data[startIdx + 2];
  const isEdge = (x, y) => {
    const idx = (y * width + x) * 4;
    return (data[idx] + data[idx + 1] + data[idx + 2]) / 3 < 50;
  };
  const colorMatch = (x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    if (isEdge(x, y)) return false;
    const idx = (y * width + x) * 4;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    return Math.abs(r - startR) + Math.abs(g - startG) + Math.abs(b - startB) < tolerance * 3;
  };
  const stack = [[startX, startY]];
  while (stack.length > 0) {
    let [x, y] = stack.pop();
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
function FinishVisualizer() {
  const [userSession, setUserSession] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [authMode, setAuthMode] = useState("register");
  const [accessCode, setAccessCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageObj, setUploadedImageObj] = useState(null);
  const [locationSelections, setLocationSelections] = useState({});
  const [activeLocation, setActiveLocation] = useState(null);
  const [activeTextureCategory, setActiveTextureCategory] = useState("All");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [generationError, setGenerationError] = useState(null);
  const fileInputRef = useRef(null);
  const [fillMode, setFillMode] = useState(null);
  const [areaFills, setAreaFills] = useState({});
  const [tolerance, setTolerance] = useState(20);
  const [originalImageData, setOriginalImageData] = useState(null);
  const [boundaryMap, setBoundaryMap] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const touchStartRef = useRef(null);
  const mainCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const checkSession = async () => {
      const savedToken = localStorage.getItem("tem-visualizer-token");
      if (!savedToken) {
        setIsCheckingSession(false);
        return;
      }
      try {
        const response = await fetch("/api/auth/session", {
          headers: {
            "Authorization": `Bearer ${savedToken}`
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
          localStorage.removeItem("tem-visualizer-token");
        }
      } catch (error) {
        console.error("Session check failed:", error);
        localStorage.removeItem("tem-visualizer-token");
      }
      setIsCheckingSession(false);
    };
    checkSession();
  }, []);
  useEffect(() => {
    if (!uploadedImage) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setUploadedImageObj(img);
      setCanvasSize({ width: img.width, height: img.height });
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
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.drawImage(img, 0, 0);
        const imgData = tempCtx.getImageData(0, 0, img.width, img.height);
        setOriginalImageData(imgData);
        setIsProcessing(true);
        setBoundaryMap(null);
        setTimeout(() => {
          const boundary = createBoundaryMap(imgData);
          setBoundaryMap(boundary);
          setIsProcessing(false);
        }, 50);
      }
      setAreaFills({});
    };
    img.src = uploadedImage;
  }, [uploadedImage]);
  const drawMainCanvas = useCallback(() => {
    const canvas = mainCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !uploadedImageObj) return;
    canvas.width = displaySize.width;
    canvas.height = displaySize.height;
    ctx.drawImage(uploadedImageObj, 0, 0, displaySize.width, displaySize.height);
    Object.entries(areaFills).forEach(([area, mask]) => {
      if (!mask || mask.length === 0) return;
      const color = AREA_COLORS[area];
      if (!color) return;
      const hasFill = mask.some((v) => v);
      if (!hasFill) return;
      const overlayCanvas = document.createElement("canvas");
      overlayCanvas.width = displaySize.width;
      overlayCanvas.height = displaySize.height;
      const overlayCtx = overlayCanvas.getContext("2d");
      if (!overlayCtx) return;
      const overlayData = overlayCtx.createImageData(displaySize.width, displaySize.height);
      const r = parseInt(color.hex.slice(1, 3), 16);
      const g = parseInt(color.hex.slice(3, 5), 16);
      const b = parseInt(color.hex.slice(5, 7), 16);
      const a = Math.round(0.35 * 255);
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
  useEffect(() => {
    drawMainCanvas();
  }, [drawMainCanvas]);
  const getCoords = (e) => {
    const canvas = mainCanvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ("touches" in e) {
      if (e.type === "touchend") {
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
    const scaleX = canvasSize.width / rect.width;
    const scaleY = canvasSize.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };
  const handleTouchStart = (e) => {
    if (!fillMode) return;
    const coords = getCoords(e);
    if (coords) {
      touchStartRef.current = coords;
    }
  };
  const handleCanvasTap = (e) => {
    if (!fillMode || !boundaryMap || isProcessing) return;
    e.preventDefault();
    const coords = getCoords(e);
    if (!coords) return;
    if ("touches" in e && touchStartRef.current) {
      const dx = Math.abs(coords.x - touchStartRef.current.x);
      const dy = Math.abs(coords.y - touchStartRef.current.y);
      if (dx > 20 || dy > 20) {
        touchStartRef.current = null;
        return;
      }
    }
    touchStartRef.current = null;
    const x = Math.round(coords.x);
    const y = Math.round(coords.y);
    if (x < 0 || x >= canvasSize.width || y < 0 || y >= canvasSize.height) return;
    const existingMask = areaFills[fillMode];
    const pixelIdx = y * canvasSize.width + x;
    if (existingMask && existingMask[pixelIdx]) {
      const regionToRemove = floodFillWithBoundaries(boundaryMap, x, y, tolerance);
      setAreaFills((prev) => {
        const existing = prev[fillMode] || [];
        const newMask = existing.map((v, i) => v && !regionToRemove[i]);
        return { ...prev, [fillMode]: newMask };
      });
    } else {
      const filled = floodFillWithBoundaries(boundaryMap, x, y, tolerance);
      setAreaFills((prev) => {
        const existing = prev[fillMode] || new Array(canvasSize.width * canvasSize.height).fill(false);
        const merged = existing.map((v, i) => v || filled[i]);
        return { ...prev, [fillMode]: merged };
      });
    }
  };
  const clearAreaFill = (area) => {
    setAreaFills((prev) => {
      const newFills = { ...prev };
      delete newFills[area];
      return newFills;
    });
  };
  const hasAreaFill = (area) => {
    const mask = areaFills[area];
    return mask ? mask.some((v) => v) : false;
  };
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };
  const handleGenerate = async () => {
    if (!uploadedImageObj || getSelectedLocationsCount() === 0) return;
    setGenerationError(null);
    try {
      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = canvasSize.width;
      outputCanvas.height = canvasSize.height;
      const ctx = outputCanvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");
      ctx.drawImage(uploadedImageObj, 0, 0);
      const filledAreas = Object.entries(areaFills).filter(
        ([area, mask]) => mask && mask.some((v) => v) && locationSelections[area]
      );
      if (filledAreas.length > 0) {
        for (const [area, mask] of filledAreas) {
          const textureId = locationSelections[area];
          if (!textureId) continue;
          const texture = getTextureById(textureId);
          if (!texture) continue;
          const textureImg = await loadImage(texture.image);
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = canvasSize.width;
          tempCanvas.height = canvasSize.height;
          const tempCtx = tempCanvas.getContext("2d");
          if (!tempCtx) continue;
          const pattern = tempCtx.createPattern(textureImg, "repeat");
          if (!pattern) continue;
          tempCtx.fillStyle = pattern;
          tempCtx.fillRect(0, 0, canvasSize.width, canvasSize.height);
          const maskCanvas = document.createElement("canvas");
          maskCanvas.width = canvasSize.width;
          maskCanvas.height = canvasSize.height;
          const maskCtx = maskCanvas.getContext("2d");
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
          tempCtx.globalCompositeOperation = "destination-in";
          tempCtx.drawImage(maskCanvas, 0, 0);
          ctx.globalCompositeOperation = "multiply";
          ctx.drawImage(tempCanvas, 0, 0);
        }
        ctx.globalCompositeOperation = "multiply";
        ctx.globalAlpha = 0.5;
        ctx.drawImage(uploadedImageObj, 0, 0);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      } else {
        const firstSelection = Object.entries(locationSelections).find(([_, id]) => id !== null);
        if (firstSelection) {
          const texture = getTextureById(firstSelection[1]);
          if (texture) {
            const textureImg = await loadImage(texture.image);
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = canvasSize.width;
            tempCanvas.height = canvasSize.height;
            const tempCtx = tempCanvas.getContext("2d");
            if (tempCtx) {
              const pattern = tempCtx.createPattern(textureImg, "repeat");
              if (pattern) {
                tempCtx.fillStyle = pattern;
                tempCtx.fillRect(0, 0, canvasSize.width, canvasSize.height);
                ctx.globalCompositeOperation = "multiply";
                ctx.globalAlpha = 0.7;
                ctx.drawImage(tempCanvas, 0, 0);
                ctx.globalAlpha = 1;
                ctx.globalCompositeOperation = "multiply";
                ctx.globalAlpha = 0.4;
                ctx.drawImage(uploadedImageObj, 0, 0);
                ctx.globalAlpha = 1;
                ctx.globalCompositeOperation = "source-over";
              }
            }
          }
        }
      }
      const resultUrl = outputCanvas.toDataURL("image/jpeg", 0.92);
      setGeneratedImage(resultUrl);
      setShowResult(true);
      setFillMode(null);
    } catch (error) {
      console.error("Generation error:", error);
      setGenerationError(error instanceof Error ? error.message : "Generation failed. Please try again.");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("tem-visualizer-token");
    setUserSession(null);
    setEmail("");
    setPassword("");
    setAccessCode("");
    setAuthMode("register");
  };
  userSession?.remainingGenerations ?? (999 );
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result);
        setGeneratedImage(null);
        setShowResult(false);
        setFillMode(null);
        setAreaFills({});
        setBoundaryMap(null);
      };
      reader.readAsDataURL(file);
    }
  };
  const selectTextureForLocation = (textureId) => {
    if (!activeLocation) return;
    setLocationSelections((prev) => ({
      ...prev,
      [activeLocation]: prev[activeLocation] === textureId ? null : textureId
    }));
  };
  const getSelectedLocationsCount = () => {
    return Object.values(locationSelections).filter((v) => v !== null).length;
  };
  const getFilledAreasCount = () => {
    return Object.entries(areaFills).filter(([_, mask]) => mask && mask.some((v) => v)).length;
  };
  const filteredTextures = activeTextureCategory === "All" ? textures : textures.filter((t) => t.category === activeTextureCategory);
  const handleSave = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "troweled-earth-visualization.jpg";
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
      fileInputRef.current.value = "";
    }
  };
  const getTextureById = (id) => textures.find((t) => t.id === id);
  if (isCheckingSession) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-neutral-950 text-white flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxs("svg", { className: "animate-spin w-8 h-8 text-neutral-500", fill: "none", viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-neutral-500", children: "Loading..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-neutral-950 text-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "py-12 px-8 text-center border-b border-neutral-800", children: [
      /* @__PURE__ */ jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "text-4xl md:text-6xl font-light tracking-tight mb-4",
          children: "FINISH VISUALIZER"
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "text-neutral-400 text-lg max-w-2xl mx-auto",
          children: "Upload your elevation, tap to fill areas, and see instant results"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.2 },
          className: "mt-4 flex flex-col sm:flex-row items-center justify-center gap-4",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-full", children: [
              /* @__PURE__ */ jsx("span", { className: "text-neutral-500 text-sm", children: "Logged in as" }),
              /* @__PURE__ */ jsx("span", { className: "text-white text-sm", children: userSession?.email || "Test Mode" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleLogout,
                className: "text-neutral-500 hover:text-white text-sm transition-colors",
                children: "Log out"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 md:px-8 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4", children: "Step 1: Upload Your Elevation" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: containerRef,
            className: `relative rounded-lg overflow-hidden border-2 border-dashed transition-colors ${uploadedImage ? "border-transparent" : "border-neutral-700 hover:border-neutral-500"}`,
            style: { aspectRatio: "4/3" },
            children: uploadedImage && uploadedImageObj ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full flex items-center justify-center bg-neutral-900", children: [
                /* @__PURE__ */ jsx(
                  "canvas",
                  {
                    ref: mainCanvasRef,
                    className: `max-w-full max-h-full ${fillMode ? "cursor-crosshair" : ""}`,
                    style: {
                      width: displaySize.width,
                      height: displaySize.height,
                      touchAction: fillMode ? "none" : "auto"
                    },
                    onClick: handleCanvasTap,
                    onTouchStart: handleTouchStart,
                    onTouchEnd: handleCanvasTap
                  }
                ),
                showResult && generatedImage && /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: generatedImage,
                    alt: "Generated visualization",
                    className: "absolute inset-0 w-full h-full object-contain"
                  }
                ),
                isProcessing && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 z-10", children: /* @__PURE__ */ jsxs("div", { className: "bg-black/80 text-white text-sm px-4 py-3 rounded-lg flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxs("svg", { className: "animate-spin w-5 h-5 text-white", fill: "none", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                    /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
                  ] }),
                  "Processing image..."
                ] }) }),
                fillMode && !isProcessing && /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "bg-black/70 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    motion.span,
                    {
                      className: "w-3 h-3 rounded-full",
                      style: { backgroundColor: AREA_COLORS[fillMode]?.hex },
                      animate: { scale: [1, 1.2, 1] },
                      transition: { repeat: Infinity, duration: 1.5 }
                    }
                  ),
                  "Tap to fill: ",
                  fillMode
                ] }) }),
                fillMode && !hasAreaFill(fillMode) && !isProcessing && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "bg-black/50 text-white text-sm px-4 py-2 rounded-lg", children: "Tap on the areas you want to fill" }) }),
                showResult && /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full", children: "Visualization Complete" })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleReset,
                  className: "absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                }
              )
            ] }) : /* @__PURE__ */ jsxs("label", { className: "absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-800 transition-colors", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-neutral-600 mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-neutral-400", children: "Click to upload elevation" }),
              /* @__PURE__ */ jsx("span", { className: "text-neutral-600 text-sm mt-1", children: "JPG, PNG up to 10MB" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: "image/*",
                  onChange: handleFileUpload,
                  className: "hidden"
                }
              )
            ] })
          }
        ),
        uploadedImage && fillMode && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 bg-neutral-900 rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-neutral-400", children: "Fill Tolerance" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-white", children: tolerance })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              min: "10",
              max: "80",
              value: tolerance,
              onChange: (e) => setTolerance(Number(e.target.value)),
              className: "w-full accent-white"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 mt-2", children: "Lower = more precise, Higher = fills more similar colors" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => clearAreaFill(fillMode),
                className: "flex-1 py-2 px-4 bg-neutral-800 text-neutral-300 text-sm rounded-lg hover:bg-neutral-700 transition-colors",
                children: "Clear This Area"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setFillMode(null),
                className: "flex-1 py-2 px-4 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-500 transition-colors",
                children: "Done Filling"
              }
            )
          ] })
        ] }),
        getSelectedLocationsCount() > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-6 p-4 bg-neutral-900 rounded-lg", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-neutral-400 mb-3", children: "Your Selections" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: Object.entries(locationSelections).filter(([_, textureId]) => textureId !== null).map(([location, textureId]) => {
            const texture = getTextureById(textureId);
            const isFilled = hasAreaFill(location);
            const color = AREA_COLORS[location];
            return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: texture?.image,
                  alt: texture?.name,
                  className: "w-10 h-10 rounded object-cover"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-white truncate flex items-center gap-2", children: [
                  location,
                  isFilled && /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "w-2 h-2 rounded-full",
                      style: { backgroundColor: color?.hex },
                      title: "Area filled"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-neutral-500", children: [
                  texture?.category,
                  " - ",
                  texture?.name,
                  !isFilled && /* @__PURE__ */ jsx("span", { className: "text-amber-500 ml-1", children: "(tap to fill)" })
                ] })
              ] })
            ] }, location);
          }) }),
          getFilledAreasCount() === 0 && getSelectedLocationsCount() > 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-amber-500 mt-3", children: "💡 Tip: Tap on areas in your image to fill them. Without filling, the first texture will be applied as a full overlay." })
        ] }),
        generationError && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 bg-red-900/30 border border-red-800 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-red-400 text-sm", children: generationError }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setGenerationError(null),
              className: "text-red-500 text-xs mt-2 hover:text-red-300",
              children: "Dismiss"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleGenerate,
              disabled: !uploadedImage || getSelectedLocationsCount() === 0,
              className: `flex-1 py-4 px-6 rounded-lg font-medium transition-all ${!uploadedImage || getSelectedLocationsCount() === 0 ? "bg-neutral-800 text-neutral-500 cursor-not-allowed" : "bg-white text-black hover:bg-neutral-200"}`,
              children: "Generate Visualization"
            }
          ),
          generatedImage && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleSave,
              className: "py-4 px-6 rounded-lg font-medium bg-neutral-800 text-white hover:bg-neutral-700 transition-colors",
              children: "Save"
            }
          )
        ] }),
        showResult && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setShowResult(false);
              setGeneratedImage(null);
            },
            className: "w-full mt-3 py-3 text-neutral-400 text-sm hover:text-white transition-colors",
            children: "← Back to editing"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4", children: "Step 2: Select areas, assign finishes, then tap to fill regions" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: locationCategories.map((category) => /* @__PURE__ */ jsxs("div", { className: "bg-neutral-900 rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-neutral-500 uppercase tracking-wider px-4 py-2 bg-neutral-800/50", children: category.name }),
            /* @__PURE__ */ jsx("div", { className: "p-2", children: category.areas.map((area) => {
              const isActive = activeLocation === area;
              const selectedTexture = locationSelections[area];
              const texture = selectedTexture ? getTextureById(selectedTexture) : null;
              const isFilling = fillMode === area;
              const isFilled = hasAreaFill(area);
              const color = AREA_COLORS[area];
              return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setActiveLocation(isActive ? null : area),
                    className: `flex-1 flex items-center gap-3 p-3 rounded-lg text-left transition-all ${isActive ? "bg-white text-black" : isFilling ? "bg-amber-900/30 ring-1 ring-amber-500" : "hover:bg-neutral-800"}`,
                    children: [
                      texture ? /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: texture.image,
                            alt: texture.name,
                            className: "w-8 h-8 rounded object-cover ring-2 ring-green-500"
                          }
                        ),
                        isFilled && /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-neutral-900",
                            style: { backgroundColor: color?.hex }
                          }
                        )
                      ] }) : /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded flex items-center justify-center ${isActive ? "bg-neutral-200" : "bg-neutral-800"}`, children: /* @__PURE__ */ jsx(TreeLogo, { className: `w-5 h-5 ${isActive ? "text-neutral-500" : "text-neutral-600"}` }) }),
                      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsx("p", { className: `text-sm font-medium ${isActive ? "text-black" : "text-white"}`, children: area }),
                        texture && /* @__PURE__ */ jsxs("p", { className: `text-xs ${isActive ? "text-neutral-600" : "text-neutral-500"}`, children: [
                          texture.category,
                          " - ",
                          texture.name
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: `w-5 h-5 transition-transform ${isActive ? "rotate-90" : ""} ${isActive ? "text-black" : "text-neutral-600"}`,
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" })
                        }
                      )
                    ]
                  }
                ),
                texture && uploadedImage && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setFillMode(isFilling ? null : area),
                    className: `p-3 rounded-lg transition-colors relative ${isFilling ? "bg-amber-500 text-white" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"}`,
                    title: isFilling ? "Done filling" : "Tap to fill this area",
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" }) }),
                      isFilling && /* @__PURE__ */ jsx(
                        motion.span,
                        {
                          className: "absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full",
                          animate: { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] },
                          transition: { repeat: Infinity, duration: 1 }
                        }
                      )
                    ]
                  }
                ),
                texture && uploadedImage && isFilled && !isFilling && /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => clearAreaFill(area),
                    className: "p-3 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-red-900/50 hover:text-red-400 transition-colors",
                    title: "Clear fill",
                    children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                  }
                )
              ] }, area);
            }) })
          ] }, category.id)) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: activeLocation ? /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -20 },
              className: "bg-neutral-900 rounded-lg p-4",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-sm font-medium text-white", children: [
                    "Select finish for ",
                    /* @__PURE__ */ jsx("span", { className: "text-amber-400", children: activeLocation })
                  ] }),
                  locationSelections[activeLocation] && /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setLocationSelections((prev) => ({ ...prev, [activeLocation]: null }));
                        clearAreaFill(activeLocation);
                      },
                      className: "text-xs text-neutral-500 hover:text-red-400 transition-colors",
                      children: "Clear"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex gap-1 mb-4 overflow-x-auto pb-2", children: textureCategories.map((cat) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setActiveTextureCategory(cat),
                    className: `px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${activeTextureCategory === cat ? "bg-white text-black" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"}`,
                    children: cat
                  },
                  cat
                )) }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto", children: filteredTextures.map((texture) => {
                  const isSelected = locationSelections[activeLocation] === texture.id;
                  return /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => selectTextureForLocation(texture.id),
                      className: `relative aspect-square rounded-lg overflow-hidden group transition-all ${isSelected ? "ring-2 ring-green-500 ring-offset-2 ring-offset-neutral-900" : ""}`,
                      children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: texture.image,
                            alt: texture.name,
                            className: "w-full h-full object-cover"
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: `absolute inset-0 transition-opacity ${isSelected ? "bg-green-500/20" : "bg-black/0 group-hover:bg-black/20"}` }),
                        isSelected && /* @__PURE__ */ jsx("div", { className: "absolute top-1 right-1 w-5 h-5 bg-green-500 text-white flex items-center justify-center rounded-full", children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-1.5", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] text-white font-medium truncate", children: texture.name }) })
                      ]
                    },
                    texture.id
                  );
                }) })
              ]
            },
            activeLocation
          ) : /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "bg-neutral-900/50 rounded-lg p-8 flex flex-col items-center justify-center h-full min-h-[300px]",
              children: [
                /* @__PURE__ */ jsx(TreeLogo, { className: "w-16 h-16 text-neutral-700 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-neutral-500 text-center", children: "Click on an area to select a finish" })
              ]
            }
          ) }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-neutral-800 py-12 px-8 mt-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-light mb-6", children: "How It Works" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx("span", { className: "text-lg", children: "1" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-1 text-sm", children: "Upload" }),
          /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-xs", children: "Upload your elevation drawing" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx("span", { className: "text-lg", children: "2" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-1 text-sm", children: "Select" }),
          /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-xs", children: "Choose areas and assign finishes" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx("span", { className: "text-lg", children: "3" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-1 text-sm", children: "Tap to Fill" }),
          /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-xs", children: "Tap regions to fill them" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx("span", { className: "text-lg", children: "4" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-1 text-sm", children: "Generate" }),
          /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-xs", children: "See instant results" })
        ] })
      ] })
    ] }) })
  ] });
}

const $$Visualizer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Finish Visualizer | Troweled Earth Melbourne" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CustomCursor", CustomCursor, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/CustomCursor", "client:component-export": "default" })} ${renderComponent($$result2, "ScrollProgress", ScrollProgress, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/ScrollProgress", "client:component-export": "default" })} ${maybeRenderHead()}<main> ${renderComponent($$result2, "FinishVisualizer", FinishVisualizer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/FinishVisualizer", "client:component-export": "default" })} </main> ${renderComponent($$result2, "AnimatedFooter", AnimatedFooter, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/AnimatedFooter", "client:component-export": "default" })} ` })}`;
}, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/visualizer.astro", void 0);

const $$file = "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/visualizer.astro";
const $$url = "/visualizer";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Visualizer,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
