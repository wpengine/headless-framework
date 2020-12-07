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
import {
  getPosts,
  getGeneralSettings,
  getContentNode,
  getUriInfo,
} from './services';

/**
 * React Hook for retrieving a list of posts from your Wordpress site
 *
 * @example
 * ```ts
 * import { usePosts } from '@wpengine/headless';
 *
 * export function ListPosts() {
 *   const posts = usePosts();
 *
 *   if (!posts) {
 *     return <></>;
 *   }
 *
 *   return (
 *     <>
 *       {posts.map((post) => (
 *         <div key={post.id} dangerouslySetInnerHTML={ { __html: post.content ?? '' } } />
 *       ))}
 *     </>
 *   );
 * }
 * @export
 * @returns {(Post[] | undefined)}
 */
export function usePosts(): Post[] | undefined {
  const [result, setResult] = useState<Post[]>();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;
    if (client) {
      void (async () => {
        try {
          const posts = await getPosts(
            client as ApolloClient<NormalizedCacheObject>,
          );

          if (subscribed) {
            setResult(posts);
          }
        } catch (e) {
          console.log('Error getting posts');
          console.log(e);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [client]);

  return result;
}

export function useGeneralSettings() {
  const [result, setResult] = useState<GeneralSettings>();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;

    if (client) {
      void (async () => {
        try {
          const settings = await getGeneralSettings(
            client as ApolloClient<NormalizedCacheObject>,
          );

          if (subscribed && !!settings) {
            setResult(settings);
          }
        } catch (e) {
          console.log('Error getting settings');
          console.log(e);
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
          try {
            const info = await getUriInfo(
              client as ApolloClient<NormalizedCacheObject>,
              page,
            );

            if (!subscribed) {
              return;
            }

            setUriInfo(info);
          } catch (e) {
            console.log('Error getting URI info');
            console.log(e);
          }
        })();
      }
    }

    return () => {
      subscribed = false;
    };
  }, [router, client, router.asPath]);

  if (pageInfo?.uriPath !== router.asPath) {
    return undefined;
  }

  return pageInfo;
}

export function usePost(id?: string, idType?: ContentNodeIdType) {
  const [result, setResult] = useState<Post | Page>();
  const client = useApolloClient();
  const pageInfo = useUriInfo();

  useEffect(() => {
    let subscribed = true;
    if (client) {
      void (async () => {
        try {
          let post: Post | Page | undefined;

          if (id) {
            post = await getContentNode(
              client as ApolloClient<NormalizedCacheObject>,
              id,
              idType,
            );
          } else if (pageInfo) {
            post = await getContentNode(
              client as ApolloClient<NormalizedCacheObject>,
              pageInfo.uriPath,
              ContentNodeIdType.URI,
              pageInfo.isPreview,
            );
          }

          if (subscribed) {
            setResult(post);
          }
        } catch (e) {
          console.log('Error getting a post');
          console.log(e);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [client, pageInfo, id, idType]);

  return result;
}
