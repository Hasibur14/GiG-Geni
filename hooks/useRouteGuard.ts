"use client";

import { checkRoutePermission } from "@/lib/auth";
import { useAuthStore } from "@/store/authStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useRouteGuard() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 👇 NEW: Manage modal state
  const [shouldShowLoginModal, setShouldShowLoginModal] = useState(false);
  const [intendedPath, setIntendedPath] = useState<string | null>(null);

  useEffect(() => {
    // Handle redirect after login
    const redirect = searchParams.get("redirect");
    if (redirect && isAuthenticated) {
      router.replace(redirect);
      return;
    }

    // Handle error messages from middleware
    const error = searchParams.get("error");
    if (error) {
      // Clear error params
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("error");
      newUrl.searchParams.delete("required_role");
      newUrl.searchParams.delete("user_role");
      newUrl.searchParams.delete("redirect");

      window.history.replaceState({}, "", newUrl.toString());

      // Show appropriate error message
      if (error === "auth_required") {
        console.log("Authentication required for this page");
        // 👇 Trigger modal if not authenticated
        if (!isAuthenticated) {
          setIntendedPath(pathname || "/");
          setShouldShowLoginModal(true);
        }
      } else if (error === "access_denied") {
        const requiredRole = searchParams.get("required_role");
        const userRole = searchParams.get("user_role");
        console.log(
          `Access denied. Required: ${requiredRole}, Current: ${userRole}`
        );
      }
    }

    // Client-side route protection check
    const permission = checkRoutePermission(pathname, user);
    if (!permission.allowed) {
      if (permission.redirectTo) {
        router.push(permission.redirectTo);
      } else if (!isAuthenticated) {
        // 👇 No redirect specified? Show login modal
        setIntendedPath(pathname || "/");
        setShouldShowLoginModal(true);
      }
    } else {
      // 👇 If allowed, ensure modal is closed
      setShouldShowLoginModal(false);
    }
  }, [pathname, user, isAuthenticated, router, searchParams]);

  // 👇 NEW: Handlers for modal interaction
  const handleLoginSuccess = () => {
    setShouldShowLoginModal(false);
    if (intendedPath && intendedPath !== pathname) {
      router.push(intendedPath);
    }
  };

  const handleLoginModalClose = () => {
    setShouldShowLoginModal(false);
    setIntendedPath(null);
  };

  return {
    isAllowed: checkRoutePermission(pathname, user).allowed,
    user,
    isAuthenticated,
    // 👇 EXPOSE NEW PROPERTIES
    shouldShowLoginModal,
    intendedPath,
    handleLoginSuccess,
    handleLoginModalClose,
  };
}
