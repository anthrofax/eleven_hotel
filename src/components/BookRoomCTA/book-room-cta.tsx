// @refresh reset

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import BookStageView from "./book-stage-view";
import { IoChevronBackCircle } from "react-icons/io5";
import PaymentStageView from "./payment-stage-view";
import { useBookingContext } from "@/context/booking-context";
import { Room } from "@/models/room";

function BookRoomCTA({
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
    setBookingStage,
    bookingStage,
    dataJumlahOrangDewasa,
  } = useBookingContext();

  useEffect(
    function () {
      if (
        (!checkinDate || !checkoutDate || !dataJumlahOrangDewasa) &&
        bookingStage === "payment"
      ) {
        console.log("test");
        setBookingStage("booking");
      }
    },
    [
      checkinDate,
      checkoutDate,
      dataJumlahOrangDewasa,
      setBookingStage,
      bookingStage,
    ]
  );

  return (
    <div className="px-7 py-6 bg-tertiary-light rounded-2xl w-full relative">
      <h3 className="text-2xl font-semibold text-center">{room!.nama}</h3>

      <div className="w-full border-b-2 border-b-secondary mt-2 mb-5" />

      {bookingStage === "payment" && (
        <>
          <IoChevronBackCircle
            size={50}
            color="#0C356A"
            className="absolute left-3 top-2 hover:scale-105 duration-300 transition-all cursor-pointer opacity-45 hover:opacity-100"
            onClick={() => setBookingStage("booking")}
          />

          <PaymentStageView hargaDiskon={hargaDiskon} room={room} slug={slug} />
        </>
      )}

      {bookingStage === "booking" && <BookStageView room={room} slug={slug} />}
    </div>
  );
}

export default BookRoomCTA;
