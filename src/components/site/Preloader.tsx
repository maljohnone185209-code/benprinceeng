import { useEffect, useState } from "react";
import bpLogoAsset from "@/assets/bp-logo.png.asset.json";

const SESSION_KEY = "bp_preloader_shown";

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(true);
    document.body.style.overflow = "hidden";
    const fadeT = window.setTimeout(() => setFading(true), 1900);
    const hideT = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2600);
    return () => {
      window.clearTimeout(fadeT);
      window.clearTimeout(hideT);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B2D5C] transition-opacity duration-700 ease-out"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <img
        src={bpLogoAsset.url}
        alt=""
        className="h-24 w-24 rounded-full bg-white/95 object-contain p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] sm:h-28 sm:w-28"
        style={{ animation: "bpLogoIn 900ms cubic-bezier(.22,1,.36,1) both" }}
      />
      <h1
        className="mt-7 px-6 text-center font-display text-base font-semibold uppercase tracking-[0.32em] text-white sm:text-lg"
        style={{ animation: "bpFadeUp 800ms ease-out 350ms both" }}
      >
        Ben-Prince Engineering Construction Ltd
      </h1>
      <p
        className="mt-3 text-center text-xs font-normal tracking-[0.22em] text-white/70 sm:text-sm"
        style={{ animation: "bpFadeUp 800ms ease-out 700ms both" }}
      >
        Engineering · Construction · Civil Engineering
      </p>
      <style>{`
        @keyframes bpLogoIn { from { opacity: 0; transform: scale(.95) } to { opacity: 1; transform: scale(1) } }
        @keyframes bpFadeUp { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}
