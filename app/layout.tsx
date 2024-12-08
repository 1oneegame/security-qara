import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import { root } from "postcss";
import { Navbar } from "@/components/NavBar";
import Footer from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Security Qara",
  description: "Security Qara - проверка уязвимостей в кибербезопасности",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContext>
          <ToasterContext/>
          <Navbar/>
          {children}     
          <Footer/>
        </AuthContext>
      </body>
    </html>
  );
}