"use client";

import HotelPhotoGallery from "@/components/HotelPhotoGallery/hotel-photo-gallery";
import { getRoom } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";

function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const {
    data: room,
    error,
    isLoading,
  } = useSWR("/api/room", getRoom.bind(null, slug));

  if (error) throw new Error("Cannot fetch data");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  if (!room) return <LoadingSpinner />;

  return (
    <div>
      <HotelPhotoGallery photos={room.gambar} />
    </div>
  );
}

export default Page;
