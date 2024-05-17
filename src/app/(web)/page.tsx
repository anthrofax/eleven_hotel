import FeaturedRoom from "@/components/FeaturedRoom/featured-room";
import Gallery from "@/components/Gallery/gallery";
import HeroSection from "@/components/HeroSection/hero-section";
import NewsLetter from "@/components/NewsLetter/news-letter";
import PageSearch from "@/components/PageSearch/page-search";
import { getFeaturedRoom } from "@/libs/apis";

export default async function Home() {
  const x = 8
  const featuredRoom = await getFeaturedRoom();
  
  return (
    <>
      <HeroSection />;
      <PageSearch />
      <FeaturedRoom featuredRoom={featuredRoom} />
      <Gallery />
    </>
  );
}
