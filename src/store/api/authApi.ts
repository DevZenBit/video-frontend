import { baseCreateApi } from './baseCreateApi';
import { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from '../types/api/auth';
import { HttpMethods } from '../types/api/common';
import { setViewerWithTokens } from '../reducers/viewer';
import Cookie from 'js-cookie';
import { CookiesNames } from '../types/common/enums';

export const authApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<LoginResponse, LoginRequest>({
      query({ email, password, rememberMe }) {
        return {
          url: '/auth/sign-in',
          method: HttpMethods.POST,
          body: { email, password, rememberMe }
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled.then(({ data }) => {
            dispatch(setViewerWithTokens({ viewer: data.user, accessToken: data.authToken, refreshToken: data.refreshToken }));

            Cookie.set(CookiesNames.ACCESS_TOKEN, data.authToken);

            if (args.rememberMe) {
              Cookie.set(CookiesNames.REFRESH_TOKEN, data.refreshToken);
            }
          });
        } catch (e: any) {
          console.info(`Error: authApi > login [ ${e?.error?.data?.message} ]`);
        }
      }
    }),
    refreshToken: builder.query<RefreshTokenResponse, RefreshTokenRequest>({
      query({ refreshToken }) {
        return {
          url: '/auth/refresh',
          method: HttpMethods.POST,
          body: { refreshToken }
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled.then(({ data }) => {
            dispatch(setViewerWithTokens({ viewer: data.user, accessToken: data.authToken, refreshToken: data.refreshToken }));

            Cookie.set(CookiesNames.ACCESS_TOKEN, data.authToken);
            Cookie.set(CookiesNames.REFRESH_TOKEN, data.refreshToken);
          });
        } catch (e: any) {
          console.info(`Error: authApi > refreshToken [ ${e?.error?.data?.message} ]`);
        }
      }
    })
  }),
  overrideExisting: true
});

export const { useLazyLoginQuery, useLazyRefreshTokenQuery } = authApi;
