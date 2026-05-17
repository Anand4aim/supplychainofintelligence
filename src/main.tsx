import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

const tree = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

// If the container was prerendered (data-prerendered marker), hydration
// would mismatch our static body, so we just unmount & remount cleanly.
if (container.firstElementChild?.getAttribute("data-prerendered") === "true") {
  container.innerHTML = "";
}
createRoot(container).render(tree);
// hydrateRoot is imported to keep tree-shaking honest if we move to true
// hydration later; suppress unused warning.
void hydrateRoot;
