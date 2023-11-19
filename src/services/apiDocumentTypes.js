import supabase from "./supabase";

export async function getDocumentTypes() {
  const query = supabase.from("otherCostsDocTypes").select("*");
  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get document types");
  }

  return data;
}
