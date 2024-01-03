import { GloablStyles } from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./features/authentication/ProtectedRoute";
import DarkModeProvider from "./context/DarkModeContext";
import AppLayout from "./ui/AppLayout";
import Quarters from "./pages/Quarters";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Invoices from "./pages/Invoices";
import Orders from "./pages/Orders";
import PurchaseOrders from "./pages/PurchaseOrders";
import CreateUpdatePO from "./features/purchaseOrder/CreateUpdatePO";
import OtherCosts from "./pages/OtherCosts";
import CreateUpdateOrder from "./features/orders/CreateUpdateOrder";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import PayableInvoices from "./pages/PayableInvoices";
import CreateUpdateOtherCosts from "./features/otherCosts/CreateUpdateOtherCosts";
import Customers from "./pages/Customers";
import CreateUpdateCustomer from "./features/customers/CreateUpdateCustomer";
import Suppliers from "./pages/Suppliers";
import CreateUpdateSupplier from "./features/suppliers/CreateUpdateSupplier";
import Home from "./pages/Home";
import InvoicesStatus from "./pages/InvoicesStatus";
import OrderStatus from "./pages/OrderStatus";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GloablStyles />
        <BrowserRouter>
          <Routes>
            {/* <Route element={<AppLayout />}> */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="quarters" element={<Quarters />} />
              <Route path="invoicesStatus" element={<InvoicesStatus />} />
              <Route path="orderStatus" element={<OrderStatus />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="orders" element={<Orders />} />
              <Route path="order" element={<CreateUpdateOrder />} />
              <Route path="pos" element={<PurchaseOrders />} />
              <Route path="po" element={<CreateUpdatePO />} />
              <Route path="payableInvoices" element={<PayableInvoices />} />
              <Route path="costs" element={<OtherCosts />} />
              <Route path="cost" element={<CreateUpdateOtherCosts />} />
              <Route path="customers" element={<Customers />} />
              <Route path="customer" element={<CreateUpdateCustomer />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="supplier" element={<CreateUpdateSupplier />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
