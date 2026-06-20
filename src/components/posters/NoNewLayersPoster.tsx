import ExportablePng from "@/components/ExportablePng";
import heroImg from "@/assets/no-new-layers-sketch.png";

/**
 * NoNewLayersPoster, hand-drawn hero for the "Why Workflows and Distribution
 * Are Not New Layers" post. Sketch-register illustration: the 10-layer stack
 * with L9 / L10 crossed out and red arrows decoding them back into L6, L3, L7.
 */
const NoNewLayersPoster = () => {
  return (
    <ExportablePng
      fileName="no-new-layers-sketch"
      caption="No L9. No L10. Decode the request into the stack you already have."
      exportBackground="hsl(40 30% 97%)"
    >
      <div
        className="w-full mx-auto"
        style={{
          background:
            "linear-gradient(160deg, hsl(40 30% 97%) 0%, hsl(38 26% 94%) 100%)",
        }}
      >
        <img
          src={heroImg}
          alt="Hand-drawn whiteboard sketch of the Supply Chain of Intelligence 10-layer stack. Two extra boxes for L9 Workflows and L10 Distribution sit above the stack with big red X marks, and red arrows curve back down to L6 Orchestration, L3 Gates, and L7 Surface, showing the framework already absorbs both."
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
    </ExportablePng>
  );
};

export default NoNewLayersPoster;
