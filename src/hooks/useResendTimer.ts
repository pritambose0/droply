import { useState, useEffect, useCallback } from "react";

interface UseResendTimerProps {
  keyPrefix: string;
  identifier: string | null;
}

export function useResendTimer({ keyPrefix, identifier }: UseResendTimerProps) {
  const [countdown, setCountdown] = useState(0);

  // Helper to strictly generate the identical key everywhere
  const getStorageKey = useCallback(() => {
    if (!identifier) return null;
    return `${keyPrefix}:${identifier}`;
  }, [keyPrefix, identifier]);

  // 1. Initialization Effect: Runs once on mount when identifier is ready
  useEffect(() => {
    const key = getStorageKey();
    if (!key) return;

    const storedExpiry = localStorage.getItem(key);
    if (storedExpiry) {
      const remainingTime = Math.round((parseInt(storedExpiry) - Date.now()) / 1000);
      if (remainingTime > 0) {
        setCountdown(remainingTime);
      } else {
        localStorage.removeItem(key);
      }
    }
  }, [getStorageKey]);

  // 2. The Tick Effect: Handles the countdown every second
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // Cleanup prevents memory leaks!
    }
  }, [countdown]);

  // 3. The API exposed to your components
  const startCountdown = useCallback(
    (seconds: number) => {
      const key = getStorageKey();
      if (!key) return;

      const expiry = Date.now() + seconds * 1000;
      localStorage.setItem(key, expiry.toString());
      setCountdown(seconds);
    },
    [getStorageKey]
  );

  const clearTimer = useCallback(() => {
    const key = getStorageKey();
    if (!key) return;

    localStorage.removeItem(key);
    setCountdown(0);
  }, [getStorageKey]);

  return {
    countdown,
    startCountdown,
    clearTimer,
  };
}
