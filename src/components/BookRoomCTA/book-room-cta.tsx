// @refresh reset

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import BookStageView from "./book-stage-view";
import { IoChevronBackCircle } from "react-icons/io5";
import PaymentStageView from "./payment-stage-view";

type Props = {
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  setAdults: Dispatch<SetStateAction<number>>;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  hitungMinimumTanggalCheckout: () => Date | null;
  harga: number;
  diskon: number;
  jumlahOrangDewasa: number;
  jumlahAnak: number;
  catatanPelanggan: string;
  isBooked: boolean;
  bookingKamar: () => void;
  hitungMasaInap: () => number;
  nama: string;
};

function BookRoomCTA(props: Props) {
  const {
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    setAdults,
    setNoOfChildren,
    hitungMinimumTanggalCheckout,
    harga,
    diskon,
    jumlahOrangDewasa,
    jumlahAnak,
    catatanPelanggan,
    isBooked,
    bookingKamar,
    hitungMasaInap,
    nama,
  } = props;

  const hargaDiskon = harga - (harga / 100) * diskon;

  const [bookingStage, setBookingStage] = useState<"booking" | "payment">(
    "payment"
  );

  useEffect(
    function () {
      if (!checkinDate || !checkoutDate || !jumlahOrangDewasa || !jumlahAnak) {
        setBookingStage("booking");
      }
    },
    [checkinDate, checkoutDate, jumlahAnak, jumlahOrangDewasa]
  );

  return (
    <div className="px-7 py-6 bg-tertiary-light rounded-2xl w-full relative">
      <h3 className="text-2xl font-semibold text-center">{nama}</h3>

      <div className="w-full border-b-2 border-b-secondary mt-2 mb-5" />

      {bookingStage === "payment" && (
        <>
          <IoChevronBackCircle
            size={50}
            color="#0C356A"
            className="absolute left-3 top-2 hover:scale-105 duration-300 transition-all cursor-pointer"
            onClick={() => setBookingStage("booking")}
          />

          <PaymentStageView
            bookingKamar={bookingKamar}
            checkinDate={checkinDate}
            checkoutDate={checkoutDate}
            diskon={diskon}
            harga={harga}
            hargaDiskon={hargaDiskon}
            isBooked={isBooked}
            jumlahAnak={jumlahAnak}
            jumlahOrangDewasa={jumlahOrangDewasa}
            hitungMasaInap={hitungMasaInap}
          />
        </>
      )}

      {bookingStage === "booking" && (
        <BookStageView
          checkinDate={checkinDate}
          setCheckinDate={setCheckinDate}
          checkoutDate={checkoutDate}
          catatanPelanggan={catatanPelanggan}
          hitungMasaInap={hitungMasaInap}
          hitungMinimumTanggalCheckout={hitungMinimumTanggalCheckout}
          isBooked={isBooked}
          jumlahAnak={jumlahAnak}
          jumlahOrangDewasa={jumlahOrangDewasa}
          setAdults={setAdults}
          setCheckoutDate={setCheckoutDate}
          setNoOfChildren={setNoOfChildren}
          setBookingStage={setBookingStage}
          hargaDiskon={hargaDiskon}
        />
      )}
    </div>
  );
}

export default BookRoomCTA;
