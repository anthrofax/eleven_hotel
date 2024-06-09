import Image from "next/image";

const Gallery = () => {
  return (
    <div className=" mx-auto container py-14 h-full">
      <div className="flex flex-wrap">
        <div className="flex w-1/2 flex-wrap">
          <div className="w-1/2 p-1 md:p-2 h-48">
            <Image
              alt="gallery"
              className="img rounded-2xl"
              src="/images/hero-1.jpeg"
              width={200}
              height={200}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2 h-48">
            <Image
              alt="gallery"
              className="img rounded-2xl"
              src="/images/hero-2.jpeg"
              width={200}
              height={200}
            />
          </div>
          <div className="w-full p-1 md:p-2 h-48">
            <Image
              alt="gallery"
              className="img rounded-2xl"
              src="/images/hero-3.jpeg"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2 h-48">
            <Image
              alt="gallery"
              className="img rounded-2xl"
              src="/images/hero-1.jpeg"
              width={200}
              height={200}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2 h-48">
            <Image
              alt="gallery"
              className="img rounded-2xl"
              src="/images/hero-2.jpeg"
              width={200}
              height={200}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2 h-48">
            <Image
              alt="gallery"
              className="img rounded-2xl"
              src="/images/hero-3.jpeg"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>

      <div className="bg-amber-400 rounded-2xl mt-20 px-4 py-10 mx-auto w-[80%]">
        <div className="mb-5">
          <h1 className="text-center text-2xl md:text-4xl font-semibold">
            Collaborating Companies
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mx-auto text-center justify-evenly items-center relative flex-wrap">
          <div className="h-40 aspect-square rounded-full relative">
            <Image
              alt="gallery"
              src="/images/companies/astra.jpg"
              className="h-40 aspect-square rounded-full relative"
              fill
            />
          </div>
          <div className="h-40 aspect-square rounded-full relative">
            <Image
              alt="gallery"
              src="/images/companies/Ellipse 9.png"
              fill
            />
          </div>
          <div className="h-40 aspect-square rounded-full relative">
            <Image
              alt="gallery"
              src="/images/companies/Ellipse 10.png"
              fill
            />
          </div>
          <div className="h-40 aspect-square rounded-full relative">
            <Image
              alt="gallery"
              src="/images/companies/Ellipse 11.png"
              fill
            />
          </div>
          <div className="h-40 aspect-square rounded-full relative">
            <Image
              alt="gallery"
              src="/images/companies/Ellipse 8.png"
              fill
            />
          </div>
          <div className="h-40 aspect-square rounded-full relative">
            <Image
              alt="gallery"
              src="/images/companies/Ellipse 11.png"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
