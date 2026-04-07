import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout = ({ children }: SiteLayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <SiteHeader />
    <main className="flex-1 pt-16">{children}</main>
    <SiteFooter />
  </div>
);

export default SiteLayout;
