import ExportablePng from "@/components/ExportablePng";
import heroImg from "@/assets/software-for-one-anatomy-sketch.png";

/**
 * SoftwareForOnePoster — the hero image for the "built for one" article.
 * Shows a personal AI agent shell peeled back to reveal the SCoI layers
 * underneath, with the bottom layers marked as shared/rented rails.
 */
const SoftwareForOnePoster = () => {
  return (
    <ExportablePng
      fileName="software-for-one-shared-rails"
      caption="Software for One — Still Rides Shared Rails"
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
          alt="Diagram: a personal AI agent peeled back to show the Supply Chain of Intelligence layers underneath. Top layers (L5–L8) are owned by the agent; bottom layers (L0–L4) are shared rails like Stripe, Cloudflare, and frontier models."
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
    </ExportablePng>
  );
};

export default SoftwareForOnePoster;
