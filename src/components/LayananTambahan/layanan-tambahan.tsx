import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import LayananTambahanType from "@/models/layananTambahan";
import { Rupiah } from "@/helper/formatCurrency";

function LayananTambahan({
  nama,
  gambar,
  harga,
  deskripsi,
}: LayananTambahanType) {
  return (
    <div className="grid gap-3 grid-cols-4">
      <div className="bg-tertiary-light col-span-3 grid grid-cols-4 p-3 rounded-xl h-60">
        <div className="col-span-1 relative aspect-square self-center rounded-xl overflow-hidden">
          <Image src={gambar} fill alt="food image" />
        </div>

        <div className="col-span-3 flex flex-col py-3 px-5">
          <div className="flex justify-between w-full text-2xl font-bold">
            <h3>{nama}</h3>
            <h3>{Rupiah.format(harga)}</h3>
          </div>

          <div className="mt-5">{deskripsi}</div>
        </div>
      </div>

      <div className="bg-tertiary-light col-span-1 flex flex-col gap-1 p-5 rounded-xl justify-between">
        <div className="flex flex-col gap-1 items-end">
          <div className="flex gap-3 justify-end items-center">
            <label htmlFor="">Jumlah</label>

            <div className="flex gap-3 bg-tertiary-superLight py-1 px-2 rounded-lg items-center">
              <button className="aspect-auto w-[25%]">
                <TiMinus />
              </button>
              <span className="bg-primary text-white rounded-full py-1 px-3 flex items-center justify-center">
                0
              </span>
              <button className="aspect-auto w-[25%]">
                <FaPlus />
              </button>
            </div>
          </div>

          <select
            name=""
            id=""
            className="mt-3 w-[80%] bg-tertiary-superLight rounded-xl borded-none py-1 px-2"
          >
            <option value="Pilih kamar">Pilih kamar</option>
            <option value="Pilih kamar">Kamar 1</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 mt-3">
          <h3 className="text-lg font-bold">Total: Rp.150.000,00</h3>
          <button className="bg-primary py-3 w-full text-white rounded-full">
            Booking now!
          </button>
        </div>
      </div>
    </div>
  );
}

export default LayananTambahan;
