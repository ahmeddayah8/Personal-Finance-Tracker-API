import {
  LayoutDashboard,
  List,
  User,
  Wallet,
} from "lucide-react";

import { NavLink } from "react-router";

const Sidebar = ({ onNavigate }) => {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: List,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <div className="flex h-full flex-col bg-background">
      {/* LOGO */}
      <div className="flex h-20 items-center gap-3 border-b px-6">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Wallet className="size-5" />
        </div>

        <div>
          <h2 className="font-bold">
            Finance Tracker
          </h2>

          <p className="text-xs text-muted-foreground">
            Manage your money
          </p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3
                text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <Icon className="size-5" />

              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;