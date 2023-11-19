export const PAGE_SIZE = 10;
export const currencyFormat = "it";
export const invoiceDefaultValues = {
  currency: 1,
  taxCode: 1,
  paymentTermsId: 1,
  poNumber: "",
  note: "",
};
export const orderDefaultValues = {
  currencyId: 1,
  paymentTermsId: 1,
};
export const poDefaultValues = {
  currencyId: 1,
  paymentTermsId: 1,
};
export const SPLIT_PAYMENT = {
  id: 4,
  code: "SPLIT",
  type: "percentage",
  value: 0,
};
export const CREATED_STATUS_ID = 1;
export const REGISTERED_STATUS_ID = 2;
export const SENT_STATUS_ID = 3;
export const PAID_STATUS_ID = 4;
export const TAXCODE_TYPES = [{ type: "percentage" }, { type: "fixed" }];
export const COSTCENTER_TYPES = [{ type: "Cost" }, { type: "Profit" }];
export const PAYABLE_INVOICE_RECEIVED_STATUS_ID = 1;
export const PAYABLE_REGISTERED_STATUS_ID = 2;
export const PAYABLE_PAID_STATUS_ID = 3;
