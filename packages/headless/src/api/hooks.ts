import { useEffect, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useRouter } from 'next/router';
import {
  Page,
  Post,
  ContentNodeIdType,
  GeneralSettings,
  UriInfo,
} from '../types';
import { getPosts, getGeneralSettings, getContentNode, getUriInfo } from './services';

export function usePosts() {
  const [result, setResult] = useState<Post[]>();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;
    if (client) {
      void (async () => {
        const posts = await getPosts(client as ApolloClient<NormalizedCacheObject>);

        if (subscribed) {
          setResult(posts);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [client]);

  return result;
}

export function usePost(id?: string, idType?: ContentNodeIdType) {
  const [result, setResult] = useState<Post | Page>();
  const client = useApolloClient();
  const pageInfo = useUriInfo();

  useEffect(() => {
    let subscribed = true;
    if (client) {
      void (async () => {
        let post: Post | Page | undefined;

        if (!!id) {
          post = await getContentNode(client as ApolloClient<NormalizedCacheObject>, id, idType);
        } else if (!!pageInfo) {
          post = await getContentNode(
            client as ApolloClient<NormalizedCacheObject>,
            pageInfo.uriPath,
            ContentNodeIdType.URI,
            pageInfo.isPreview
          );
        }

        if (subscribed) {
          setResult(post);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [client, pageInfo, id, idType]);

  return result;
}

export function useGeneralSettings() {
  const [result, setResult] = useState<GeneralSettings>();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;

    if (client) {
      void (async () => {
        const settings = await getGeneralSettings(
          client as ApolloClient<NormalizedCacheObject>,
        );

        if (subscribed && !!settings) {
          setResult(settings);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [result, client]);

  return result;
}

export function useUriInfo() {
  const [pageInfo, setUriInfo] = useState<UriInfo>();
  const router = useRouter();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;

    if (router) {
      const page = router.asPath;

      if (page.indexOf('[[') === -1) {
        void (async () => {
          const info = await getUriInfo(
            client as ApolloClient<NormalizedCacheObject>,
            page,
          );

          if (!subscribed) {
            return;
          }

          setUriInfo(info);
        })();
      }
    }

    return () => {
      subscribed = false;
    };
  }, [router, client]);

  return pageInfo;
}