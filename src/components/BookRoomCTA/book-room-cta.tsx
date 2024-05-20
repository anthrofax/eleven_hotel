import { Dispatch, SetStateAction, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import BookStageView from "./book-stage-view";

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
  } = props;

  const hargaDiskon = harga - (harga / 100) * diskon;

  const [bookingStage, setBookingStage] = useState<"booking" | "payment">(
    "booking"
  );

  return (
    <div className="px-7 py-6 bg-tertiary-light rounded-2xl w-full">
      <h3 className="text-2xl font-semibold text-center">Super Room Eleven</h3>

      <div className="w-full border-b-2 border-b-secondary mt-2 mb-5" />

      {/* <div className="bg-primary rounded-full w-full py-2 px-5 flex justify-between text-white items-center text-lg">
        <p>Total </p>
        <h3>
          <span
            className={`${diskon ? "text-gray-400" : ""} font-thin  text-xl`}
          >
            Rp. {harga}
          </span>
          {diskon ? (
            <span className="font-bold text-xl">
              {" "}
              | Diskon {diskon}% saat ini,{" "}
              <span className="text-tertiary-dark">Rp. {hargaDiskon}</span>
            </span>
          ) : (
            ""
          )}
        </h3>
      </div> */}

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
