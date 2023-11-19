import supabase from "./supabase";

export async function getCurrencies() {
  let query = supabase.from("currencies").select("*");

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get currencies");
  }

  return { data };
}

//--------------- DELETE CURRENCY -------------------------------------------------------------------------------------

export async function deleteCurrency(id) {
  const { error } = await supabase.from("currencies").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cannot delete selected currency");
  }
  return error;
}

//--------------- CREATE/UPDATE CURRENCY ---------------------------------------------------------------------------------

export async function addUpdateCurrency(currency, id) {
  let query;
  if (!id) {
    query = supabase.from("currencies").insert([currency]);
  } else {
    query = supabase.from("currencies").update([currency]).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(
      id
        ? "Cannot update the selected currency"
        : "Cannot create the new currency"
    );
  }
  return data;
}
