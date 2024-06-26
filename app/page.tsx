import Hero from "@/components/Hero";
import Head from "next/head";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24 bg-background overflow-hidden h-screen"
      style={{ overflowY: "hidden" }}
    >

      <Hero />
    </main>
  );
}
