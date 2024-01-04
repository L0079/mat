import supabase from "./supabase";

export async function getBankBalances() {
  let query = supabase.from("bankBalances").select("*");

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get bank balances");
  }

  return { data };
}
