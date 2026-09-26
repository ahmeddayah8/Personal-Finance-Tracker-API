import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Outlet } from "react-router";

import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { Button } from "@/components/ui/button";

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* =========================
          DESKTOP SIDEBAR
      ========================= */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-background md:block">
        <Sidebar />
      </aside>

      {/* =========================
          MOBILE OVERLAY
      ========================= */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* =========================
          MOBILE SIDEBAR
      ========================= */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72
          border-r bg-background
          transition-transform duration-300 ease-in-out
          md:hidden
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* CLOSE BUTTON */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 z-50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="size-5" />
        </Button>

        <Sidebar
          onNavigate={() => setMobileMenuOpen(false)}
        />
      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <div className="md:pl-64">
        {/* MOBILE TOP BAR */}
        <div className="flex h-14 items-center border-b bg-background px-4 md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="size-6" />
          </Button>

          <p className="ml-3 font-semibold">
            Finance Tracker
          </p>
        </div>

        <DashboardHeader />

        <main className="p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;