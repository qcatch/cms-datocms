import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MAIN_MENU_QUERY } from "@/lib/datacms.query";
import { draftMode } from "next/headers";
import { performRequest } from "@/lib/datacms";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DatoCMS Demo",
};

function getPageRequest({ includeDrafts }: { includeDrafts: boolean }) {
  return { query: MAIN_MENU_QUERY, includeDrafts };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = draftMode();

  const pageRequest = getPageRequest({ includeDrafts: true });
  const { siteConfig } = await performRequest(pageRequest);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header data={siteConfig?.navigation} />
        {children}
        <Footer
          links={siteConfig?.footer}
          tagline={siteConfig?.footerTagline}
        />
      </body>
    </html>
  );
}
