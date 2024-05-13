import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Leftbar from "@/components/Leftbar";
import Rightbar from "@/components/Rightbar";
import { Providers } from "./providers";
import { ViewTransitions } from "next-view-transitions";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>

    <html lang="en">
      <AuthProvider>
      <body className={inter.className+"  "} >
        <Providers >
            <Toaster position="bottom-right" />
            {children}
        </Providers>
      </body>
      </AuthProvider>
    </html>
    </ViewTransitions>
  );
}
