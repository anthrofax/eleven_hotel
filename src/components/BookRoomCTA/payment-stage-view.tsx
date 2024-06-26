import { RiDiscountPercentFill } from "react-icons/ri";
import { IoIosPricetag } from "react-icons/io";
import { MdMan } from "react-icons/md";
import { LuBaby } from "react-icons/lu";
import { id } from "date-fns/locale/id";
import { format } from "date-fns";
import { useBookingContext } from "@/context/booking-context";
import { Rupiah } from "@/helper/formatCurrency";
import { Room } from "@/models/room";

function PaymentStageView({
  room,
  slug,
  hargaDiskon,
}: {
  room: Room;
  slug: string;
  hargaDiskon: number;
}) {
  const {
    checkinDate,
    checkoutDate,
    dataJumlahAnak,
    dataJumlahOrangDewasa,
    bookingKamar,
    hitungMasaInap,
    totalBiayaLayananTambahan,
  } = useBookingContext();

  const { diskon, isBooked, harga } = room;

  const locale = id;

  let tanggalCheckin, tanggalCheckout;

  if (checkinDate && checkoutDate) {
    tanggalCheckin = format(checkinDate!, "MMMM do", { locale });
    tanggalCheckout = format(checkoutDate!, "MMMM do", { locale });
  }

  return (
    <>
      {checkinDate && checkoutDate ? (
        <p>
          Masa Inap: {`${tanggalCheckin}`} - {`${tanggalCheckout}`}
        </p>
      ) : null}

      <div className="flex gap-1">
        <MdMan className="text-xl md:text-2xl" color="#0C356A" />{" "}
        <span>{dataJumlahOrangDewasa} Orang Dewasa</span>
      </div>

      {dataJumlahAnak > 0 && (
        <div className="flex gap-1 mt-3">
          <LuBaby className="text-xl md:text-2xl" color="#0C356A" />{" "}
          <span>{dataJumlahAnak} Anak Kecil</span>
        </div>
      )}

      {hitungMasaInap() > 0 ? (
        <div className="bg-primary rounded-xl lg:rounded-full w-full mt-5 py-2 px-5 gap-3 flex justify-between text-white items-center text-base lg:text-lg">
          <p>Harga</p>
          <h3>
            <span className={`font-thin`}>
              {Rupiah.format(hitungMasaInap() * harga)}
            </span>
          </h3>
        </div>
      ) : (
        <></>
      )}

      {diskon > 0 && (
        <div className="bg-tertiary-superLight rounded-full w-full mt-5 py-2 px-5 flex justify-between text-black items-center text-base lg:text-lg gap-3">
          <RiDiscountPercentFill
            className="text-5xl lg:text-3xl"
            color="#0C356A"
          />
          <span className="font-bold ">
            {" "}
            Diskon {diskon}% saat ini,{" "}
            <span className="text-green-500">
              -{Rupiah.format((harga / 100) * diskon)}
            </span>
          </span>
        </div>
      )}

      {totalBiayaLayananTambahan && (
        <div className="bg-tertiary-superLight rounded-full w-full mt-5 py-2 px-5 flex justify-between text-black items-center text-base lg:text-lg gap-3 text-end">
          <IoIosPricetag className="text-5xl lg:text-3xl" color="#0C356A" />
          <span className="font-bold">
            Total Biaya Layanan Tambahan,{" "}
            <span className="text-tertiary-dark">
              +{Rupiah.format(totalBiayaLayananTambahan)}
            </span>
          </span>
        </div>
      )}

      {hitungMasaInap() > 0 && (
        <div className="bg-tertiary-superLight rounded-full w-full mt-5 py-2 px-5 flex justify-between text-black items-center text-base lg:text-lg gap-3">
          <p>Harga Total </p>
          <h3>
            <span className={`font-thin`}>
              {Rupiah.format(
                hitungMasaInap() * (hargaDiskon + totalBiayaLayananTambahan)
              )}
            </span>
          </h3>
        </div>
      )}

      <button
        disabled={isBooked}
        onClick={() => bookingKamar(slug)}
        className="btn-primary w-3/4 mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-full container mx-auto flex items-center justify-center text-sm"
      >
        {isBooked ? "Booked" : "Payment Now!"}
      </button>
    </>
  );
}

export default PaymentStageView;
