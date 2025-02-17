import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Coder's Guide to the Portfolio Project",
  description: "A cosmic journey through the Data Galaxy to build your portfolio project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation Bar */}
        <NavBar />
        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}