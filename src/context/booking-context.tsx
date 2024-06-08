"use client";

import { getStripe } from "@/libs/stripe";
import { CartItemType } from "@/models/cartItem";
import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

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
  bookingCart: CartItemType[];
  setBookingCart: Dispatch<SetStateAction<CartItemType[]>>;
  totalBiayaLayananTambahan: number;
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
  bookingCart: [],
  setBookingCart: function () {},
  totalBiayaLayananTambahan: 0,
});

function BookingContextProvider({ children }: { children: React.ReactNode }) {
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [dataJumlahOrangDewasa, setDataJumlahOrangDewasa] = useState<number>(1);
  const [dataJumlahAnak, setDataJumlahAnak] = useState<number>(0);
  const [bookingStage, setBookingStage] = useState<"booking" | "payment">(
    "booking"
  );
  const [bookingCart, setBookingCart] = useState<CartItemType[]>([]);
  const totalBiayaLayananTambahan = bookingCart.reduce((acc, curValue) => {
    return acc + curValue.layananTambahan.harga * curValue.qty;
  }, 0);

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
        slugKamar: slug,
        bookingCart,
        totalBiayaLayananTambahan,
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
        bookingCart,
        setBookingCart,
        totalBiayaLayananTambahan,
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
