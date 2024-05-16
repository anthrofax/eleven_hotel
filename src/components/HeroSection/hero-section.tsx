import Image from "next/image";
import CountUpNumber from "../CountUpNumber/count-up-number";

function HeroSection() {
  return (
    <section className="mx-auto flex px-4 items-center gap-12 container">

      <div className="container mx-auto">
        <div className="h-100 rounded-sm overflow-hidden">
          <figure className="min-w-full transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
  
              <Image 
                src="/images/hero-2.jpeg" 
                alt="Hero Image 2" 
                width={1000}
                height={1000}
                className="min-w-full max-w-1000 h-80"
              />
            <figcaption className="absolute px-4 text-lg text-white bottom-6">
              <h1 >EXPLORE THE LUXURY</h1>
            </figcaption>
          </figure>
        </div>
      </div>

{/*
          <div>
            <h1>EXPLORE THE LUXURY</h1>
            <Image
              src="/images/hero-2.jpeg"
              alt="Hero Image 2"
              width={1000}
              height={1000}
              className="w-24 min-w-full"
            />
          </div>
        </div>
      </div>
/*}

      {/*
      <div className="py-10 h-full">
        {" "}
        <h1 className="font-heading mb-6">Explore Our Exquisite Hotel</h1>
        <p className="text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg">
          Experience and Exquisite Hotel Immersed in Rich History and Timeless
          Elegance
        </p>
        <button className="btn-primary">Get Started</button>
        <div className="flex justify-between mt-12">
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-xl text-center">Basic Room </p>
            <CountUpNumber duration={3000} endValue={200} />
            
          </div>
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-xl text-center">Luxury Room </p>
            <CountUpNumber duration={3000} endValue={100} />
          </div>
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-xl text-center">Suite</p>
            <CountUpNumber duration={3000} endValue={50} />
          </div>
        </div>
      </div>
      

      // IMAGES 
      <div className="md:grid hidden gap-8 grid-cols-1">
        <div className="rounded-2xl overflow-hidden h-48">
          <Image
            src="/images/hero-1.jpeg"
            alt="Hero Image 1"
            width={300}
            height={300}
            className="img scale-animation"
            priority
          />
        </div>

        <div className="grid grid-cols-2 gap-48 h-48 ">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/hero-2.jpeg"
              alt="Hero Image 2"
              width={300}
              height={300}
              className="img scale-animation"
            />
          </div>

          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/hero-3.jpeg"
              alt="Hero Image 3"
              width={300}
              height={300}
              className="img scale-animation"
            />
          </div>
        </div>
      </div>
  */}
    </section>
  );
}

export default HeroSection;
