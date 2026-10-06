import React, { useState } from "react";

export type LiquidGlassProps = {
  as?: React.ElementType;
  isLight?: boolean;
  dense?: boolean;
  tint?: string;
  hoverTint?: string;
  rim?: string;        // BARU
  rimWidth?: number;   // BARU
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  [key: string]: any;
};

export default function LiquidGlass({
  as: Tag = "div",
  isLight = false,
  dense = false,
    tint,
  hoverTint,
  rim: rimProp,          // BARU
  rimWidth = 1,          // BARU
  className = "",
  style,
  children,
  ...rest
}: LiquidGlassProps) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultTint = isLight
    ? dense ? "rgba(246, 244, 242, 0.7)" : "rgba(246, 244, 242, 0.42)"
    : dense ? "rgba(24, 22, 22, 0.42)" : "rgba(255, 255, 255, 0.07)";
  const defaultHover = isLight
    ? dense ? "rgba(246, 244, 242, 0.86)" : "rgba(246, 244, 242, 0.72)"
    : dense ? "rgba(40, 37, 37, 0.55)" : "rgba(255, 255, 255, 0.14)";

  const activeBg = isHovered ? (hoverTint || defaultHover) : (tint || defaultTint);

  const boxShadow = isLight
    ? [
        "inset 0 1.5px 0 0 rgba(255, 255, 255, 1)",
        "inset 0 0 0 1px rgba(255, 255, 255, 0.35)",
        "inset 0 -2px 3px -1px rgba(58, 29, 19, 0.24)",
        "0 2px 4px rgba(58, 29, 19, 0.08)",
        "0 12px 26px -8px rgba(58, 29, 19, 0.24)",
      ].join(", ")
    : [
        "inset 0 1.5px 0 0 rgba(255, 255, 255, 0.75)",
        "inset 0 0 0 1px rgba(255, 255, 255, 0.12)",
        "inset 0 -2px 3px -1px rgba(0, 0, 0, 0.4)",
        "0 2px 4px rgba(0, 0, 0, 0.12)",
        "0 12px 30px -8px rgba(0, 0, 0, 0.35)",
      ].join(", ");

    const rim =
    rimProp ??
    (isLight
      ? "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.15) 40%, rgba(58,29,19,0.04) 60%, rgba(58,29,19,0.3) 100%)"
      : "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.45) 100%)");

  return (
    <Tag
      className={`relative isolate overflow-hidden transition-[background-color,box-shadow,transform,filter,opacity] duration-300 backdrop-blur-xl backdrop-saturate-150 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: activeBg, boxShadow, ...style }}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: isLight
            ? "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0) 60%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0) 60%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          padding: rimWidth,
          background: rim,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </Tag>
  );
}