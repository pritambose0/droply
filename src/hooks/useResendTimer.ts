import { useCallback, useSyncExternalStore } from "react";

interface UseResendTimerProps {
  keyPrefix: string;
  identifier: string | null;
}

type Listener = () => void;

const storageListeners = new Set<Listener>();

function subscribeToStorage(listener: Listener) {
  storageListeners.add(listener);

  let handleStorage: (() => void) | null = null;

  if (typeof window !== "undefined") {
    handleStorage = () => {
      cachedNow = Date.now();
      listener();
    };
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    storageListeners.delete(listener);

    if (typeof window !== "undefined" && handleStorage) {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function notifyStorage() {
  cachedNow = Date.now();
  storageListeners.forEach((listener) => listener());
}

let cachedNow = typeof Date !== "undefined" ? Date.now() : 0;
let ticker: ReturnType<typeof setInterval> | null = null;
const tickListeners = new Set<Listener>();

function subscribeToTick(listener: Listener) {
  tickListeners.add(listener);

  if (ticker === null) {
    cachedNow = Date.now();
    ticker = setInterval(() => {
      cachedNow = Date.now();
      tickListeners.forEach((tickListener) => tickListener());
    }, 1000);
  }

  listener();

  return () => {
    tickListeners.delete(listener);

    if (tickListeners.size === 0 && ticker !== null) {
      clearInterval(ticker);
      ticker = null;
    }
  };
}

function subscribeToNothing() {
  return () => {};
}

function getNow() {
  return cachedNow;
}

function getServerNow() {
  return 0;
}

export function useResendTimer({ keyPrefix, identifier }: UseResendTimerProps) {
  const storageKey = identifier ? `${keyPrefix}:${identifier}` : null;

  const readExpiry = useCallback(() => {
    if (typeof window === "undefined" || !storageKey) return null;

    const storedExpiry = localStorage.getItem(storageKey);
    if (!storedExpiry) return null;

    const expiry = Number(storedExpiry);
    return Number.isFinite(expiry) ? expiry : null;
  }, [storageKey]);

  const expiry = useSyncExternalStore(
    subscribeToStorage,
    readExpiry,
    () => null,
  );

  const shouldTick = expiry !== null && expiry > cachedNow;

  const now = useSyncExternalStore(
    shouldTick ? subscribeToTick : subscribeToNothing,
    getNow,
    getServerNow,
  );

  const countdown =
    expiry !== null && expiry > now
      ? Math.max(0, Math.ceil((expiry - now) / 1000))
      : 0;

  const startCountdown = useCallback(
    (seconds: number) => {
      if (!storageKey) return;

      const expiry = Date.now() + seconds * 1000;
      localStorage.setItem(storageKey, expiry.toString());
      notifyStorage();
    },
    [storageKey],
  );

  const clearTimer = useCallback(() => {
    if (!storageKey) return;

    localStorage.removeItem(storageKey);
    notifyStorage();
  }, [storageKey]);

  return {
    countdown,
    startCountdown,
    clearTimer,
  };
}
