"use client";

import Header from "./Header";
import Globe from "./magicui/globe";

import { ShimmerText } from "./ShimmerText";
import { LoginDialog } from "./LoginDialog";
import MapView from "./Map";

export default function Hero() {
  return (
    <div
      className="w-screen flex flex-col justify-start items-center py-2 lg:py-8 gap-4 px-8 overflow-hidden h-screen"
      style={{ overflowY: "hidden" }}
    >
      <ShimmerText />
      <Header word="Daniel's Community Map" />
      <h3 className="block lg:hidden font-display text-center text-[#fff] text-4xl lg font-bold ">
        Daniel's Community Map
      </h3>
      <p className="text-gray text-16 text-center">
        See every person on the map to make meeting irl easier
      </p>
      <Globe className="mt-[40vh] lg:mt-[275px]  overflow-hidden" />
      <div
        className="flex flex-row gap-8 p-2 mb-8"
        style={{ zIndex: 10, overflowY: "hidden" }}
      >
        <LoginDialog />
        <MapView />
      </div>
    </div>
  );
}

// AIzaSyDJqZdzkBEAWVx2OZpej3ZaWU61KV090w4
