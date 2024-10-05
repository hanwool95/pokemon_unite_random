import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "너즐록 섞기",
  description: "3분 요약 카이사르의 포유나 너즐록 섞어",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
