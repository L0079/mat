import supabase from "./supabase";

export async function getFiscalYear() {
  const query = supabase.from("fiscalYear").select("fiscalYear").single();
  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get fiscal year");
  }

  return { data };
}

//--------------- UPDATE FISCAL YEAR --------------------------------------------------------------------------------

export async function updateFiscalYear(fiscalYear) {
  const cy = new Date().getFullYear();

  if (fiscalYear.fiscalYear < 2018 || fiscalYear.fiscalYear > cy) {
    throw new Error("Cannot update the fiscal year info - invalid data");
  }

  const query = supabase.from("fiscalYear").update([fiscalYear]).eq("id", 1);
  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error("Cannot update the fiscal year info");
  }

  return { error, data };
}
