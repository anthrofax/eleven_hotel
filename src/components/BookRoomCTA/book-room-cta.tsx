import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  hitungMasaInap: () => number 
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
    hitungMasaInap
  } = props;

  const hargaDiskon = harga - (harga / 100) * diskon;

  return (
    <div className="px-7 py-6">
      <h3>
        <span className={`${diskon ? "text-gray-400" : ""} font-bold text-xl`}>
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

      <div className="w-full border-b-2 border-b-secondary my-2" />

      <h4 className="my-8">{catatanPelanggan}</h4>

      <div className="flex">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="check-in-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check-in
          </label>
          <DatePicker
            selected={checkinDate}
            onChange={(date) => setCheckinDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            id="check-in-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="check-out-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check-out
          </label>
          <DatePicker
            selected={checkoutDate}
            onChange={(date) => setCheckoutDate(date)}
            dateFormat="dd/MM/yyyy"
            disabled={!checkinDate}
            minDate={hitungMinimumTanggalCheckout()}
            id="check-out-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div className="flex mt-4">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Dewasa
          </label>
          <input
            type="number"
            id="adults"
            value={jumlahOrangDewasa}
            onChange={(e) => setAdults(+e.target.value)}
            min={1}
            max={5}
            className="w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="children"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Jumlah Anak
          </label>
          <input
            type="number"
            id="children"
            value={jumlahAnak}
            onChange={(e) => setNoOfChildren(+e.target.value)}
            min={0}
            max={3}
            className="w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>
      </div>

      {hitungMasaInap() > 0 ? (
        <p className="mt-3">Total: Rp. {hitungMasaInap() * hargaDiskon}</p>
      ) : (
        <></>
      )}

      <button
        disabled={isBooked}
        onClick={bookingKamar}
        className="btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isBooked ? "Booked" : "Book Now"}
      </button>
    </div>
  );
}

export default BookRoomCTA;
