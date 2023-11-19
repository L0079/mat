import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

//--------------- GET ORDERS ------------------------------------------------------------------------------------------
//export async function getOrders({ filter, sortBy, page }) {
export async function getOrders({ page }) {
  let query = supabase
    .from("orders")
    .select(
      "*, customers(id, customer, PIVA, splitPayment), currencies(id, currency), paymentTerms(id, code))",
      {
        count: "exact",
      }
    );

  // if (filter)
  //   query = query[filter.mod ? filter.mod : "eq"](filter.field, filter.value);
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
    throw new Error("Cannot get orders' data");
  }
  return { data, count };
}

//--------------- CREATE/UPDATE ORDER ---------------------------------------------------------------------------------

export async function addUpdateOrder(order, orderNumber) {
  let query;
  if (!orderNumber) {
    query = supabase.from("orders").insert([order]);
  } else {
    query = supabase
      .from("orders")
      .update([order])
      .eq("orderNumber", orderNumber);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(
      orderNumber
        ? "Cannot update the selected order"
        : "Cannot create the new order"
    );
  }
  return data;
}

//--------------- DELETE ORDER ----------------------------------------------------------------------------------------

export async function deleteOrder(orderNumber) {
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("orderNumber", orderNumber);

  if (error) {
    console.log(error);
    throw new Error("Cannot delete selected order");
  }
  return error;
}
