import React from "react";

import pickaxeImg from "@/assets/sketch-icons/pickaxe.png";
import rockImg from "@/assets/sketch-icons/rock.png";
import flameImg from "@/assets/sketch-icons/flame.png";
import shieldImg from "@/assets/sketch-icons/shield.png";
import railroadImg from "@/assets/sketch-icons/railroad.png";
import gemImg from "@/assets/sketch-icons/gem.png";
import storefrontImg from "@/assets/sketch-icons/storefront.png";
import ringImg from "@/assets/sketch-icons/ring.png";
import bookImg from "@/assets/sketch-icons/book.png";
import brainImg from "@/assets/sketch-icons/brain.png";

interface IconProps {
  size?: number;
  className?: string;
  color?: string; // kept for API compat but unused with images
}

const SKETCH_IMAGES: Record<string, string> = {
  pickaxe: pickaxeImg,
  rock: rockImg,
  flame: flameImg,
  shield: shieldImg,
  railroad: railroadImg,
  gem: gemImg,
  storefront: storefrontImg,
  ring: ringImg,
  book: bookImg,
  brain: brainImg,
};

/** Render a sketch infographic icon by name */
export const SketchIcon = ({
  name,
  size = 32,
  className = "",
}: IconProps & { name: string }) => {
  const src = SKETCH_IMAGES[name];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      className={`inline-block object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

/** Named exports for direct use */
export const IconPickaxe = (props: IconProps) => <SketchIcon name="pickaxe" {...props} />;
export const IconRock = (props: IconProps) => <SketchIcon name="rock" {...props} />;
export const IconFlame = (props: IconProps) => <SketchIcon name="flame" {...props} />;
export const IconShield = (props: IconProps) => <SketchIcon name="shield" {...props} />;
export const IconRailroad = (props: IconProps) => <SketchIcon name="railroad" {...props} />;
export const IconGem = (props: IconProps) => <SketchIcon name="gem" {...props} />;
export const IconStorefront = (props: IconProps) => <SketchIcon name="storefront" {...props} />;
export const IconRing = (props: IconProps) => <SketchIcon name="ring" {...props} />;
export const IconBook = (props: IconProps) => <SketchIcon name="book" {...props} />;
export const IconBrain = (props: IconProps) => <SketchIcon name="brain" {...props} />;
