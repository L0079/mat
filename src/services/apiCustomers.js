import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getCustomers({ page }) {
  let query = supabase
    .from("customers")
    .select("*, paymentTerms(code)", { count: "exact" })
    .order("customer", { ascending: true });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query.range(from, to);
  }
  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get Customers' data");
  }

  return { data, count };
}

//--------------- DELETE CUSTOMER -------------------------------------------------------------------------------------

export async function deleteCustomer(id) {
  const { error } = await supabase.from("customers").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cannot delete the selected customer");
  }
  return error;
}

//--------------- CREATE/UPDATE CUSTOMER ------------------------------------------------------------------------------

export async function addUpdateCustomer(customer, id) {
  let query;
  if (!id) {
    query = supabase.from("customers").insert([customer]);
  } else {
    query = supabase.from("customers").update([customer]).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(
      id
        ? "Cannot update the selected customer"
        : "Cannot create the new customer"
    );
  }
  return data;
}
