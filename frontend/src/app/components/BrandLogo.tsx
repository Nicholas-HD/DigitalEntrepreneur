import React from "react";

interface BrandLogoProps {
  isDark?: boolean;
}

export default function BrandLogo({ isDark = true }: BrandLogoProps) {
  return (
    <div className="flex items-center gap-3 select-none cursor-pointer group">
      {/* LOGO ICON */}
      <img
        src="/logo.png"
        alt="Creativa Laboratorium Logo"
        className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
      />

      {/* TYPOGRAPHY CLEAN & MODERN AGENCY */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`text-lg sm:text-xl font-black tracking-tight uppercase ${
              isDark ? "text-white" : "text-neutral-900"
            }`}
          >
            CREATIVA
          </span>
          <span className="text-lg sm:text-xl font-black tracking-tight uppercase text-[#ea6228]">
            LAB
          </span>
        </div>

        {/* SUBTITLE LABORATORIUM */}
        <span
          className={`text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.28em] uppercase mt-1 ${
            isDark ? "text-neutral-400" : "text-neutral-500"
          }`}
        >
          LABORATORIUM
        </span>
      </div>
    </div>
  );
}