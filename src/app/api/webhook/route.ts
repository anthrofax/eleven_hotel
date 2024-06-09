import { NextResponse } from "next/server";
import Stripe from "stripe";
import LZString from "lz-string";
import { v4 as uuidv4 } from 'uuid';
import { createBooking, updateHotelRoom } from "@/libs/apis";
import { CartItemType } from "@/models/cartItem";

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
            dataJumlahOrangDewasa,
            tanggalCheckin,
            tanggalCheckout,
            dataJumlahAnak,
            diskon,
            kamarHotel,
            masaInap,
            hargaTotal,
            userId,
            compressedBookingCart,
          },
        } = session;

        console.log(session.metadata);
        console.log(compressedBookingCart);
        console.log(LZString.decompressFromUTF16(compressedBookingCart));
        console.log(JSON.parse(LZString.decompressFromUTF16(compressedBookingCart)));

        //   Buat booking
        try {
          const result = await createBooking({
            jumlahOrangDewasa: Number(dataJumlahOrangDewasa),
            tanggalCheckin,
            tanggalCheckout,
            jumlahAnak: Number(dataJumlahAnak),
            kamarHotel,
            masaInap: Number(masaInap),
            diskon: Number(diskon),
            hargaTotal: Number(hargaTotal),
            user: userId, //Menambahkan Object Layanan Tambahan ke Web Hook
            keranjangLayananTambahan: JSON.parse(
              LZString.decompressFromUTF16(compressedBookingCart)
            ).map((item: CartItemType) => {
              return {
                qty: item.qty,
                layananTambahan: {
                  _type: "reference",
                  _ref: item.layananTambahan._id,
                },
                _key: uuidv4()
              };
            }),
          });

          console.log("Berhasil mutate booking");
          // Ubah status kamar menjadi telah dibooking
          const updateResult = await updateHotelRoom(kamarHotel);

          console.log(result);

          console.log(updateResult);

          console.log("Berhasil mutate update");

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
