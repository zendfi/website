import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import LogoMarquee from '@/components/sections/LogoMarquee';
import ProofSection from '@/components/sections/ProofSection';
import OnrampSection from '@/components/sections/OnrampSection';
import CheckoutSection from '@/components/sections/CheckoutSection';
import DevSection from '@/components/sections/DevSection';
import EarnSection from '@/components/sections/EarnSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import SecuritySection from '@/components/sections/SecuritySection';
import PricingPreview from '@/components/sections/PricingPreview';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-bg min-h-screen">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <ProofSection />
      <OnrampSection />
      <CheckoutSection />
      <DevSection />
      <EarnSection />
      <FeaturesSection />
      <SecuritySection />
      <PricingPreview />
      <CtaSection />
      <Footer />
    </main>
  );
}
