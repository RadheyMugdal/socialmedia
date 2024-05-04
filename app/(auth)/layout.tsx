import { NextUIProvider } from "@nextui-org/react"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { Providers } from "../providers";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>

      <body>{children}</body>
      </Providers>
    </html>
  )
}
