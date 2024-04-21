import { Ulasan } from "@/models/ulasan";
import axios from "axios";
import useSWR from "swr";
import Rating from "../Rating/rating";

function RoomReview({ idKamar }: { idKamar: string }) {
  const fetchRoomReviews = async () => {
    const { data } = await axios.get<Ulasan[]>(`/api/room-reviews/${idKamar}`);

    return data;
  };

  const {
    data: roomReviews,
    error,
    isLoading,
  } = useSWR("/api/room-reviews", fetchRoomReviews);

  if (error) throw new Error("Cannot fetch data");
  if (typeof roomReviews === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  return (
    <>
      {roomReviews &&
        roomReviews.map((review) => (
          <div
            className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg"
            key={review._id}
          >
            <div className="font-semibold mb-2 flex">
              <p>{review.user.name}</p>
              <div className="ml-4 flex items-center text-tertiary-light text-lg">
                <Rating rating={review.ratingPengguna} />
              </div>
            </div>

            <p>{review.teks}</p>
          </div>
        ))}
    </>
  );
}

export default RoomReview;
