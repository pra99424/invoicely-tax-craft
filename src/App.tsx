
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileCreate from "./pages/ProfileCreate";
import ProfileEdit from "./pages/ProfileEdit";
import Dashboard from "./pages/Dashboard";
import InvoiceCreate from "./pages/InvoiceCreate";
import Invoices from "./pages/Invoices";
import Clients from "./pages/Clients";
import ClientAdd from "./pages/ClientAdd";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/create" element={<ProfileCreate />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invoice/new" element={<InvoiceCreate />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/add" element={<ClientAdd />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
