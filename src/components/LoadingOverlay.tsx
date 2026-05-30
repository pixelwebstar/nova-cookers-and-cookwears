"use client";

import { useEffect, useState } from "react";

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if site has already loaded in this browser session
    const hasLoaded = sessionStorage.getItem("nova_loaded");
    if (hasLoaded) {
      return;
    }

    // If document is already fully loaded, skip loading animation
    if (document.readyState === "complete") {
      sessionStorage.setItem("nova_loaded", "true");
      return;
    }

    let loadFired = false;
    let fadeTimer: NodeJS.Timeout;
    let unmountTimer: NodeJS.Timeout;

    // Show loader after 500ms if page load has not completed yet
    const showLoaderTimer = setTimeout(() => {
      if (!loadFired) {
        setMounted(true);
        setVisible(true);
      }
    }, 500);

    const handleLoad = () => {
      loadFired = true;
      clearTimeout(showLoaderTimer);

      // Add a slight minimum display delay (800ms) to ensure the luxury loader
      // rotates smoothly without flickering, then fade out.
      fadeTimer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("nova_loaded", "true");
      }, 800);

      unmountTimer = setTimeout(() => {
        setMounted(false);
      }, 1800); // 800ms delay + 1000ms transition duration
    };

    // Listen for window load
    window.addEventListener("load", handleLoad);

    // Fallback: in case the load event doesn't fire, ensure the page is interactive after 5s
    const fallbackTimer = setTimeout(() => {
      if (!loadFired) {
        handleLoad();
      }
    }, 5000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(showLoaderTimer);
      clearTimeout(fallbackTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (unmountTimer) clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#FAF9F6] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-[1.02] pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center space-y-8 text-center select-none">
        
        {/* Luxury Chef Circular Dual-Ring Spinner */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer Ring: Rotating counter-clockwise */}
          <div className="absolute inset-0 border border-t-zinc-800 border-zinc-200 rounded-full animate-spin [animation-duration:1.5s]" />
          
          {/* Inner Ring: Rotating clockwise */}
          <div className="absolute w-12 h-12 border border-b-zinc-900 border-zinc-200 rounded-full animate-spin [animation-direction:reverse] [animation-duration:1s]" />
          
          {/* Center burner glow */}
          <div className="w-4 h-4 bg-zinc-800 rounded-full animate-pulse" />
        </div>

        {/* Brand Typography */}
        <div className="flex flex-col items-center space-y-2">
          <span className="font-serif text-3xl md:text-4xl tracking-[0.3em] font-extrabold text-zinc-900 leading-none">
            NOVA
          </span>
          <span className="text-[9px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
            TECHNICAL COOKSTOVE PIPELINE
          </span>
        </div>

        {/* Supporting Slogan */}
        <div className="pt-2 flex flex-col items-center space-y-1">
          <span className="w-8 h-[1px] bg-zinc-200 block" />
          <span className="text-[7px] tracking-[0.2em] font-bold text-zinc-400 uppercase pt-1">
            DUBAI MIDDLE EAST • EST. 2026
          </span>
        </div>

      </div>
    </div>
  );
}
