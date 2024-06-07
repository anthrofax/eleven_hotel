"use client";

import { getRoom } from "@/libs/apis";
import { getStripe } from "@/libs/stripe";
import LayananTambahan from "@/models/layananTambahan";
import { Room } from "@/models/room";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type CartItemType = {
  qty: number;
  id: string,
  harga: number
}

type BookingContextType = {
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  dataJumlahOrangDewasa: number;
  setDataJumlahOrangDewasa: Dispatch<SetStateAction<number>>;
  dataJumlahAnak: number;
  setDataJumlahAnak: Dispatch<SetStateAction<number>>;
  hitungMasaInap: () => number;
  hitungMinimumTanggalCheckout: () => Date | null;
bookingKamar: (slugKamar: string) => void;
  bookingStage: "booking" | "payment";
  setBookingStage: Dispatch<SetStateAction<"booking" | "payment">>;
  hargaLayananTambahan: number;
  setHargaLayananTambahan: Dispatch<SetStateAction<number>>;
  bookingCart: CartItemType[];
  setBookingCart: Dispatch<SetStateAction<CartItemType[]>>;
};

const BookingContext = createContext<BookingContextType>({
  checkinDate: null,
  setCheckinDate: function () {},
  checkoutDate: null,
  setCheckoutDate: function () {},
  dataJumlahOrangDewasa: 0,
  setDataJumlahOrangDewasa: function () {},
  dataJumlahAnak: 0,
  setDataJumlahAnak: function () {},
  hitungMasaInap: function () {
    return 0;
  },
  hitungMinimumTanggalCheckout: function () {
    return null;
  },
  bookingKamar: function () {},
  bookingStage: "booking",
  setBookingStage: function () {},
  hargaLayananTambahan: 0,
  setHargaLayananTambahan: function () {},
  bookingCart: [],
  setBookingCart: function () {},
});

function BookingContextProvider({ children }: { children: React.ReactNode }) {
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [dataJumlahOrangDewasa, setDataJumlahOrangDewasa] = useState<number>(1);
  const [dataJumlahAnak, setDataJumlahAnak] = useState<number>(0);
  const [bookingStage, setBookingStage] = useState<"booking" | "payment">(
    "booking"
  );
  const [hargaLayananTambahan, setHargaLayananTambahan] = useState(0);
  const [bookingCart, setBookingCart] = useState<CartItemType[]>([]);


  function hitungMasaInap(): number {
    if (!checkinDate || !checkoutDate) return 0;

    const selisihWaktu = checkoutDate.getTime() - checkinDate.getTime();
    const masaInap = Math.ceil(selisihWaktu / (24 * 60 * 60 * 1000));

    return masaInap;
  }

  function hitungMinimumTanggalCheckout() {
    if (!checkinDate) return null;

    const nextDay = new Date(checkinDate);
    nextDay.setDate(nextDay.getDate() + 1);

    return nextDay;
  }

  async function bookingKamar(slug: string) {
    if (!checkinDate || !checkoutDate)
      return toast.error(
        "Mohon isi tanggal Check-in & Check-out terlebih dahulu"
      );

    if (checkinDate > checkoutDate)
      return toast.error("Mohon isi tanggal Check-in yang valid");

    const masaInap = hitungMasaInap();

    // Implement Stripe
    const stripe = await getStripe();

    try {
      const { data: stripeSession } = await axios.post("/api/stripe", {
        checkinDate,
        checkoutDate,
        dataJumlahAnak,
        dataJumlahOrangDewasa,
        masaInap,
        slug,
        hargaLayananTambahan
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error("Pembayaran gagal");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Terdapat kesalahan.");
    }
  }

  return (
    <BookingContext.Provider
      value={{
        checkinDate,
        setCheckinDate,
        checkoutDate,
        setCheckoutDate,
        dataJumlahAnak,
        dataJumlahOrangDewasa,
        setDataJumlahAnak,
        setDataJumlahOrangDewasa,
        hitungMasaInap,
        hitungMinimumTanggalCheckout,
        bookingKamar,
        bookingStage,
        setBookingStage,
        hargaLayananTambahan,
        setHargaLayananTambahan,
        bookingCart,
        setBookingCart,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

function useBookingContext() {
  const context = useContext(BookingContext);

  if (!context) alert("Anda menggunakan context di luar jangkauan");

  return context;
}

export { BookingContextProvider, useBookingContext };
