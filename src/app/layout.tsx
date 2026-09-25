import type { Metadata, Viewport } from "next";
import { Cinzel, DM_Mono, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ignite Coffee Co. · Fort St. James",
  description:
    "Your locally owned spot for quality coffee, specialty drinks, homemade baking, and community warmth.",
  applicationName: "Ignite Coffee Co.",
  appleWebApp: {
    capable: true,
    title: "Ignite",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#B4441C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${montserrat.variable} ${dmMono.variable} h-full`}
    >
      <body
        className="min-h-full font-sans antialiased paper-grain text-char bg-crema"
        suppressHydrationWarning
      >
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            className: "font-sans",
            style: {
              background: "#1A1715",
              color: "#FFFCF7",
              border: "1px solid #C99A62",
            },
          }}
        />
      </body>
    </html>
  );
}
