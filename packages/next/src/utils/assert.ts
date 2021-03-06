import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import trim from 'lodash/trim';

export type HasObject = Record<string, string | string[] | undefined>;

function hasPropString<P extends string>(
  prop: P,
): (params: HasObject) => params is Record<P, string> {
  return (params): params is Record<P, string> => {
    return isObject(params) && isString(params[prop]);
  };
}

function hasPropStringArray<P extends string>(
  prop: P,
): (params: HasObject) => params is Record<P, string[]> {
  return (params): params is Record<P, string[]> => {
    return (
      isObject(params) && isArray(params[prop]) && isString(params[prop]?.[0])
    );
  };
}

export const hasPostId = hasPropString('postId');
export const hasPostSlug = hasPropString('postSlug');
export const hasPostUri = hasPropStringArray('postUri');

export const hasPageId = hasPropString('pageId');
export const hasPageUri = hasPropStringArray('pageUri');

export const hasCategoryId = hasPropString('categoryId');
export const hasCategorySlug = hasPropString('categorySlug');

export function formatUrlPrefix(pathPrefix: string): string {
  if (pathPrefix.length === 1 && pathPrefix === '/') {
    return '';
  }

  const prefix: string = trim(pathPrefix, '/');

  return `/${prefix}`;
}
