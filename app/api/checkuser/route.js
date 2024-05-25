import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,

      process.env.API_KEY
    );

    const body = await request.json();

    const data = await supabase
      .from("users")
      .select()
      .eq("email", body.email);

    console.log(body.email);
    console.log(data);

    if (data.data === null || data.data.length === 0) {
      return NextResponse.json({
        exists: false,
      });
    } else {
      return NextResponse.json({
        exists: true,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      exists: false,
    });
  }
}
