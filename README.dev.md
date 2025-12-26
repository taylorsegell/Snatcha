# Snatcha - Development Guide

## Modern Stack

This extension has been modernized with:

- **TypeScript**: Full type safety
- **Vite**: Fast build tooling and bundler
- **ES6 Modules**: Proper module system
- **Modern APIs**: Clipboard API instead of deprecated execCommand
- **No jQuery**: Pure vanilla JavaScript/TypeScript
- **CSS Files**: Extracted from inline strings
- **Build Process**: Automated bundling and optimization

## Project Structure

```
Snatcha/
├── src/                    # Source TypeScript files
│   ├── content.ts         # Main content script
│   ├── snackbar.ts        # Snackbar notification system
│   ├── assets.ts          # SVG and HTML assets
│   ├── utils.ts           # Utility functions
│   ├── types.ts           # TypeScript type definitions
│   └── styles.css         # Stylesheet
├── dist/                  # Build output (git-ignored)
├── icons/                 # Extension icons
├── manifest.json          # Extension manifest
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite bundler configuration
└── .eslintrc.json         # ESLint configuration
```

## Development

### Install Dependencies

```bash
npm install
```

### Build for Development (with watch mode)

```bash
npm run dev
```

This watches for file changes and rebuilds automatically.

### Build for Production

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Clean Build Output

```bash
npm run clean
```

## Loading the Extension

1. Run `npm run build` to create the `dist` folder
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `dist` folder

## Key Improvements

### 1. Removed jQuery (~85KB saved)
All jQuery calls have been replaced with modern vanilla JavaScript:
- `$(selector)` → `document.querySelector()`
- `$.ajax()` → `fetch()`
- DOM manipulation uses native methods

### 2. Modern Clipboard API
Replaced deprecated `document.execCommand('copy')` with:
- `navigator.clipboard.writeText()` (modern)
- Fallback for older browsers

### 3. TypeScript Benefits
- Type safety catches errors at compile time
- Better IDE autocomplete
- Self-documenting code with interfaces

### 4. Module System
- Proper ES6 imports/exports
- Code splitting capabilities
- Better dependency management

### 5. Build Optimization
- Tree shaking removes unused code
- Minification reduces bundle size
- Source maps for debugging

## Manifest V3 Compliance

- Updated to use single bundled content script
- Proper host permissions declared
- Removed `all_frames: true` (security improvement)
- Storage permission for future enhancements

## Browser Compatibility

- Chrome/Chromium based browsers (primary target)
- Modern browser APIs (ES2020)
- Clipboard API with fallback support

## Development Tips

1. **Hot Reload**: Use `npm run dev` for automatic rebuilds
2. **Type Checking**: Run `npm run type-check` before committing
3. **Debugging**: Source maps are enabled in development mode
4. **Extension Reload**: Use the reload button in `chrome://extensions/` after rebuilding

## Migration from Old Code

Old files in `scripts/` directory are now deprecated:
- `snatcha-jquery.js` - Removed (jQuery eliminated)
- `snatcha-assets.js` → `src/assets.ts`
- `snatcha-snackbar.js` → `src/snackbar.ts`
- `snatcha-main.js` → `src/content.ts` + `src/utils.ts`

The old files can be safely deleted after verifying the build works.

## Future Enhancements

Potential improvements:
- Add background service worker for advanced features
- Implement settings page with storage API
- Add download history tracking
- Support for more icon websites
- Automated testing with Jest/Vitest
- GitHub Actions for CI/CD
