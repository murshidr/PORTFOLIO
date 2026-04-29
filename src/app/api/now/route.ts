import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("now_content")
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { building, studying, looking_for, thinking_about } = body;

    // Get the first record ID if it exists
    const { data: existing } = await supabase
      .from("now_content")
      .select("id")
      .single();

    let result;
    if (existing) {
      result = await supabase
        .from("now_content")
        .update({
          building,
          studying,
          looking_for,
          thinking_about,
          last_updated: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from("now_content")
        .insert([{
          building,
          studying,
          looking_for,
          thinking_about,
          last_updated: new Date().toISOString(),
        }])
        .select()
        .single();
    }

    if (result.error) throw result.error;

    return NextResponse.json(result.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
