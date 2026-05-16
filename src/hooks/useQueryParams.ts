import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// Custom hook which is used to manage URL query parameters and UI State
export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Used to get a single param value with an optional fallback
  const getParam = useCallback(
    (key: string, fallback: string = "") => {
      return searchParams.get(key) || fallback;
    },
    [searchParams],
  );

  // Update multiple query parameters at once.
  const setParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Update the URL without a full page refresh
      // scroll: false prevents the page from jumping to the top
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  // Clear all query parameters
  const clearParams = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return {
    getParam,
    setParams,
    clearParams,
    searchParams,
  };
}
