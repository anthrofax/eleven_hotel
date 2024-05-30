"use client";

import { useBookingContext } from "@/context/booking-context";
import { useParams } from "next/navigation";

function Page() {
  const { slug } = useBookingContext();

  return <div>Layanan tambahan</div>;
}

export default Page;
