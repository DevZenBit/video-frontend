import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { resetAll, useAppDispatch, useAppSelector } from '@/store';
import { selectIsAuthenticated, selectRefreshToken } from '@/store/reducers/viewer';
import { useLazyRefreshTokenQuery } from '@/store/api/authApi';
import { CookiesNames } from '@/store/types/common/enums';
import { CustomAxiosError } from '@/utils/axios';

interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized: boolean;
  setIsAuthenticated: (value: boolean) => void;
  logout: () => void;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const refreshToken = useAppSelector(selectRefreshToken);
  const reduxIsAuth = useAppSelector(selectIsAuthenticated);

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(reduxIsAuth);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [refreshTokenQuery] = useLazyRefreshTokenQuery();

  const logout = useCallback(() => {
    setIsAuthenticated(false);

    Cookie.remove(CookiesNames.ACCESS_TOKEN);
    Cookie.remove(CookiesNames.REFRESH_TOKEN);

    setIsAdmin(false);

    dispatch(resetAll());
  }, [dispatch, router]);

  useEffect(() => {
    setIsAuthenticated(reduxIsAuth);
  }, [reduxIsAuth]);

  useEffect(() => {
    if (isInitialized) return;

    if (!isAuthenticated) {
      const refreshTokenFromStorage = refreshToken || Cookie.get(CookiesNames.REFRESH_TOKEN);

      if (!refreshTokenFromStorage) {
        setIsInitialized(true);
        setIsAuthenticated(false);
        return;
      }

      (async () => {
        const { isSuccess, isError, error } = await refreshTokenQuery({ refreshToken: refreshTokenFromStorage });

        if (isError) {
          setIsAuthenticated(false);
          console.info(`Error: AuthContext > refreshTokenQuery [ ${(error as CustomAxiosError)?.data?.message} ]`);
        }

        if (isSuccess) {
          setIsAuthenticated(true);
        }

        setIsInitialized(true);
      })();
    }
  }, [isAuthenticated, isInitialized]);

  const memoizedValue = useMemo(
    () => ({
      isAdmin,
      isInitialized,
      isAuthenticated,
      setIsAuthenticated,
      logout
    }),
    [isAdmin, isAuthenticated, isInitialized, logout, setIsAuthenticated]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
