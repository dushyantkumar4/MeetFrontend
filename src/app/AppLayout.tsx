import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/Navbar";
import Sidebar from "@/shared/components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Navbar */}
          <div className="flex flex-row overflow-hidden items-center">
            <SidebarTrigger className="row-span-1" />
            <div className="w-full">
              <Navbar />
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
