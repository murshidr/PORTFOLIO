import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    // 1. Get current count
    const { data, error: getError } = await supabase
      .from('stats')
      .select('value')
      .eq('key', 'visitor_count')
      .single();

    if (getError && getError.code !== 'PGRST116') throw getError;

    const currentCount = data?.value || 0;
    const newCount = currentCount + 1;

    // 2. Increment and Update
    const { error: updateError } = await supabase
      .from('stats')
      .update({ value: newCount })
      .eq('key', 'visitor_count');

    if (updateError) throw updateError;

    return res.status(200).json({ success: true, count: newCount });
  } catch (error: any) {
    console.error("Visitor count error:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || "Internal server error",
      details: error.code || "UNKNOWN"
    });
  }
}
