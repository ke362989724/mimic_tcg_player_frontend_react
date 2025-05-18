import { Outlet } from "react-router-dom";
import Header from "../../components/header/header"; // You'll need to create this component
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { DialogProvider } from "@/context/DialogContext";

export default function Layout() {
  return (
    <DialogProvider>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <main className="mx-2 w-full md:mx-4">
          <Toaster />
          <div className="flex h-screen flex-col">
            <Header />
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </DialogProvider>
  );
}
