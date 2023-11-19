import toast from "react-hot-toast";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

//--------------- GET INVOICES ----------------------------------------------------------------------------------------
//export async function getInvoices({ filter, sortBy, page }) {
export async function getInvoices({ page }) {
  let query = supabase
    .from("invoicesHeader")
    .select(
      "*, customers(id, customer, PIVA, splitPayment), currencies(id, currency), invoiceStatus(id, status), paymentTerms(id, code), taxCodes(id, code)",
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
    throw new Error("Cannot get invoices' data");
  }
  return { data, count };
}

//--------------- CREATE NEW INVOICE OR UPDATE ONE --------------------------------------------------------------------

export async function addUpdateInvoice(invoice, id) {
  //--- Get order and verify that the invpoice amount is less or equal ti the invoice amount
  const queryOrders = supabase
    .from("orders")
    .select("toBeBilled")
    .eq("orderNumber", invoice.orderNumber);

  const { data: orderData, error: orderError } = await queryOrders
    .select()
    .single();

  if (orderError) {
    console.log(orderError);
    throw new Error("Cannot find the related order");
  }

  let originalAmount = 0;
  if (id) {
    const queryInvoice = supabase
      .from("invoicesHeader")
      .select("amount")
      .eq("id", id);

    const { data: origInvoice, error: errorOrigInvoice } = await queryInvoice
      .select()
      .single();

    if (errorOrigInvoice) {
      console.log(errorOrigInvoice);
      throw new Error("Cannot find the to be updated invoice");
    }
    originalAmount = origInvoice.amount;
  }

  const toBeBilled = orderData.toBeBilled - invoice.amount + originalAmount;

  if (toBeBilled < 0) {
    toast.error(
      `The invoice amount exceeds the order: Invoice amount: ${invoice.amount} - To be billed: ${orderData.toBeBilled}`
    );
    console.log(
      `Invoice amount: ${invoice.amount} - To be billed: ${orderData.toBeBilled}`
    );
    throw new Error(
      `Invoice amount: ${invoice.amount} - To be billed: ${orderData.toBeBilled}`
    );
  }

  //--- Insert invoice
  let query;
  if (!id) {
    query = supabase.from("invoicesHeader").insert([invoice]);
  } else {
    query = supabase.from("invoicesHeader").update([invoice]).eq("id", id);
  }
  //  const { data, error } = await query.select().single(); //torna direttamente l'oggetto e non un array di oggetti con un solo elemento
  const { error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(
      id
        ? "Cannot update the selected invoice"
        : "Cannot create the new invoice"
    );
  }

  //--- Update toBeBilled in the order record
  const updateOrder = supabase
    .from("orders")
    .update([{ toBeBilled: toBeBilled }])
    .eq("orderNumber", invoice.orderNumber);

  const { data: updateOrdData, error: updateOrdError } =
    await updateOrder.select();

  if (updateOrdError) {
    console.log(updateOrdError);
    throw new Error("Cannot update the to-be-billed info in order record");
  }

  return updateOrdData;
}

//--------------- DELETE INVOICE --------------------------------------------------------------------------------------

export async function deleteInvoice(id) {
  const { error } = await supabase.from("invoicesHeader").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cannot delete selected invoice");
  }
  return error;
}

//--------------- UPDATE STATUS -----------------------------------------------------------------------

export async function updateInvoiceStatus(invoice, id) {
  const query = supabase.from("invoicesHeader").update([invoice]).eq("id", id);
  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error("Cannot update the selected invoice");
  }

  return data;
}
