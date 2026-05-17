import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import FrameworkPage from "./pages/Framework";
import LayerDetailPage from "./pages/LayerDetail";
import AnalysisPage from "./pages/Analysis";
import CaseStudyDetailPage from "./pages/CaseStudyDetail";
import ForProductLeaders from "./pages/ForProductLeaders";
import AboutPage from "./pages/About";
import LivePage from "./pages/Live";
import LiveArticleDetail from "./pages/LiveArticleDetail";
import MarketMap from "./pages/MarketMap";
import FaqPage from "./pages/Faq";
import LawEssayPage from "./pages/LawEssay";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/framework" element={<FrameworkPage />} />
          <Route path="/framework/:layerId" element={<LayerDetailPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/analysis/:slug" element={<CaseStudyDetailPage />} />
          <Route path="/for-product-leaders" element={<ForProductLeaders />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="/live/:slug" element={<LiveArticleDetail />} />
          <Route path="/market-map" element={<MarketMap />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/laws/:slug" element={<LawEssayPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
