import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import FrameworkPage from "./pages/Framework";
import LayerDetailPage from "./pages/LayerDetail";
import AnalysisPage from "./pages/Analysis";
import CaseStudyDetailPage from "./pages/CaseStudyDetail";
import ForProductLeaders from "./pages/ForProductLeaders";
import ForInvestors from "./pages/ForInvestors";
import AboutPage from "./pages/About";
import LivePage from "./pages/Live";
import LiveArticleDetail from "./pages/LiveArticleDetail";
import MarketMap from "./pages/MarketMap";
import FaqPage from "./pages/Faq";
import LawEssayPage from "./pages/LawEssay";

import Predictions from "./pages/Predictions";
import Disclaimer from "./pages/Disclaimer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import RemasterAdmin from "./pages/RemasterAdmin";
import AuditAdmin from "./pages/AuditAdmin";
import Voices from "./pages/Voices";
import Challenge from "./pages/Challenge";
import EdgeCases from "./pages/EdgeCases";
import Playbook from "./pages/Playbook";
import PreAiProof from "./pages/PreAiProof";
import Glossary from "./pages/Glossary";
import Posters from "./pages/Posters";
import Classification from "./pages/Classification";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/start" element={<Start />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/framework" element={<FrameworkPage />} />
        <Route path="/framework/:layerId" element={<LayerDetailPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/analysis/:slug" element={<CaseStudyDetailPage />} />
        <Route path="/for-product-leaders" element={<ForProductLeaders />} />
        <Route path="/for-investors" element={<ForInvestors />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/live/:slug" element={<LiveArticleDetail />} />
        <Route path="/market-map" element={<MarketMap />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/laws/:slug" element={<LawEssayPage />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/admin/remaster" element={<RemasterAdmin />} />
        <Route path="/admin/audit" element={<AuditAdmin />} />
        <Route path="/voices" element={<Voices />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/edge-cases" element={<EdgeCases />} />
        <Route path="/playbook" element={<Playbook />} />
        <Route path="/essays/pre-ai-proof" element={<PreAiProof />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/stack" element={<Navigate to="/framework" replace />} />
        <Route path="/posters" element={<Posters />} />
        <Route path="/classification" element={<Classification />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
