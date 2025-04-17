import { Outlet } from "react-router-dom";
import Header from "../../components/header/header"; // You'll need to create this component
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar/app-sidebar";

export default function Layout() {
  return (
    <div className="">
      <SidebarProvider>
        <AppSidebar />
        <main className="mx-2 w-full md:mx-4">
          <Header />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
