import supabase from "./supabase";

export async function getOtherCosts() {
  const { data, error } = await supabase
    .from("otherCosts")
    .select(
      "*, otherCostsStatus(status),otherCostsDocTypes(code, description), suppliers(supplier), currencies(currency)"
    );

  if (error) {
    console.log(error);
    throw new Error("Cannot get other costs documents");
  }

  return data;
}

//--------------- DELETE OTHER COST  ----------------------------------------------------------------------------------

export async function deleteOtherCost(id) {
  const { error } = await supabase.from("otherCosts").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cannot delete the selected document");
  }
  return error;
}

//--------------- CREATE/UPDATE OTHER COST ----------------------------------------------------------------------------

export async function addUpdateOtherCost(otherCost, id) {
  let query;
  if (!id) {
    query = supabase.from("otherCosts").insert([otherCost]);
  } else {
    query = supabase.from("otherCosts").update([otherCost]).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(
      id
        ? "Cannot update the selected cost document"
        : "Cannot create the new cost document"
    );
  }
  return data;
}
