import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');
    
    const { data, error: getError } = await supabase
      .from('stats')
      .select('value')
      .eq('key', 'visitor_count')
      .single();

    if (getError && getError.code !== 'PGRST116') throw getError;

    const currentCount = data?.value || 0;
    const newCount = currentCount + 1;

    const { error: updateError } = await supabase
      .from('stats')
      .update({ value: newCount })
      .eq('key', 'visitor_count');

    if (updateError) throw updateError;

    return res.status(200).json({ success: true, count: newCount });
  } catch (error: any) {
    console.error("Visitor count error:", error);
    return res.status(500).json({ success: false, error: error.message || "Failed to update counter" });
  }
}
