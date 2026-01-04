import { Navigation } from '@/components/landing/Navigation';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { DashboardPreview } from '@/components/landing/DashboardPreview';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { IntegrationSection } from '@/components/landing/IntegrationSection';
import { SocialProof } from '@/components/landing/SocialProof';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DashboardPreview />
        <BenefitsSection />
        <IntegrationSection />
        <SocialProof />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
