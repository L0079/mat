import supabase from "./supabase";

export async function getCustomers() {
  let query = supabase.from("customers").select("*, paymentTerms(code)");

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get Customers' data");
  }

  return { data };
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
