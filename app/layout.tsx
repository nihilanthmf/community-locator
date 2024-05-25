import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel's Community Map",
  description: "Allows members of the community to find each other on a map",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{
        overflow: "hidden",
        height: "100%",
        width: "100%",
        margin: 0,
        overscrollBehavior: "none",
        position: "relative",
      }}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${inter.className}  overflow-hidden bg-background`}
        style={{
          overflow: "hidden",
          overscrollBehavior: "none",
          position: "relative",
        }}
      >
        <div
          className="overflow-hidden"
          style={{
            overflow: "hidden w-screen h-screen",
            overscrollBehavior: "none",
            position: "relative",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
