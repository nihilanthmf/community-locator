import { NextResponse } from "next/server";

export async function GET(request) {
  console.log("FUNCSJAHDKGAHJSDGHJA");

  return NextResponse.json({
    api: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcWNhbGxxbHR5eG9jcHNqZ2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxODgwNzgsImV4cCI6MjAzMDc2NDA3OH0.gpxvkuteQ2Wn4kufTRA6QA41xAcUzbOdzjOWpzS9qaY",
  });
}
