import { UserRole } from "@/types/domain";

export const roleHierarchy: Record<UserRole, number> = {
  STUDENT: 1,
  PARENT: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4
};

export function hasRole(currentRole: UserRole, requiredRole: UserRole) {
  return roleHierarchy[currentRole] >= roleHierarchy[requiredRole];
}

export function ensureRole(currentRole: UserRole, allowedRoles: UserRole[]) {
  return allowedRoles.includes(currentRole);
}
