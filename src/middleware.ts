// Middleware bawaan next-auth untuk memblokir request jika user blum login
export { default } from "next-auth/middleware";

// Path mana middleware akan diterapkan
// export const config = {
//   matcher: ["/users/:path*", '/api/:path*'], // Jika user mengunjungi path tersebut, dengan menggunakan "default" middleware, request user tidak akan diproses lebih lanjut
// };
export const config = {
  matcher: ["/users/:path*"], // Jika user mengunjungi path tersebut, dengan menggunakan "default" middleware, request user tidak akan diproses lebih lanjut
};
