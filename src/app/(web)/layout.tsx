import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeContextProvider } from "../../context/themeContext";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import AuthProvider from "@/components/AuthProvider/auth-provider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Eleven Hotel",
  description: "Discover the best hotel rooms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={poppins.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <Toaster />
            <main className="font-normal">
              <Header />
              {children}
              <Footer />
            </main>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
