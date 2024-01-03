import toast from "react-hot-toast";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

//--------------- GET PAYABLE INVOICES --------------------------------------------------------------------------------
//export async function getInvoices({ filter, sortBy, page }) {
export async function getPayableInvoices({ page, filter }) {
  let query = supabase
    .from("payableInvoices")
    .select(
      "*, suppliers(id, supplier), currencies(id, currency), payableInvoiceStatus(id, status), paymentTerms(id, code)",
      {
        count: "exact",
      }
    );

  if (filter)
    query = query[filter.mod ? filter.mod : "eq"](filter.field, filter.value);
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
    throw new Error("Cannot get invoices' data");
  }
  return { data, count };
}

//--------------- CREATE NEW PAYABLE INVOICE OR UPDATE ONE ------------------------------------------------------------

export async function addUpdatePayableInvoice(payableInvoice, id) {
  //--- Get order and verify that the invpoice amount is less or equal ti the invoice amount
  const queryPurchaseOrders = supabase
    .from("purchaseOrders")
    .select("toBePaid")
    .eq("poNumber", payableInvoice.poNumber);

  const { data: poData, error: poError } = await queryPurchaseOrders
    .select()
    .single();

  if (poError) {
    console.log(poError);
    throw new Error("Cannot find the related purchase order");
  }

  let originalAmount = 0;
  if (id) {
    const queryPayableInvoice = supabase
      .from("payableInvoices")
      .select("amount")
      .eq("id", id);

    const { data: origInvoice, error: errorOrigInvoice } =
      await queryPayableInvoice.select().single();

    if (errorOrigInvoice) {
      console.log(errorOrigInvoice);
      throw new Error("Cannot find the to be updated payable invoice");
    }
    originalAmount = origInvoice.amount;
  }

  const toBePaid = poData.toBePaid - payableInvoice.amount + originalAmount;

  if (toBePaid < 0) {
    toast.error(
      `The payable invoice amount exceeds the purchase order: Invoice amount: ${payableInvoice.amount} - To be received: ${poData.toBeBilled}`
    );
    console.log(
      `Invoice amount: ${payableInvoice.amount} - To be received: ${poData.toBeBilled}`
    );
    throw new Error(
      `Invoice amount: ${payableInvoice.amount} - To be received: ${poData.toBeBilled}`
    );
  }

  //--- Insert invoice
  let query;
  if (!id) {
    query = supabase.from("payableInvoices").insert([payableInvoice]);
  } else {
    query = supabase
      .from("payableInvoices")
      .update([payableInvoice])
      .eq("id", id);
  }
  //  const { data, error } = await query.select().single(); //torna direttamente l'oggetto e non un array di oggetti con un solo elemento
  const { error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(
      id
        ? "Cannot update the selected payable invoice"
        : "Cannot create the new payable invoice"
    );
  }

  //--- Update toBeBilled in the order record
  const updatePurchaseOrder = supabase
    .from("purchaseOrders")
    .update([{ toBePaid: toBePaid }])
    .eq("poNumber", payableInvoice.poNumber);

  const { data: updatePoData, error: updatePoError } =
    await updatePurchaseOrder.select();

  if (updatePoError) {
    console.log(updatePoError);
    throw new Error(
      "Cannot update the to-be-paid info in purchase order record"
    );
  }

  return updatePoData;
}

//--------------- DELETE PAYABLE INVOICE ------------------------------------------------------------------------------

export async function deletePayableInvoice(id) {
  const { error } = await supabase
    .from("payableInvoices")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cannot delete selected payable invoice");
  }
  return error;
}

//--------------- UPDATE STATUS ---------------------------------------------------------------------------------------

export async function updatePayableInvoiceStatus(payableInvoice, id) {
  const query = supabase
    .from("payableInvoices")
    .update([payableInvoice])
    .eq("id", id);
  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error("Cannot update the selected payable invoice");
  }

  return data;
}
