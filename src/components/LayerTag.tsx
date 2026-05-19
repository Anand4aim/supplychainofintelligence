import React from "react";
import { Link } from "react-router-dom";
import {
  LAYERS,
  LAYER_SHORT_LABEL,
  LAYER_LABEL,
  SUBLAYER_LABEL,
  layerVar,
  layerColor,
} from "@/data/layers";

type Variant = "chip" | "inline" | "dot" | "id-only";

interface Props {
  id: string;                // "L1", "L-1", "L8c"
  variant?: Variant;         // chip = pill, inline = colored text, dot = colored dot+label, id-only = just colored ID
  full?: boolean;            // use full layer name instead of shortName
  withSublayerName?: boolean; // for sublayer ids, append the sublayer name
  link?: boolean;            // wrap in a Link to /framework/{slug}
  className?: string;
}

const layerSlug = (layerId: string) => {
  const l = LAYERS.find((x) => x.id === layerId);
  if (!l) return "";
  return `${l.id.toLowerCase()}-${l.shortName.toLowerCase().replace(/\s+/g, "-")}`;
};

/**
 * Canonical layer reference. Always renders "L# Short" with the layer's color.
 * Single source of truth for how layers appear across the site.
 */
const LayerTag: React.FC<Props> = ({
  id,
  variant = "chip",
  full = false,
  withSublayerName = false,
  link = false,
  className = "",
}) => {
  const isSub = /[a-z]$/.test(id);
  const parentId = id.replace(/[a-z]$/, "");
  const labelMap = full ? LAYER_LABEL : LAYER_SHORT_LABEL;
  const name = labelMap[parentId] ?? parentId;
  const subName = isSub ? SUBLAYER_LABEL[id] : "";

  // Display: chips/inline show "L# Short" or sublayer "L#x · SubName".
  // Render L-1 with a true Unicode minus (U+2212) so it reads as "L minus one",
  // not "L hyphen 1". Data id stays "L-1" for URLs / API stability.
  const displayId = id.startsWith("L-1") ? id.replace("L-1", "L\u22121") : id;
  const showName = withSublayerName && subName ? subName : name;

  const color = layerColor(parentId);
  const cssVar = layerVar(parentId);

  let content: React.ReactNode;
  switch (variant) {
    case "id-only":
      content = (
        <span className={`font-bold ${className}`} style={{ color }}>
          {displayId}
        </span>
      );
      break;
    case "inline":
      content = (
        <span className={`font-semibold ${className}`} style={{ color }}>
          {displayId} {showName}
        </span>
      );
      break;
    case "dot":
      content = (
        <span className={`inline-flex items-center gap-1.5 ${className}`}>
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: color }}
            aria-hidden
          />
          <span className="font-medium" style={{ color }}>
            {displayId} {showName}
          </span>
        </span>
      );
      break;
    case "chip":
    default:
      content = (
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-bold whitespace-nowrap ${className}`}
          style={{
            background: `hsl(var(${cssVar}) / 0.12)`,
            color,
            border: `1px solid hsl(var(${cssVar}) / 0.3)`,
          }}
          title={full ? showName : LAYER_LABEL[parentId]}
        >
          <span>{displayId}</span>
          <span className="font-semibold opacity-90">{showName}</span>
          {isSub && withSublayerName && subName && (
            <span className="font-normal opacity-70">· {subName}</span>
          )}
        </span>
      );
  }

  if (link) {
    return (
      <Link to={`/framework/${layerSlug(parentId)}`} className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }
  return <>{content}</>;
};

export default LayerTag;
