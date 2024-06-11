import { Dispatch, SetStateAction } from "react";
import { BsStarFill } from "react-icons/bs";

function RatingModal({
  isOpen,
  ratingValue,
  setRatingValue,
  ratingText,
  setRatingText,
  isSubmittingReview,
  reviewSubmitHandler,
  toggleRatingModal,
}: {
  isOpen: boolean;
  ratingValue: number;
  setRatingValue: Dispatch<SetStateAction<number>>;
  ratingText: string;
  setRatingText: Dispatch<SetStateAction<string>>;
  isSubmittingReview: boolean;
  reviewSubmitHandler: () => Promise<string | undefined>;
  toggleRatingModal: () => void;
}) {
  const bintang = [1, 2, 3, 4, 5];
  return (
    <div
      className={`fixed z-[61] inset-0 flex items-center justify-center ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl dark:text-gray-800 font-semibold mb-2">
          Ulas pengalamanmu
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Ulasan
          </label>
          <div className="flex items-center">
            {bintang.map((ulasan) => (
              <button
                className={`w-6 h-6 ${
                  ratingValue >= ulasan ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRatingValue(ulasan)}
                key={ulasan}
              >
                <BsStarFill />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Review Text
          </label>

          <textarea
            value={ratingText}
            onChange={(e) => setRatingText(e.target.value)}
            rows={4}
            className="w-full px-2 py-3 border rounded-md dark:text-black"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            onClick={reviewSubmitHandler}
            className="px-4 py-2 bg-primary text-white rounded-md"
            disabled={isSubmittingReview}
          >
            {isSubmittingReview ? "Submitting" : "Submit"}
          </button>
          <button
            onClick={toggleRatingModal}
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;
