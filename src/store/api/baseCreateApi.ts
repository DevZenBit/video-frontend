import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig } from 'axios';
import Cookie from 'js-cookie';
import { CookiesNames } from '../types/common/enums';
import axios, { axiosError } from '@/utils/axios';
import { Mutex } from 'async-mutex';
import { setViewerWithTokens } from '../reducers/viewer';
import { resetAll, RootState } from '../index';
import { HttpMethods } from '../types/api/common';

const mutex = new Mutex();

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      body?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, body: data, params, headers }, { getState, dispatch }) => {
    const accessToken = (getState() as RootState).viewer.accessToken || Cookie.get(CookiesNames.ACCESS_TOKEN);
    const authHeader: {
      Authorization?: string;
    } = {};

    if (accessToken) {
      authHeader.Authorization = `Bearer ${accessToken}`;
    }

    const axiosQueryConfig = {
      url,
      method,
      data,
      params,
      headers: { ...headers, ...authHeader }
    };

    try {
      await mutex.waitForUnlock();

      const response = await axios(axiosQueryConfig);

      if (response.data) {
        return { data: response.data };
      }
    } catch (e) {
      // @ts-ignore
      const error = axiosError(e);

      if (error.error.status !== 401) {
        return error;
      }

      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        const refreshToken = (getState() as RootState).viewer.refreshToken || Cookie.get(CookiesNames.REFRESH_TOKEN);

        if (!refreshToken) {
          release();

          return error;
        }

        try {
          const refreshResult = await axios({ method: HttpMethods.POST, url: '/auth/refresh', data: { refreshToken } });

          if (!refreshResult.data) {
            Cookie.remove(CookiesNames.ACCESS_TOKEN);
            Cookie.remove(CookiesNames.REFRESH_TOKEN);

            dispatch(resetAll());
            release();

            return error;
          }

          dispatch(
            setViewerWithTokens({
              viewer: refreshResult.data.profile,
              accessToken: refreshResult.data.accessToken,
              refreshToken: refreshResult.data.refreshToken
            })
          );
          Cookie.set(CookiesNames.ACCESS_TOKEN, refreshResult.data.accessToken);
          Cookie.set(CookiesNames.REFRESH_TOKEN, refreshResult.data.refreshToken);

          if (refreshResult.data.accessToken) {
            authHeader.Authorization = `Bearer ${refreshResult.data.accessToken}`;
          }

          const response = await axios({ ...axiosQueryConfig, headers: { ...headers, ...authHeader } });

          if (response.data) {
            release();

            return { data: response.data };
          }
        } catch (e) {
          // @ts-ignore
          const lastAxiosError = axiosError(e);

          if (lastAxiosError.error.status === 401) {
            dispatch(resetAll());

            Cookie.remove(CookiesNames.ACCESS_TOKEN);
            Cookie.remove(CookiesNames.REFRESH_TOKEN);
          }

          return lastAxiosError;
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();

        const response = await axios(axiosQueryConfig);

        if (response.data) {
          return { data: response.data };
        }
      }

      return error;
    }

    return { error: { data: { message: 'Oops, something went wrong' } } };
  };

export const baseCreateApi = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  reducerPath: 'baseCreateApi'
});
