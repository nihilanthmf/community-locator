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

    if (data.data === null || data.data.length === 0) {
      const { error } = await supabase
        .from("users")
        .insert({ email: body.email, name: body.name, bio: body.bio });
      console.log(error);
    } else {
      await supabase
        .from("users")
        .update({ name: body.name, bio: body.bio })
        .eq("email", body.email);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error });
  }
}
