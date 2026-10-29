import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import home from "@/content/home.json";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800", "900"], variable: "--font-nunito" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  title: "AlloJ · Le guide de la vie juive",
  description: "Restaurants cacher, séjours, réceptions, immobilier en Israël : tout est sur AlloJ, en France et partout dans le monde.",
  robots: { index: false, follow: false },
  icons: { icon: "/images/picto-alloj.png" },
  openGraph: { images: ["/images/alloj-events-equipe.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={nunito.variable}>
      <body>
        <Header shabbat={home.shabbat} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
