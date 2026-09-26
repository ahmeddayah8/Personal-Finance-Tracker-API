import { useQuery } from "@tanstack/react-query";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useAuthStore from "@/lib/store/authStore";
import { getProfile } from "@/lib/api/authApi";

import ThemeToggle from "@/components/ThemeToggle";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  // Isla profile query-ga Profile.jsx
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const user = data?.user || data;

  const userName = user?.name || "User";
  const userEmail = user?.email || "";
  const profilePicture = user?.profilePicture || "";

  const firstLetter = userName?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* LEFT */}
        <div>
          <h2 className="text-lg font-semibold">Welcome back, {userName}</h2>

          <p className="hidden text-sm text-muted-foreground sm:block">
            Manage your finances
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <Avatar className="size-8 border">
            {profilePicture && (
              <AvatarImage
                src={profilePicture}
                alt={userName}
                className="object-cover"
              />
            )}

            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">{userName}</p>
          </div>
          <ThemeToggle />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleLogout}
          >
            <LogOut className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
