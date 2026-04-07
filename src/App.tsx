import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import FrameworkPage from "./pages/Framework";
import AnalysisPage from "./pages/Analysis";
import ForProductLeaders from "./pages/ForProductLeaders";
import SpeakingPage from "./pages/Speaking";
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
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/for-product-leaders" element={<ForProductLeaders />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
