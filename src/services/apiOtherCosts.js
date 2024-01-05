import supabase from "./supabase";
//import toast from "react-hot-toast";
import { PAGE_SIZE } from "../utils/constants";

export async function getOtherCosts({ page, filter }) {
  let query = supabase
    .from("otherCosts")
    .select(
      "*, otherCostsStatus(status),otherCostsDocTypes(code, description), suppliers(supplier), currencies(currency)",
      { count: "exact" }
    );

  if (filter) query = query[filter.mod ? filter.mod : "eq"](filter.field, filter.value);
  // if (sortBy)
  //   query = query.order(sortBy.field, {
  //     ascending: sortBy.direction === "asc",
  //   });
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get other costs documents");
  }

  return { data, count };
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
    throw new Error(id ? "Cannot update the selected cost document" : "Cannot create the new cost document");
  }
  return data;
}
