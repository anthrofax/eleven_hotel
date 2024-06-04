import { getRoom } from "@/libs/apis";
import { useRouter } from "next/navigation";
import useSWR from "swr";

function useDetailRoom(slug: string) {
  let hargaDiskon = 0;
  const router = useRouter();

  const {
    data: room,
    error,
    isValidating: isLoading,
  } = useSWR("/api/room", getRoom.bind(null, slug));

  function reset() {
    router.push("/rooms");
  }

  if (room) hargaDiskon = room.harga - (room.harga / 100) * room.diskon;

  return { room, hargaDiskon, error, isLoading, reset };
}

export default useDetailRoom;
