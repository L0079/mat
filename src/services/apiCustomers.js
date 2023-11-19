import supabase from "./supabase";

export async function getCustomers() {
  let query = supabase.from("customers").select("*");

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get Customers' data");
  }

  return { data };
}
