"use client";

import {
  Home,
  Settings,
  ChevronDown,
  ChevronRight,
  Users,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import UserProfile from "./UserProfile";

// Tipos para os itens do menu
interface SubMenuItem {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  url?: string;
  icon: React.ComponentType<{ className?: string }>;
  submenus?: SubMenuItem[];
}

// Menu items com suporte a submenus
const items: MenuItem[] = [
  {
    title: "Início",
    url: "#",
    icon: Home,
  },
  {
    title: "Conta",
    icon: Users,
    submenus: [
      { title: "Visualizar", url: "/dashboard/contas/listar" },
      { title: "Cadastrar", url: "/dashboard/contas/cadastrar" },
    ],
  },
  {
    title: "Financeiro",
    icon: CreditCard,
    submenus: [
      { title: "Relatórios", url: "#" },
      { title: "Transações", url: "#" },
      { title: "Orçamento", url: "#" },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  const toggleMenu = (title: string) => {
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const isMenuExpanded = (title: string) => expandedMenus.has(title);
  const theme = useTheme();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Image
            src={theme.theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
            alt="Nautt Finance"
            width={132}
            height={52}
            className="mt-4"
          />
          <UserProfile
            userName="User Name"
            userEmail="user@nauttfinance.com"
            onLogout={() => console.log("Logout clicked")}
          />
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.submenus ? (
                    <>
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.title)}
                        className="w-full justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        {isMenuExpanded(item.title) ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </SidebarMenuButton>

                      {isMenuExpanded(item.title) && (
                        <SidebarMenuSub>
                          {item.submenus.map((submenu) => (
                            <SidebarMenuSubItem key={submenu.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={submenu.url}>
                                  <span>{submenu.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    // Menu simples
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Tema</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
