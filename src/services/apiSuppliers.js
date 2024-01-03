import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getSuppliers({ page }) {
  let query = supabase
    .from("suppliers")
    .select("*, paymentTerms(code)", { count: "exact" })
    .order("supplier", { ascending: true });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get Suppliers' data");
  }

  return { data, count };
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
