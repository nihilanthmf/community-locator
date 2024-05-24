"use client";

import Header from "./Header";
import Globe from "./magicui/globe";

import { ShimmerText } from "./ShimmerText";
import { LoginDialog } from "./LoginDialog";
import MapView from "./Map";

export default function Hero() {
  return (
    <div
      className="w-full flex flex-col justify-start items-center py-8 gap-4 px-2 overflow-hidden h-screen"
      style={{ overflowY: "hidden" }}
    >
      <ShimmerText />
      <Header word="Daniel's Community Map" />
      <p className="text-gray text-16">
        See every person on the map to make meeting irl easier
      </p>
      <Globe className="mt-64 overflow-hidden" />
      <div
        className="flex flex-row gap-8 p-2"
        style={{ zIndex: 10, overflowY: "hidden" }}
      >
        <LoginDialog />
        <MapView />
      </div>
    </div>
  );
}
