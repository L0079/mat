import supabase from "./supabase";

export async function getTaxCodes() {
  let query = supabase.from("taxCodes").select("*");

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get tax codes");
  }

  return { data };
}

//--------------- CREATE/UPDATE TAX CODE ------------------------------------------------------------------------------

export async function addUpdateTaxCode(taxCode, id) {
  let query;
  if (!id) {
    query = supabase.from("taxCodes").insert([taxCode]);
  } else {
    query = supabase.from("taxCodes").update([taxCode]).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(
      id
        ? "Cannot update the selected tax-code"
        : "Cannot create the new tax-code"
    );
  }
  return data;
}

//--------------- DELETE TAX CODE -------------------------------------------------------------------------------------

export async function deleteTaxCode(id) {
  const { error } = await supabase.from("taxCodes").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cannot delete selected tax-code");
  }
  return error;
}
