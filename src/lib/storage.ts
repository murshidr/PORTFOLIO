import { supabase } from "./supabase";

export async function uploadBlogImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `blog-images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('blog')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('blog')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
