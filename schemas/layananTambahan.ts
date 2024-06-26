import { defineField } from "sanity";

const layananTambahan = {
  name: "layananTambahan",
  title: "Layanan Tambahan",
  type: "document",
  fields: [
    defineField({
      name: "nama",
      title: "Nama",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "harga",
      title: "Harga",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "deskripsi",
      title: "Deskripsi",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "oneQuantityService",
      title: "Apakah layanan dapat memiliki lebih dari 1 kuantitas?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "gambar",
      title: "Gambar",
      type: "image",
      validation: (rule) => rule.required(),
    }),
  ],
};

export default layananTambahan;
