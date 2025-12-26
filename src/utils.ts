/**
 * Utility functions for the extension
 */

/**
 * Download a file with given content
 */
export function downloadFile(
  text: string,
  downloadableName: string,
  extension = 'svg',
  isDirectUrl = false
): void {
  const anchor = document.createElement('a');

  if (isDirectUrl) {
    anchor.setAttribute('href', text);
  } else {
    anchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  }

  anchor.setAttribute('download', `${downloadableName}.${extension}`);
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

/**
 * Download PNG from URL
 */
export async function downloadPNG(imageSrc: string, name: string): Promise<void> {
  const image = await fetch(imageSrc);
  const imageBlob = await image.blob();
  const imageURL = URL.createObjectURL(imageBlob);

  const link = document.createElement('a');
  link.href = imageURL;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(imageURL);
}

/**
 * Download JSON file
 */
export function downloadJson(
  data: Record<string, unknown>,
  downloadableName: string,
  extension = 'json'
): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${downloadableName}.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copy text to clipboard using modern Clipboard API
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Try modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const result = document.execCommand('copy');
    document.body.removeChild(textarea);
    return result;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Get UUID from IconScout localStorage
 */
export function getUUIDFromIconScout(): string | number {
  const se = localStorage.getItem('__user_traits');
  if (se) {
    try {
      const userData = JSON.parse(se);
      if (userData && userData.uuid) {
        return userData.uuid;
      }
    } catch (error) {
      console.error('Failed to parse user traits:', error);
    }
  }
  return 0;
}

/**
 * Extract token from performance entries
 */
export function extractTokenFromUrls(productId: string): string | null {
  const entries = window.performance.getEntries();

  const filteredEntries = entries.filter(
    (entry) =>
      (entry.initiatorType === 'xmlhttprequest' || entry.initiatorType === 'fetch') &&
      entry.name.includes('?token=') &&
      entry.name.includes(productId)
  );

  if (filteredEntries.length > 0) {
    const lastEntry = filteredEntries[filteredEntries.length - 1];
    return lastEntry.name;
  }

  return null;
}

/**
 * Query selector helper
 */
export function qs<T extends Element = Element>(selector: string, parent: Document | Element = document): T | null {
  return parent.querySelector<T>(selector);
}

/**
 * Query selector all helper
 */
export function qsa<T extends Element = Element>(selector: string, parent: Document | Element = document): NodeListOf<T> {
  return parent.querySelectorAll<T>(selector);
}

/**
 * Create element helper with optional attributes
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes?: Record<string, string>,
  children?: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (children) {
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
  }

  return element;
}
