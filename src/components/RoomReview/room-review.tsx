import { Ulasan } from "@/models/ulasan";
import axios from "axios";
import useSWR from "swr";
import Rating from "../Rating/rating";

function RoomReview({
  roomReviews,
  reviewError,
  reviewIsLoading,
}: {
  roomReviews: Ulasan[];
  reviewError: any;
  reviewIsLoading: any;
}) {
  if (reviewError) throw new Error(`Cannot fetch data: ${reviewError}`);


  return (
    <>
      {roomReviews &&
        roomReviews.map((review: Ulasan) => (
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
