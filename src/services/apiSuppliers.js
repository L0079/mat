import supabase from "./supabase";

export async function getSuppliers() {
  let query = supabase.from("suppliers").select("*, paymentTerms(code)");

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get Suppliers' data");
  }

  return { data };
}

//--------------- DELETE SUPPLIER -------------------------------------------------------------------------------------

export async function deleteSupplier(id) {
  const { error } = await supabase.from("suppliers").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cannot delete the selected supplier");
  }
  return error;
}

//--------------- CREATE/UPDATE SUPPLIER ------------------------------------------------------------------------------

export async function addUpdateSupplier(supplier, id) {
  console.log("SDFSDF 1", supplier);
  console.log("SDFSDF 2", id);
  let query;
  if (!id) {
    query = supabase.from("suppliers").insert([supplier]);
  } else {
    query = supabase.from("suppliers").update([supplier]).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(
      id
        ? "Cannot update the selected supplier"
        : "Cannot create the new supplier"
    );
  }
  return data;
}
