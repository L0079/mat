import SearchFilter from "../../ui/SearchFilter.jsx";

function OrderFilter() {
  return <SearchFilter filterField="orderNumber" mod="eq" label="Order Number" />;
}

export default OrderFilter;
