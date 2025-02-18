import type { Metadata } from "next";
import { DM_Serif_Text } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { UserProvider } from './contexts/UserContext';

const dmserif = DM_Serif_Text({ 
  weight: '400',
  subsets: ["latin"] });

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
      <body className={dmserif.className}>
        <UserProvider>
          {/* Navigation Bar */}
          <NavBar />
          {/* Main Content */}
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}