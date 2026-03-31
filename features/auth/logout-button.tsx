"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST"
      });
    } finally {
      router.push("/");
      router.refresh();
      setIsSubmitting(false);
    }
  }

  return (
    <Button
      variant="ghost"
      className="w-full justify-start border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
      disabled={isSubmitting}
      onClick={handleLogout}
      type="button"
    >
      <LogOut className="mr-2 h-4 w-4" />
      {isSubmitting ? "Logging out..." : "Logout"}
    </Button>
  );
}
