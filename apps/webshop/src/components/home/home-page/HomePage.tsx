import HeroSection from '../hero-section/HeroSection';
import FeaturedProducts from '../featured-products/FeaturedProducts';
import CategorySection from '../category-section/CategorySection';

interface HomePageProps {
  featured: any[];
  timestamp: number;
}

export default function HomePage({ featured, timestamp }: HomePageProps) {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts featured={featured} timestamp={timestamp} />
      <CategorySection />
    </div>
  );
}
