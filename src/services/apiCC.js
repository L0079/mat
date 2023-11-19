import supabase from "./supabase";

export async function getCC(type) {
  let query = supabase.from("costCenters").select("*");

  if (!type) query = query.order("type", { ascending: true });
  else query = query.eq("type", type).order("costCenter", { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get currencies");
  }

  return { data };
}

//--------------- DELETE COST CENTER ----------------------------------------------------------------------------------

export async function deleteCC(id) {
  const { error } = await supabase.from("costCenters").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cannot delete the selected cost center");
  }
  return error;
}

//--------------- CREATE/UPDATE COST CENTER ---------------------------------------------------------------------------

export async function addUpdateCC(cc, id) {
  let query;
  if (!id) {
    query = supabase.from("costCenters").insert([cc]);
  } else {
    query = supabase.from("costCenters").update([cc]).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(
      id
        ? "Cannot update the selected cost center"
        : "Cannot create the new cost center"
    );
  }
  return data;
}
