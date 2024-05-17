import Stripe from "stripe";

import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getRoom } from "@/libs/apis";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  jumlahOrangDewasa: number;
  jumlahAnak: number;
  masaInap: number;
  slugKamar: string;
};

export async function POST(req: Request, res: Response) {
  const {
    checkinDate: tanggalCheckin,
    jumlahOrangDewasa,
    checkoutDate: tanggalCheckout,
    jumlahAnak,
    slugKamar,
    masaInap,
  }: RequestData = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentication required", { status: 400 });
  }
  
  if (
    !tanggalCheckin ||
    !tanggalCheckout ||
    !jumlahOrangDewasa ||
    !slugKamar ||
    !masaInap
  ) {
    return new NextResponse("Please all fields are required", { status: 400 });
  }

  const origin = req.headers.get("origin");


  const userId = session.user.id;
  const formattedCheckoutDate = tanggalCheckout.split("T")[0];
  const formattedCheckinDate = tanggalCheckin.split("T")[0];

  try {
    const room = await getRoom(slugKamar);
    const hargaDiskon = room.harga - (room.harga / 100) * room.diskon;
    const hargaTotal = hargaDiskon * masaInap;

    // Create a stripe payment
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "idr",
            product_data: {
              name: room.nama,
              images: room.gambar.map((image) => image.url),
            },
            unit_amount: hargaTotal * 100,
          },
        },
      ],
      payment_method_types: ["card"],
      success_url: `${origin}/users/${userId}`,
      metadata: {
        jumlahOrangDewasa,
        tanggalCheckin: formattedCheckinDate,
        tanggalCheckout: formattedCheckoutDate,
        jumlahAnak,
        diskon: room.diskon,
        kamarHotel: room._id,
        masaInap,
        hargaTotal,
        userId,
      },
    });

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: "Pembayaran berhasil",
    });
  } catch (error: any) {
    console.log("Pembayaran gagal", error);
    return new NextResponse(error, { status: 500 });
  }
}
