export type UpdateReviewDto = {
  reviewId: string;
  reviewText: string;
  ratingPengguna: number;
};

export type CreateReviewDto = {
  idKamar: string;
  reviewText: string;
  ratingPengguna: number;
  userId: string;
};

export type Ulasan = {
  teks: string;
  user:any;
  ratingPengguna: number;
  _createdAt: Date;
  _id: string;
};
