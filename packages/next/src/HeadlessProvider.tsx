import isNil from 'lodash/isNil';
import React from 'react';
import { client } from './client';
import { CLIENT_CACHE_PROP, PageProps } from './getProps';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HeadlessContext = React.createContext<any>({});

export function HeadlessProvider<Props = Record<string, unknown>>({
  children,
  pageProps,
}: React.PropsWithChildren<{
  pageProps: PageProps<Props>['props'];
}>): JSX.Element {
  const { useHydrateCache } = client();
  const cacheSnapshot = pageProps[CLIENT_CACHE_PROP];

  if (typeof window !== 'undefined') {
    console.log(JSON.parse(cacheSnapshot ?? '{}'));
  }

  useHydrateCache({
    cacheSnapshot: isNil(cacheSnapshot) ? undefined : cacheSnapshot,
  });

  return (
    <HeadlessContext.Provider value={{}}>{children}</HeadlessContext.Provider>
  );
}
