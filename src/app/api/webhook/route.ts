import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createBooking, updateHotelRoom } from "@/libs/apis";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  // load our event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;

      if (session.metadata) {
        const {
          // @ts-ignore
          metadata: {
            jumlahOrangDewasa,
            tanggalCheckin,
            tanggalCheckout,
            jumlahAnak,
            diskon,
            kamarHotel,
            masaInap,
            hargaTotal,
            userId,
          },
        } = session;

        console.log(session);

        //   Buat booking
        try {
          const result = await createBooking({
            jumlahOrangDewasa: Number(jumlahOrangDewasa),
            tanggalCheckin,
            tanggalCheckout,
            jumlahAnak: Number(jumlahAnak),
            kamarHotel,
            masaInap: Number(masaInap),
            diskon: Number(diskon),
            hargaTotal: Number(hargaTotal),
            user: userId,
          });

          // Ubah status kamar menjadi telah dibooking
          const updateResult = await updateHotelRoom(kamarHotel);

          console.log(result);

          console.log(updateResult);

          return NextResponse.json("Booking successful", {
            status: 200,
            statusText: "Booking Successful",
          });
        } catch (err: any) {
          console.log(err.message);

          return NextResponse.json("Booking gagal", {
            status: 404,
            statusText: "Booking gagal",
          });
        }
      }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json("Event Received", {
    status: 200,
    statusText: "Event Received",
  });
}
