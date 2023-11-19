import supabase from "./supabase";

export async function getSuppliers() {
  let query = supabase.from("suppliers").select("*");

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get Suppliers' data");
  }

  return { data };
}
