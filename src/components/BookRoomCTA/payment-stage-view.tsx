import { RiDiscountPercentFill } from "react-icons/ri";
import { MdMan } from "react-icons/md";
import { LuBaby } from "react-icons/lu";
import { id } from "date-fns/locale/id";
import { format } from "date-fns";

type Props = {
  checkinDate: Date | null;
  checkoutDate: Date | null;
  harga: number;
  diskon: number;
  jumlahOrangDewasa: number;
  jumlahAnak: number;
  isBooked: boolean;
  hargaDiskon: number;
  bookingKamar: () => void;
  hitungMasaInap: () => number;
};

function PaymentStageView(props: Props) {
  const {
    checkinDate,
    checkoutDate,
    jumlahAnak,
    jumlahOrangDewasa,
    diskon,
    isBooked,
    harga,
    hargaDiskon,
    bookingKamar,
    hitungMasaInap,
  } = props;

  let Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

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
        <MdMan size={20} color="#0C356A" />{" "}
        <span>{jumlahOrangDewasa} Orang Dewasa</span>
      </div>

      {jumlahAnak > 0 && (
        <div className="flex gap-1 mt-3">
          <LuBaby size={20} color="#0C356A" />{" "}
          <span>{jumlahAnak} Anak Kecil</span>
        </div>
      )}

      {hitungMasaInap() > 0 ? (
        <div className="bg-primary rounded-full w-full mt-5 py-2 px-5 flex justify-between text-white items-center text-lg">
          <p>Harga </p>
          <h3>
            <span className={`font-thin  text-xl`}>
               {Rupiah.format(hitungMasaInap() * harga)}
            </span>
          </h3>
        </div>
      ) : (
        <></>
      )}

      {diskon > 0 && (
        <div className="bg-tertiary-superLight rounded-full w-full mt-5 py-2 px-5 flex justify-between text-black items-center text-lg">
          <RiDiscountPercentFill size={25} color="#0C356A" />
          <span className="font-bold text-xl">
            {" "}
            | Diskon {diskon}% saat ini,{" "}
            <span className="text-tertiary-dark">
               {Rupiah.format((harga / 100) * diskon)}
            </span>
          </span>
        </div>
      )}

      {hitungMasaInap() > 0 && (
        <div className="bg-tertiary-superLight rounded-full w-full mt-5 py-2 px-5 flex justify-between text-black items-center text-lg">
          <p>Harga Total </p>
          <h3>
            <span className={`font-thin  text-xl`}>
               {Rupiah.format(hitungMasaInap() * hargaDiskon)}
            </span>
          </h3>
        </div>
      )}

      <button
        disabled={isBooked}
        onClick={bookingKamar}
        className="btn-primary w-3/4 mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-full container mx-auto flex items-center justify-center text-sm"
      >
        {isBooked ? "Booked" : "Payment Now!"}
      </button>
    </>
  );
}

export default PaymentStageView;