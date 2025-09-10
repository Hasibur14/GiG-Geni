import { Footer } from "@/components/footer/Footer";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileDock } from "@/components/layout/MobileDock";
import { OnboardingProvider } from "@/components/onboarding/OnboardingProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GiG Geni - Competition Platform",
  description: "Navigate your career through competitions and leaderboards",
  keywords: ["competitions", "leaderboards", "career", "gig economy"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap OnboardingProvider with Suspense */}
        <Suspense fallback={null}>
          <OnboardingProvider>
            <div className="min-h-screen bg-background overflow-x-hidden">
              {/* Desktop Navigation */}
              <DesktopNav />

              {/* Main Content */}
              <main className="flex-1">{children}</main>

              {/* Footer */}
              <Footer />

              {/* Mobile Navigation Dock */}
              <MobileDock />
            </div>
          </OnboardingProvider>
        </Suspense>
      </body>
    </html>
  );
}
