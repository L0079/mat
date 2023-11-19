import supabase from "./supabase";

export async function getPaymentTerms() {
  let query = supabase.from("paymentTerms").select("*");

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Cannot get payment terms");
  }

  return { data };
}

//--------------- CREATE/UPDATE PAYMENT TERM --------------------------------------------------------------------------

export async function addUpdatePaymentTerm(paymentTerm, id) {
  let query;
  if (!id) {
    query = supabase.from("paymentTerms").insert([paymentTerm]);
  } else {
    query = supabase.from("paymentTerms").update([paymentTerm]).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(
      id
        ? "Cannot update the selected payment-term"
        : "Cannot create the new payment-term"
    );
  }
  return data;
}

//--------------- DELETE TAX CODE -------------------------------------------------------------------------------------

export async function deletePaymentTerm(id) {
  const { error } = await supabase.from("paymentTerms").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cannot delete selected payment-term");
  }
  return error;
}
