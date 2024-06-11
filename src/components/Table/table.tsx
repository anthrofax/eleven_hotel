import { Rupiah } from "@/helper/formatCurrency";
import { Booking } from "@/models/booking";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

function Table({
  bookingDetails,
  setRoomId,
  toggleRatingModal,
}: {
  bookingDetails: Booking[];
  setRoomId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
}) {
  const router = useRouter();


  return (
    <div className="overflow-x-auto max-w-[340px] rounded-lg mx-auto md:max-w-full shadow-md dark:shadow-[white/30] sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 dark:text-white/80 uppercase bg-gray-50 dark:bg-black2">
          <tr>
            <th className="px-6 py-3">Room name</th>
            <th className="px-6 py-3">Unit Price</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Discount</th>
            <th className="px-6 py-3">No. Days Booked</th>
            <th className="px-6 py-3">Days Left</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {bookingDetails.map((booking) => (
            <tr
              key={booking._id}
              className="bg-white dark:bg-black dark:text-white border-b hover:bg-gray-50 dark:hover:bg-black2"
            >
              <th
                onClick={() =>
                  router.push(`/rooms/${booking.kamarHotel.slug.current}`)
                }
                className="px-6 underline text-blue-600 cursor-pointer py-4 font-medium whitespace-nowrap"
              >
                {booking.kamarHotel.nama}
              </th>
              <td className="px-6 py-4">{Rupiah.format(booking.kamarHotel.harga)}</td>
              <td className="px-6 py-4">{Rupiah.format(booking.hargaTotal)}</td>
              <td className="px-6 py-4">{booking.diskon}%</td>
              <td className="px-6 py-4">{booking.masaInap}</td>
              <td className="px-6 py-4">0</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setRoomId(booking.kamarHotel._id);
                    toggleRatingModal();
                  }}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Rate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
