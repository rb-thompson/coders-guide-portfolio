// Root layout for the entire app
// Sets up global styles, fonts, user context, and navigation

import type { Metadata } from "next";
import { DM_Serif_Text } from "next/font/google";
import "./globals.css"; // Global styles applied site-wide
import NavBar from "@/components/NavBar"; // Top navigation component
import { UserProvider } from "@/contexts/UserContext"; // Provides user state across app
import PageTransition from "@/components/PageTransition"; // Smooth page transitions

// Load DM Serif Text font with specific weight and subset
const dmserif = DM_Serif_Text({ 
  weight: "400", // Regular weight for a classic serif look
  subsets: ["latin"], // Only Latin characters for performance
});

// Metadata for SEO and browser display
export const metadata: Metadata = {
  title: "The Coder's Guide to the Portfolio Project",
  description: "A cosmic journey through the Data Galaxy to build your portfolio skills.",
};

// Root layout component wrapping all pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Content from individual pages
}>) {
  return (
    <html lang="en">
      <body className={dmserif.className}> {/* Apply serif font globally */}
        {/* Wrap app in UserProvider for user state access */}
        <UserProvider>
          {/* Consistent navigation bar across all pages */}
          <NavBar />
          {/* Animate page transitions for a polished UX */}
          <PageTransition>
            {/* Main content area where page components render */}
            <main>{children}</main>
          </PageTransition>
        </UserProvider>
      </body>
    </html>
  );
}