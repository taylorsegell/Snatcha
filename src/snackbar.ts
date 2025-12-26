/**
 * Modern TypeScript implementation of Snackbar notifications
 * Replaces the deprecated minified library
 */

interface SnackbarOptions {
  text?: string;
  textColor?: string;
  width?: string;
  showAction?: boolean;
  actionText?: string;
  actionTextAria?: string;
  alertScreenReader?: boolean;
  actionTextColor?: string;
  showSecondButton?: boolean;
  secondButtonText?: string;
  secondButtonAria?: string;
  secondButtonTextColor?: string;
  backgroundColor?: string;
  pos?: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right';
  duration?: number;
  customClass?: string;
  onActionClick?: (element: HTMLDivElement) => void;
  onSecondButtonClick?: (element: HTMLDivElement) => void;
  onClose?: (element: HTMLDivElement) => void;
}

class SnackbarManager {
  private current: HTMLDivElement | null = null;

  private readonly defaults: Required<SnackbarOptions> = {
    text: 'Default Text',
    textColor: '#FFFFFF',
    width: 'auto',
    showAction: true,
    actionText: 'Dismiss',
    actionTextAria: 'Dismiss, Description for Screen Readers',
    alertScreenReader: false,
    actionTextColor: '#4CAF50',
    showSecondButton: false,
    secondButtonText: '',
    secondButtonAria: 'Description for Screen Readers',
    secondButtonTextColor: '#4CAF50',
    backgroundColor: '#323232',
    pos: 'bottom-left',
    duration: 5000,
    customClass: '',
    onActionClick: (element: HTMLDivElement) => {
      element.style.opacity = '0';
    },
    onSecondButtonClick: () => {},
    onClose: () => {},
  };

  show(userOptions: SnackbarOptions = {}): void {
    const options = { ...this.defaults, ...userOptions };

    // Remove current snackbar if exists
    if (this.current) {
      this.current.style.opacity = '0';
      setTimeout(() => {
        const parent = this.current?.parentElement;
        if (parent && this.current) {
          parent.removeChild(this.current);
        }
      }, 500);
    }

    // Create snackbar container
    const snackbar = document.createElement('div');
    snackbar.className = `snackbar-container ${options.customClass}`;
    snackbar.style.width = options.width;
    snackbar.style.backgroundColor = options.backgroundColor;

    // Create text element
    const text = document.createElement('p');
    text.style.margin = '0';
    text.style.padding = '0';
    text.style.color = options.textColor;
    text.style.fontSize = '14px';
    text.style.fontWeight = '300';
    text.style.lineHeight = '1em';
    text.innerHTML = options.text;
    snackbar.appendChild(text);

    // Add second button if enabled
    if (options.showSecondButton) {
      const secondButton = document.createElement('button');
      secondButton.className = 'action';
      secondButton.innerHTML = options.secondButtonText;
      secondButton.setAttribute('aria-label', options.secondButtonAria);
      secondButton.style.color = options.secondButtonTextColor;
      secondButton.addEventListener('click', () => {
        options.onSecondButtonClick(snackbar);
      });
      snackbar.appendChild(secondButton);
    }

    // Add action button if enabled
    if (options.showAction) {
      const actionButton = document.createElement('button');
      actionButton.className = 'action';
      actionButton.innerHTML = options.actionText;
      actionButton.setAttribute('aria-label', options.actionTextAria);
      actionButton.style.color = options.actionTextColor;
      actionButton.addEventListener('click', () => {
        options.onActionClick(snackbar);
      });
      snackbar.appendChild(actionButton);
    }

    // Set duration timeout
    if (options.duration) {
      setTimeout(() => {
        if (this.current === snackbar) {
          snackbar.style.opacity = '0';
          snackbar.style.top = '-100px';
          snackbar.style.bottom = '-100px';
        }
      }, options.duration);
    }

    // Add screen reader support
    if (options.alertScreenReader) {
      snackbar.setAttribute('role', 'alert');
    }

    // Handle transition end
    snackbar.addEventListener('transitionend', (event: TransitionEvent) => {
      if (event.propertyName === 'opacity' && snackbar.style.opacity === '0') {
        options.onClose(snackbar);
        const parent = snackbar.parentElement;
        if (parent) {
          parent.removeChild(snackbar);
        }
        if (this.current === snackbar) {
          this.current = null;
        }
      }
    });

    this.current = snackbar;
    document.body.appendChild(snackbar);

    // Trigger reflow to enable transition
    void snackbar.offsetHeight;

    // Show snackbar
    snackbar.style.opacity = '1';
    snackbar.className = `snackbar-container ${options.customClass} snackbar-pos ${options.pos}`;
  }

  close(): void {
    if (this.current) {
      this.current.style.opacity = '0';
    }
  }
}

// Export singleton instance
export const Snackbar = new SnackbarManager();
