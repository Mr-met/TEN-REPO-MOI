import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biên Niên Sử Bình Minh — Chủ nghĩa xã hội khoa học",
  description: "Game phiêu lưu tương tác qua bảy chương Chủ nghĩa xã hội khoa học.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
