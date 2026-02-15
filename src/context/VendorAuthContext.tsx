import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { storeApi } from '../api/store';
import type { VendorSession } from '../types';

interface VendorAuthContextValue {
  session: VendorSession | null;
  login: (login: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const VendorAuthContext = createContext<VendorAuthContextValue | null>(null);

export function VendorAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<VendorSession | null>(() => storeApi.vendor.getSession());

  useEffect(() => {
    setSession(storeApi.vendor.getSession());
  }, []);

  const login = useCallback((loginName: string, password: string) => {
    const ok = storeApi.vendor.login(loginName, password);
    if (ok) setSession(storeApi.vendor.getSession());
    return ok;
  }, []);

  const logout = useCallback(() => {
    storeApi.vendor.logout();
    setSession(null);
  }, []);

  const value: VendorAuthContextValue = {
    session,
    login,
    logout,
    isAuthenticated: !!session,
  };

  return (
    <VendorAuthContext.Provider value={value}>{children}</VendorAuthContext.Provider>
  );
}

export function useVendorAuth() {
  const ctx = useContext(VendorAuthContext);
  if (!ctx) throw new Error('useVendorAuth must be used within VendorAuthProvider');
  return ctx;
}
