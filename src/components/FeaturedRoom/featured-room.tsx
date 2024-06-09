import { Room } from "@/models/room";
import Image from "next/image";
import Link from "next/link";
import CountUpNumber from "../CountUpNumber/count-up-number";

type Props = {
  featuredRoom: Room;
};

function FeaturedRoom({ featuredRoom }: Props) {
  return (
    <section className="items-center gap-12 container mx-auto p-5">
      <div className="container mx-auto ">
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

      <div className="h-fit mt-20 container mx-auto relative w-full">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="h-64 w-[50%] rounded-md relative">
            <Image src="/images/hero-2.jpeg" alt="Hero Image 2" fill />
          </div>

          <p className="text-justify md:w-[50%] md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            aspernatur totam commodi, ullam eligendi et libero in quaerat beatae
            vitae, odio temporibus quos, veniam magnam doloremque qui ducimus
            omnis quae.
          </p>
        </div>
      </div>

      <div className="bg-amber-400 rounded-2xl mt-20 flex md:flex-row flex-col px-4 py-10 items-center gap-5 container mx-auto">
        <div className="md:py-10 md:w-1/2 text-left mx-auto">
          <h3 className="font-heading mb-12">Featured Room</h3>

          <p className="font-normal max-w-md">{featuredRoom.deskripsi}</p>

          <div className="flex flex-col md:flex-row md:items-end justify-between mt-5">
            <div className="flex mb-3 md:mb-0">
              <div className="flex gap-3 flex-col items-center justify-center mr-4">
                <p className="text-xs lg:text-xl text-center">Mulai dari</p>
                <p className="md:font-bold flex font-medium text-lg xl:text-5xl">
                  Rp. {featuredRoom.harga}
                </p>
              </div>
              <div className="flex gap-3 flex-col items-center justify-center mr-4">
                <p className="text-xs lg:text-xl text-center">Diskon</p>
                <p className="md:font-bold flex font-medium text-lg xl:text-5xl">
                  {featuredRoom.diskon} %
                </p>
              </div>
            </div>
            <Link
              href={`/rooms/${featuredRoom.slug.current}`}
              className="border h-fit text-center border-white text-white px-3 py-2 lg:py-5 lg:px-7 rounded-2xl font-bold lg:text-xl"
            >
              More Details
            </Link>
          </div>
        </div>

        <div className="md:grid gap-8 grid-cols-1 mx-auto">
          <div className="rounded-2xl overflow-hidden h-96 mb-4 md:mb-0 ">
            <Image
              src={featuredRoom.coverGambar.url}
              alt={featuredRoom.nama}
              width={300}
              height={300}
              className="img scale-animation"
            />
          </div>

          {/*
        <div className="grid grid-cols-2 gap-8 h-48">
          {featuredRoom.gambar.splice(1, 2).map((image) => (
            <div key={image._key} className="rounded-2xl overflow-hidden">
              <Image
                src={image.url}
                alt={image._key}
                width={300}
                height={300}
                className="img scale-animation"
              />
            </div>
          ))}
        </div>
          */}
        </div>
      </div>
    </section>
  );
}

export default FeaturedRoom;
