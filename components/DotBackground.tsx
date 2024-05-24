"use client";

import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import Header from "./Header";

export default function DotBackground() {
  return (
    <div className="relative flex w-screen w-[100vw] h-[50vh] items-center justify-center overflow-hidden rounded-lg border bg-background p-4 ">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px,white,transparent)]"
        )}
      ></DotPattern>
      <div className="absolute">
        <Header word="Welcome" />
        <p className="text-gray text-16">
          See every person on the map to make meeting irl easier
        </p>
      </div>
    </div>
  );
}
