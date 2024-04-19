import Gallery from "@/components/Gallery/gallery";
import HeroSection from "@/components/HeroSection/hero-section";
import NewsLetter from "@/components/NewsLetter/news-letter";
import PageSearch from "@/components/PageSearch/page-search";

export default function Home() {
  return (
    <>
      <HeroSection />;
      <PageSearch />
      {/* Featured Room */}
      <Gallery />
      <NewsLetter />
    </>
  );
}
