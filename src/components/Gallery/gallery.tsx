import Image from "next/image";

const Gallery = () => {
  return (
    <div className="px-20 mx-auto container py-14 h-full">
      <div className="flex flex-wrap md:-m-2">
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

      <div className="bg-amber-400 rounded-2xl mt-20 px-4 py-10 container mx-auto">
          <div className="mb-5">
            <h1 className="text-center text-4xl font-semibold">Collaborating Companies</h1>
          </div>

          <div className="items-center grid grid-cols-6 gap-4 mx-auto text-center">
            <Image
              alt="gallery"
              className="h-40 max-w-40 rounded-full"
              src="/images/companies/Ellipse 8.png"
              width={200}
              height={200}
            />
            <Image
              alt="gallery"
              className="h-40 max-w-40 rounded-full"
              src="/images/companies/Ellipse 9.png"
              width={200}
              height={200}
            />
            <Image
              alt="gallery"
              className="h-40 max-w-40 rounded-full"
              src="/images/companies/Ellipse 10.png"
              width={200}
              height={200}
            />
            <Image
              alt="gallery"
              className="h-40 max-w-40 rounded-full"
              src="/images/companies/Ellipse 11.png"
              width={200}
              height={200}
            />
            <Image
              alt="gallery"
              className="h-40 max-w-40 rounded-full"
              src="/images/companies/Ellipse 8.png"
              width={200}
              height={200}
            />
            <Image
              alt="gallery"
              className="h-40 max-w-40 rounded-full"
              src="/images/companies/Ellipse 11.png"
              width={200}
              height={200}
            />
          </div>
      </div>

    </div>
  );
};

export default Gallery;
