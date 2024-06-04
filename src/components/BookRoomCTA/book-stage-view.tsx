import { MdMan } from "react-icons/md";
import { LuBaby } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import {  useRouter } from "next/navigation";
import { useBookingContext } from "@/context/booking-context";
import { Room } from "@/models/room";

function BookStageView({ room, slug }: { room: Room; slug: string }) {
  const {
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    setDataJumlahOrangDewasa,
    setDataJumlahAnak,
    hitungMinimumTanggalCheckout,
    setBookingStage,
    dataJumlahAnak,
    dataJumlahOrangDewasa,
  } = useBookingContext();

  const router = useRouter();

  return (
    <>
      <h4 className="my-8">{room.catatanPelanggan}</h4>

      <div className="flex justify-between gap-5">
        <div className="w-1/2 pr-2 ">
          <label
            htmlFor="check-in-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-3"
          >
            <p>Check-in</p>
            <p>DD/MM/YYYY</p>
          </label>
          <DatePicker
            selected={checkinDate}
            onChange={(date) => setCheckinDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            id="check-in-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary bg-tertiary-superLight"
            showIcon
            icon={<FaCalendarAlt size={25} color="#0C356A" />}
          />
        </div>
        <div className="w-1/2 pl-2 ">
          <label
            htmlFor="check-out-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-3"
          >
            <p>Check-out</p>
            <p>DD/MM/YYYY</p>
          </label>
          <DatePicker
            selected={checkoutDate}
            onChange={(date) => setCheckoutDate(date)}
            dateFormat="dd/MM/yyyy"
            disabled={!checkinDate}
            minDate={hitungMinimumTanggalCheckout()}
            id="check-out-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary bg-tertiary-superLight"
            showIcon
            icon={<FaCalendarAlt size={25} color="#0C356A" />}
          />
        </div>
      </div>

      <div className="flex mt-4 flex-col gap-5">
        <div className="w-full">
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Dewasa
          </label>

          <div className="relative">
            <MdMan
              className="absolute top-1/2 -translate-y-1/2 left-2"
              size={25}
              color="#0C356A"
            />

            <input
              type="number"
              id="adults"
              value={dataJumlahOrangDewasa}
              onChange={(e) => setDataJumlahOrangDewasa(+e.target.value)}
              min={1}
              max={5}
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-tertiary-superLight pl-8 "
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="children"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Jumlah Anak
          </label>

          <div className="relative">
            <LuBaby
              className="absolute top-1/2 -translate-y-1/2 left-2"
              size={25}
              color="#0C356A"
            />

            <input
              type="number"
              id="children"
              value={dataJumlahAnak}
              onChange={(e) => setDataJumlahAnak(+e.target.value)}
              min={0}
              max={3}
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-tertiary-superLight pl-10 "
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          className="booking-btn bg-secondary"
          disabled={room.isBooked}
          onClick={() => {
            if (!checkinDate || !checkoutDate || !dataJumlahOrangDewasa)
              return toast.error("Mohon isi data booking terlebih dahulu");

            router.push(`/rooms/${slug}/layanan-tambahan`);
          }}
        >
          Booking dengan layanan tambahan
        </button>
        <button
          disabled={room.isBooked}
          onClick={() => {
            if (!checkinDate || !checkoutDate || !dataJumlahOrangDewasa)
              return toast.error("Mohon isi data booking terlebih dahulu");

            setBookingStage("payment");
          }}
          className="booking-btn bg-primary"
        >
          {room.isBooked ? "Booked" : "Booking Reguler"}
        </button>
      </div>
    </>
  );
}

export default BookStageView;
