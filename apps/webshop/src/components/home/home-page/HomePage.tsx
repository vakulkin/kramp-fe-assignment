import { Product } from '../../../types';
import { SEO } from '../../widgets/seo/SEO';
import HeroSection from '../hero-section/HeroSection';
import FeaturedProducts from '../featured-products/FeaturedProducts';
import CategorySection from '../category-section/CategorySection';

console.log('[HomePage] module loaded');

interface HomePageProps {
  featured: Product[];
}

export default function HomePage({ featured }: HomePageProps) {
  console.log('[HomePage] render');

  return (
    <div>
      <SEO
        title="Home | Kramp Webshop"
        description="Welcome to Kramp Webshop. Discover our featured products and categories."
      />
      <HeroSection />
      <FeaturedProducts featured={featured} />
      <CategorySection />
    </div>
  );
}
