import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "360crd — Construction & Renovation Safety Platform",
  description:
    "360crd gives Superadmins, Managers, Staff and Field Crews one connected platform for incidents, waste, training, inductions, PPE, assets and ISO 45001 / ISO 14001 / OSHA-ready audits.",
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("crd360-theme");
    var theme = stored === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="snap-scroll min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
