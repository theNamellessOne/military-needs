import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Header } from "~/components/header";
import { Toaster } from "~/components/ui/toaster";
import { AuthProvider } from "./auth/_providers/auth-provider";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body>
        <CookiesProvider>
          <AuthProvider>
            <Header />
            <div className={"container mx-auto px-4"}>{children}</div>
            <Toaster />
          </AuthProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
