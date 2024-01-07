import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

//--------------- GET ORDERS ------------------------------------------------------------------------------------------
//export async function getOrders({ filter, sortBy, page }) {
export async function getPurchaseOrders({ page, filter }) {
  let query = supabase
    .from("purchaseOrders")
    .select(
      "*, orders(orderNumber, opportunity), suppliers(id, supplier), currencies(id, currency), paymentTerms(id, code))",
      {
        count: "exact",
      }
    )
    .order("id", { ascending: false });

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
    throw new Error("Cannot get purchase orders' data");
  }
  return { data, count };
}

//--------------- CREATE/UPDATE ORDER ---------------------------------------------------------------------------------

export async function addUpdatePurchaseOrder(purchaseOrder, poNumber) {
  let query;
  if (!poNumber) {
    query = supabase.from("purchaseOrders").insert([purchaseOrder]);
  } else {
    query = supabase.from("purchaseOrders").update([purchaseOrder]).eq("poNumber", poNumber);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(poNumber ? "Cannot update the selected purchase order" : "Cannot create the new purchase order");
  }
  return data;
}

//--------------- DELETE ORDER ----------------------------------------------------------------------------------------

export async function deletePurchaseOrder(poNumber) {
  const { error } = await supabase.from("purchaseOrders").delete().eq("poNumber", poNumber);

  if (error) {
    console.log(error);
    throw new Error("Cannot delete selected purchase order");
  }
  return error;
}
