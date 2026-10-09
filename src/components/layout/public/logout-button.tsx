"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks";
import { useUserStore } from "@/store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LogoutButtonProps {
  className?: string;
  isCollapsed?: boolean; 
}

const LogoutButton = ({ className, isCollapsed = false }: LogoutButtonProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { removeUser } = useUserStore();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        

        queryClient.removeQueries({ queryKey: ["user"] });
        queryClient.removeQueries({ queryKey: ["currentUser"] });
        queryClient.clear();
        removeUser();

        // লগইন পেজে রিডাইরেক্ট (হার্ড নেভিগেশন ক্যাশড মেমোরি স্টেট ক্লিয়ার রাখে)
        window.location.href = "/";
      },
      onError: (error: any) => {
        toast.error(error?.message || "Failed to logout. Please try again.");
      },
    });
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      disabled={isLoggingOut}
      title="Logout"
      className={`group w-full justify-start gap-3 rounded-lg px-3 py-2 text-xm font-medium text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive active:scale-[0.98] ${
        isCollapsed ? "justify-center px-2" : ""
      } ${className || ""}`}
    >
      {isLoggingOut ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-destructive" />
      ) : (
        <LogOut className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
      )}

      {!isCollapsed && (
        <span className="truncate">
          {isLoggingOut ? "Logging out..." : "Log out"}
        </span>
      )}
    </Button>
  );
};

export default LogoutButton;