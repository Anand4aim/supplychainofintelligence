// SSR entry, called by scripts/prerender.ts to generate static HTML per route.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import App from "./App";

export interface RenderResult {
  html: string;
  head: {
    title: string;
    meta: string;
    link: string;
    script: string;
  };
}

export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );
  const h = helmetContext.helmet;
  return {
    html,
    head: {
      title: h?.title.toString() ?? "",
      meta: h?.meta.toString() ?? "",
      link: h?.link.toString() ?? "",
      script: h?.script.toString() ?? "",
    },
  };
}
