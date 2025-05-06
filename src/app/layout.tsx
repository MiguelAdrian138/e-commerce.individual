"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navBar/Navbar";
import Footer from "./components/footer/Footer";
import UserProvider from "./components/context/userContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen overflow-auto bg-stone-800`}>
        <UserProvider>
          <header className="fixed top-0 left-0 w-full z-20">
            <Navbar />
          </header>
          <main className="flex-grow mt-20">{children}</main>
        </UserProvider>
        <footer className="fixed bottom-0 left-0 w-full z-20">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
