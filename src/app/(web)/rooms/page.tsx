"use client";

import RoomCard from "@/components/RoomCard/room-card";
import Search from "@/components/Search/search";
import { getRooms } from "@/libs/apis";
import { Room } from "@/models/room";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roomType, setRoomType] = useState("");
  const searchParams = useSearchParams();

  function filterRoom(rooms: Room[]) {
    return rooms?.filter((room) => {
      if (!room.nama) return false;

      // 1. Filter berdasarkan tipe kamar
      if (
        roomType &&
        roomType.toLowerCase() !== "all" &&
        room.type.toLowerCase() !== roomType.toLowerCase()
      )
        return false;

      // 2. Filter berdasarkan kueri pencarian
      if (
        searchQuery &&
        !room.nama.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;

      return true;
    });
  }

  useEffect(
    function () {
      const searchQueryParams = searchParams.get("searchQuery");
      const roomTypeParams = searchParams.get("roomType");

      if (searchQueryParams) setSearchQuery(searchQueryParams);
      if (roomTypeParams) setRoomType(roomTypeParams);
    },
    [searchParams, searchQuery, roomType]
  );

  const { data, error, isLoading } = useSWR("get/kamarHotel", getRooms);

  if (error) throw new Error("Gagal mendapatkan kamar hotel.");

  if (typeof data === "undefined" && !isLoading)
    throw new Error("Data tidak ditemukan.");

  const filteredRooms = filterRoom(data || []);

  return (
    <div className="container mx-auto pt-10">
      <Search
        roomType={roomType}
        searchQuery={searchQuery}
        setRoomType={setRoomType}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex mt-20 justify-start flex-wrap gap-5">
        {filteredRooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default Page;
