"use client";

import { getCurrentUser, User } from "@/lib/fake-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ("Student" | "Teacher" | "Admin")[];
  redirectTo?: string;
}

function AuthGuard({
  children,
  allowedRoles,
  redirectTo = "/login",
}: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      router.push(redirectTo);
      return;
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      // Redirect to appropriate dashboard based on role
      switch (currentUser.role) {
        case "Student":
          router.push("/student");
          break;
        case "Teacher":
          router.push("/teacher");
          break;
        case "Admin":
          router.push("/admin");
          break;
        default:
          router.push("/");
      }
      return;
    }

    setUser(currentUser);
    setIsLoading(false);
  }, [router, allowedRoles, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
export default AuthGuard;
