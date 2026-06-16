import { Inter, Playpen_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";
import Providers from "@/components/providers/Providers";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playpen = Playpen_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata = {
  title:
    "Australia Business Directory | Free Business Listings & Local Services",
  description:
    "Citiinfo is an Australia business directory to find local businesses, services, restaurants, salons and plumbers. Add your business free and reach customers across Australia.",
  keywords: [
    "business directory australia",
    "local business directory australia",
    "australia business directory",
    "free business listing sites australia",
    "business listing website",
  ],
  alternates: {
    canonical: "http://127.0.0.1:8000/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playpen.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TSSX88C6');
          `}
        </Script>
      </head>

      <body className="homepage1-body" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TSSX88C6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <BootstrapClient />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
