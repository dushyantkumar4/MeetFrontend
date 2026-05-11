import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Mails, LayoutDashboard, CircleUser, Video } from "lucide-react";
import { NavLink } from "react-router-dom";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" variant="floating" className="">
      {/* Header */}
      <SidebarHeader className="font-bold rounded-lg bg-purple-50">
        <SidebarMenuButton asChild>
          <NavLink to="/me" className="">
            <CircleUser /> <span>Profile</span>{" "}
          </NavLink>
        </SidebarMenuButton>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="bg-purple-50">
        <SidebarGroup>
          <SidebarMenu className="flex flex-col gap-3">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/dashboard" className="">
                  <LayoutDashboard /> <span>Dashboard</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="#" className="">
                  <Video /> <span>Meet</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="#" className="">
                  <Mails /> <span>Chat</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* logout  */}
      <SidebarFooter className=" rounded-lg">
        <SidebarMenuButton asChild className="gradient-text-primary">
          <div>
            {" "}
            <Video className="text-purple-400" />
            By Decent Meet
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
