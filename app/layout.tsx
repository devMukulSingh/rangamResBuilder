import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/redux/providers/Providers";
import PersistProvider from "@/redux/providers/PersistProvider";
import QueryProviders from "@/lib/QueryProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Res-builder",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <PersistProvider>
            <QueryProviders>
              {children}
              </QueryProviders>
            <Toaster />
          </PersistProvider>
        </Providers>
      </body>
    </html>
  );
}
