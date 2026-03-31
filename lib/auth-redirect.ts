import type { UserRole } from "@/types/domain";

export function getRedirectPathForRole(role: UserRole) {
  switch (role) {
    case "STUDENT":
      return "/dashboard";
    case "PARENT":
      return "/children";
    case "ADMIN":
    case "SUPER_ADMIN":
      return "/admin";
  }
}
