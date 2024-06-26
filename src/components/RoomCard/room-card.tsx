import Image from "next/image";

import { Room } from "@/models/room";
import Link from "next/link";
import { Rupiah } from "@/helper/formatCurrency";

type Props = {
  room: Room;
};

function RoomCard({ room }: Props) {
  const { coverGambar, nama, harga, type, deskripsi, slug, isBooked } = room;

  if (!nama) return null;

  return (
    <div className="rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black dark:bg-black dark:text-white">
      <div className="h-60 overflow-hidden">
        <Image
          src={coverGambar?.url}
          alt={nama}
          width={250}
          height={250}
          className="img scale-animation"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between text-lg font-semibold">
          <p>{nama}</p>
          <p>{Rupiah.format(harga)}</p>
        </div>

        <p className="pt-2 text-xs">
          {`${type[0].toUpperCase() + type.slice(1)}`} Room
        </p>

        <p className="pt-3 pb-6">{deskripsi.slice(0, 100)}...</p>

        <Link
          href={`/rooms/${slug.current}`}
          className="bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
        >
          {isBooked ? "BOOKED" : "BOOK NOW"}
        </Link>
      </div>
    </div>
  );
}

export default RoomCard;
