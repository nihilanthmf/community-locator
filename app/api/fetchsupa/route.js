import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({
    api: process.env.API_KEY,
    url: process.env.SUPABASE_URL
  });
}
