import isString from 'lodash/isString';

/**
 * Returns whether or not the app execution context is currently Server-Side or Client-Side
 *
 * @export
 * @returns {boolean}
 */
export function isServerSide(): boolean {
  return typeof window === 'undefined';
}

/**
 * Returns whether or not a string is a base64 encoded string
 *
 * @export
 * @param {string} str
 * @returns
 */
export function isBase64(str: string): boolean {
  if (!isString(str) || str.length === 0) {
    return false;
  }

  return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?\n?$/.test(
    str.replace(/\n/g, ''),
  );
}

export const previewRegex = /\/preview(\/\w|\?)/;

export function isPreviewPath(uri: string): boolean {
  if (!isString(uri)) {
    return false;
  }

  return previewRegex.test(uri);
}
