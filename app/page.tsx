import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import LogoMarquee from '@/components/sections/LogoMarquee';
import ProofSection from '@/components/sections/ProofSection';
import OnrampSection from '@/components/sections/OnrampSection';
import CheckoutSection from '@/components/sections/CheckoutSection';
import ShopSection from '@/components/sections/ShopSection';
import DevSection from '@/components/sections/DevSection';
import EarnSection from '@/components/sections/EarnSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import SecuritySection from '@/components/sections/SecuritySection';
import PricingPreview from '@/components/sections/PricingPreview';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/Footer';
import InteractiveMatrix from '@/components/InteractiveMatrix';

export default function Home() {
  return (
    <main className="bg-bg min-h-screen relative">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <ProofSection />
      <OnrampSection />
      <CheckoutSection />
      {/* Floating Decorative Element */}
      <div className=" bottom-12 left-12 w-[500px] h-32 hidden lg:block z-0 pointer-events-auto">
        <InteractiveMatrix />
      </div>
      <DevSection />
      <ShopSection />
      <EarnSection />
      <FeaturesSection />
      <SecuritySection />
      <PricingPreview />
      <CtaSection />
      <Footer />
    </main>
  );
}
