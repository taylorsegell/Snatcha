/**
 * Snatcha - SVG Icon Downloader
 * Modern TypeScript implementation
 */

import './styles.css';
import { Snackbar } from './snackbar';
import { LOADING_ICON_SVG, ICONS8_DOWNLOAD_BUTTON } from './assets';
import {
  downloadFile,
  downloadPNG,
  downloadJson,
  copyToClipboard,
  getUUIDFromIconScout,
  extractTokenFromUrls,
  qs,
  qsa,
} from './utils';
import type { User, Icons8ApiResponse, FlaticonApiResponse, IconScoutResponse } from './types';

// User state
const USER: User = {
  logged_in: false,
  id: 0,
  premium_token: null,
  active_on: null,
};

/**
 * Check if user is logged in
 */
function checkLoggedInStatus(): boolean {
  return USER.logged_in === true;
}

/**
 * Activate premium buttons on Flaticon
 */
function activateButtons(): void {
  const premiumElements = qs('#fi-premium-download-buttons');
  if (premiumElements) {
    const premiumIcons = qsa('.icon--premium', premiumElements);
    premiumIcons.forEach((icon) => {
      (icon as HTMLElement).style.display = 'none';
    });

    const modalBody = qs('.modal-body .hr:first', premiumElements);
    if (modalBody) {
      let sibling = modalBody.previousElementSibling;
      while (sibling && sibling.tagName !== 'P') {
        const toRemove = sibling;
        sibling = sibling.previousElementSibling;
        toRemove.remove();
      }
    }
  }

  const profileAlert = qs("section[class='profile'] div[class='alert alert-warning']");
  if (profileAlert) {
    profileAlert.remove();
  }
}

/**
 * Initialize FontAwesome CDN button
 */
function initButtonFae(): void {
  const button = document.createElement('span');
  button.id = 'getFontawesomeCdn';
  button.className = 'position-relative';
  button.textContent = 'Generate Premium Icon CDN Link';

  Object.assign(button.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '999',
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  });

  button.addEventListener('click', async () => {
    const versionSelector = qs<HTMLSelectElement>('#choose_aversionoffontawesome');
    const version = versionSelector?.value ?? '6.4.2';
    const link = `https://site-assets.fontawesome.com/releases/v${version}/css/all.css`;

    const success = await copyToClipboard(link);
    if (success) {
      Snackbar.show({ text: 'CDN link copied to clipboard', showAction: false });
    }
  });

  document.body.appendChild(button);
}

/**
 * Initialize FontAwesome download button
 */
function initFontAwesome(): void {
  const button = qs('#fontAwesomeSVGDownload');
  if (button) return;

  const iconActions = qs('.icon-actions');
  if (iconActions) {
    const downloadButton = document.createElement('button');
    downloadButton.className = 'position-relative';
    downloadButton.id = 'fontAwesomeSVGDownload';
    downloadButton.style.cssText = 'top: calc(0.375em * -1) !important; width: 100% !important;';
    downloadButton.textContent = 'Download SVG';
    iconActions.appendChild(downloadButton);
  }
}

/**
 * Handle FontAwesome SVG download
 */
async function handleFontAwesomeDownload(): Promise<void> {
  const versionSelector = qs<HTMLSelectElement>('#choose_aversionoffontawesome');
  const version = versionSelector?.value ?? '6.4.2';
  let url = `https://site-assets.fontawesome.com/releases/v${version}/svgs/`;

  const codeSnippet = qs('.icon-code-snippet.codeblock-tabbed.margin-bottom-xl');
  const name = codeSnippet?.id ?? '';
  const iconFamilySelect = qs<HTMLSelectElement>('#icon_family');
  const iconFamily = iconFamilySelect?.value ?? 'classic';
  const activeButton = qs('#icon_style button.active');
  const iconStyle = activeButton?.getAttribute('aria-label') || 'solid';

  url += (iconFamily.toLowerCase() !== 'classic' ? iconFamily.toLowerCase() + '-' : '') + iconStyle.toLowerCase() + '/' + name + '.svg';

  try {
    const response = await fetch(url);
    const text = await response.text();
    downloadFile(text, name);
  } catch (error) {
    console.error('Failed to download FontAwesome SVG:', error);
    Snackbar.show({ text: 'Failed to download SVG', showAction: false });
  }
}

/**
 * Handle Icons8 SVG download
 */
async function handleIcons8Download(button: HTMLElement): Promise<void> {
  if (!checkLoggedInStatus()) {
    Snackbar.show({ text: 'Please login to download the icon.' });
    return;
  }

  try {
    const originalHTML = button.innerHTML;
    button.innerHTML = LOADING_ICON_SVG;

    const activeIcon = qs<HTMLElement>('.app-grid-icon--is-active');
    const iconId = activeIcon?.dataset.icon;

    if (!iconId) {
      Snackbar.show({ text: 'Icon ID not found' });
      button.innerHTML = originalHTML;
      return;
    }

    const response = await fetch(
      `https://api-icons.icons8.com/siteApi/icons/icon?id=${iconId}&info=true&language=en-US&svg=true`
    );
    const data: Icons8ApiResponse = await response.json();

    const iconName = data.icon.name ?? iconId;
    const svg = data.icon.svg ?? '';

    if (svg.length > 0) {
      downloadFile(atob(svg), iconName);
    } else {
      Snackbar.show({ text: 'Icon / Asset is not available in SVG format.' });
    }

    button.innerHTML = originalHTML;
  } catch (error) {
    console.error('Icons8 download error:', error);
    Snackbar.show({ text: 'Something went wrong while downloading the icon. Please reload the page.' });
  }
}

/**
 * Handle IconScout download
 */
async function handleIconScoutDownload(button: HTMLElement): Promise<void> {
  if (!checkLoggedInStatus()) {
    Snackbar.show({ text: 'Please login to download the icon.' });
    return;
  }

  const originalHTML = button.innerHTML;
  button.innerHTML = LOADING_ICON_SVG;

  const productIdMeta = qs<HTMLMetaElement>('meta[data-n-head="ssr"][property="og:product_id"]');
  const productUrlMeta = qs<HTMLMetaElement>('meta[data-n-head="ssr"][property="product:product_link"]');
  const productId = productIdMeta?.content;
  const productUrl = productUrlMeta?.content;

  if (!productId) {
    button.innerHTML = originalHTML;
    return;
  }

  try {
    const colorEditor = qs(`#pdpColorEditor-${productId}`);
    const lottieEditor = qs(`#pdp-lottie-player-${productId}`);

    if (colorEditor) {
      const token = extractTokenFromUrls(productId);
      if (token) {
        const response = await fetch(token);
        const data = await response.text();
        if (data) {
          downloadFile(data, productId, 'svg', false);
        }
      }
      button.innerHTML = 'Download';
    } else if (lottieEditor) {
      const token = extractTokenFromUrls(productId);
      if (token) {
        const response = await fetch(token);
        const data = await response.json();
        if (data) {
          downloadJson(data, productId);
        }
      }
      button.innerHTML = 'Download';
    } else {
      // 3D icon - download as PNG
      const uuid = getUUIDFromIconScout();
      if (uuid && productUrl) {
        const parts = productUrl.split('/');
        const pId = parts[parts.length - 1];
        if (pId) {
          const response = await fetch(
            `https://iconscout.com/api/v2/new-items/${pId}?extra_fields=true&items=true&token=${uuid}`
          );
          const data: IconScoutResponse = await response.json();
          if (data) {
            await downloadPNG(data.response.item.urls.original, `${productId}.png`);
          }
        }
      }
      button.innerHTML = 'Download';
    }
  } catch (error) {
    console.error('IconScout download error:', error);
    Snackbar.show({ text: 'Something went wrong while downloading the icon. Please reload the page.' });
    button.innerHTML = originalHTML;
  }
}

/**
 * Handle Flaticon SVG download
 */
async function handleFlaticonDownload(button: HTMLElement, isCopy: boolean): Promise<void> {
  if (!checkLoggedInStatus()) {
    Snackbar.show({ text: 'Please login to download the icon.' });
    return;
  }

  try {
    const originalHTML = button.innerHTML;
    button.innerHTML = LOADING_ICON_SVG;

    // Clean up modal
    const modalContent = qs('.modal-download-detail__content');
    modalContent?.remove();
    const detailEditor = qs('.detail__editor');
    detailEditor?.classList.add('hide');
    const detailTop = qs('.detail__top');
    detailTop?.classList.remove('hide');

    const twitterImageMeta = qs<HTMLMetaElement>('meta[name="twitter:image"]');
    let meta = twitterImageMeta?.content.replace('https://cdn-icons-png.flaticon.com/', '') ?? '';
    const metaSplit = meta.split('/');
    const detail = qs<HTMLElement>('#detail');
    const iconType = detail?.dataset.icon_type;
    const iconId = metaSplit[metaSplit.length - 1].replace('.png', '');

    let iconName = qs<HTMLElement>(`li.icon--item[data-id='${iconId}']`)?.dataset.name;
    if (!iconName) {
      iconName = qs<HTMLElement>(`section#detail[data-id='${iconId}']`)?.dataset.name;
    }
    if (!iconName) {
      iconName = iconId;
    }

    const response = await fetch(
      `https://www.flaticon.com/editor/icon/svg/${iconId}?type=${iconType}&_auth_premium_token=${USER.premium_token}`
    );
    const data: FlaticonApiResponse = await response.json();
    const svgResponse = await fetch(data.url);
    const text = await svgResponse.text();

    if (isCopy) {
      const success = await copyToClipboard(text);
      if (success) {
        Snackbar.show({ text: 'SVG Copied to clipboard.', showAction: false });
      }
      button.innerHTML = 'Copy SVG';
    } else {
      downloadFile(text, iconName);
      button.innerHTML = 'SVG';
    }
  } catch (error) {
    console.error('Flaticon download error:', error);
    Snackbar.show({ text: 'Something went wrong while downloading the icon. Please reload the page.' });
  }
}

/**
 * Setup event listeners
 */
function setupEventListeners(): void {
  // FontAwesome download
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.id === 'fontAwesomeSVGDownload') {
      handleFontAwesomeDownload();
    }
  });

  // Icons8 download
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('.download-svg-ry')) {
      const button = target.closest('.download-svg-ry') as HTMLElement;
      handleIcons8Download(button);
    }
  });

  // IconScout download
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('.download-icon') || target.closest('.copyToClipboardIScout')) {
      const button = target.closest('.download-icon, .copyToClipboardIScout') as HTMLElement;
      handleIconScoutDownload(button);
    }
  });

  // Flaticon download
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('.btn-svg') || target.closest('.copysvg--button')) {
      const button = target.closest('.btn-svg, .copysvg--button') as HTMLElement;
      const isCopy = button.classList.contains('copysvg--button');
      handleFlaticonDownload(button, isCopy);
    }
  });

  // Icons8 modal observer
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('.app-grid-icon')) {
      const observer = new MutationObserver((mutations, obs) => {
        const downloadModalFooter = qs('.app-accordion2__main-buttons');
        const existingButton = qs('.download-svg-ry');

        if (downloadModalFooter && !existingButton) {
          downloadModalFooter.insertAdjacentHTML('afterbegin', ICONS8_DOWNLOAD_BUTTON);
          obs.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  });

  // General click handler
  document.addEventListener('click', () => {
    initFontAwesome();
  });
}

/**
 * Initialize mutation observer for user detection and UI updates
 */
function initObserver(): void {
  const observer = new MutationObserver(() => {
    activateButtons();

    // Detect Flaticon user
    const flaticonAvatar = qs('#gr_user_menu_avatar img');
    if (flaticonAvatar) {
      const alt = flaticonAvatar.getAttribute('alt');
      if (alt) {
        const userAccount = alt.replace(/^user/, '');
        USER.logged_in = true;
        USER.id = userAccount;
        USER.active_on = 'flaticon';
      }
    }

    // Detect Icons8 user
    const icons8Username = qs('.i8-header__login .username');
    if (icons8Username) {
      USER.logged_in = true;
      USER.id = icons8Username.textContent || '';
      USER.active_on = 'icons8';
    }

    // Detect IconScout user
    const iconscoutUsername = qs('.userProfile_UGnys h3');
    if (iconscoutUsername) {
      USER.logged_in = true;
      USER.id = iconscoutUsername.textContent || '';
      USER.active_on = 'iconscout';

      // Setup IconScout modal observer
      const iconScoutButtonObserver = new MutationObserver(() => {
        const modal = qs('#modalItemPreview');
        if (modal) {
          const button2 = qs<HTMLButtonElement>('button.btn.btn-primary.has-icon.w-100.btn-lg.action_H7qtc', modal);
          const button3 = qs<HTMLButtonElement>('button.btn.btn-primary.w-100.btn-lg.action_rM0Z2', modal);
          const newButton = document.createElement('button');
          newButton.type = 'button';
          newButton.className = 'btn btn-primary has-icon w-100 btn-lg download-icon';
          newButton.textContent = 'Download';

          if (button2 && !button2.classList.contains('download-icon')) {
            button2.replaceWith(newButton.cloneNode(true));
          }

          if (button3 && !button3.classList.contains('download-icon')) {
            button3.replaceWith(newButton.cloneNode(true));
          }
        }
      });

      iconScoutButtonObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  });

  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}

/**
 * Initialize the extension
 */
function init(): void {
  setupEventListeners();
  initObserver();
  initFontAwesome();

  if (window.location.href.startsWith('https://fontawesome.com/')) {
    initButtonFae();
  }
}

// Start the extension when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
