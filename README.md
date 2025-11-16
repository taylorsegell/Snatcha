# Snatcha

**Upgrade your designs with our browser extension! Download premium SVG icons and stickers.**

Snatcha is a Chrome extension that unlocks premium icon downloads from popular design resource websites, allowing you to download SVG files, PNG images, and Lottie animations directly from Flaticon, IconScout, Icons8, and FontAwesome.

## Features

- **Multi-Platform Support**: Works seamlessly with:
  - [Flaticon](https://www.flaticon.com/)
  - [IconScout](https://iconscout.com/)
  - [Icons8](https://icons8.com/)
  - [FontAwesome](https://fontawesome.com/)

- **Multiple Download Formats**:
  - SVG files
  - PNG images
  - Lottie JSON animations
  - Direct clipboard copy

- **Premium Access**: Download premium icons without restrictions (requires login on respective platforms)

- **One-Click Downloads**: Simple, intuitive download buttons added directly to each platform's interface

- **FontAwesome CDN Generator**: Generate premium CDN links for FontAwesome icons

## Requirements

- Google Chrome (or Chromium-based browser)
- Active account on the icon platforms (Flaticon, IconScout, Icons8, or FontAwesome)

## Installation
---
### From Source

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked"
5. Select the Snatcha extension folder
6. The extension is now installed and ready to use!

## How to Use
---
1. **Login**: Sign in to your account on any supported platform (Flaticon, IconScout, Icons8, or FontAwesome)

2. **Browse Icons**: Navigate to any icon page on the supported platforms

3. **Download**: 
   - Look for the "Download SVG" or "Snatcha That SVG" button
   - Click to instantly download the icon in SVG format
   - For 3D icons on IconScout, PNG format will be downloaded automatically

4. **Copy to Clipboard**: Use the "Copy SVG" button to copy the SVG code directly to your clipboard

### Platform-Specific Features

#### FontAwesome
- **SVG Download**: Download any FontAwesome icon as SVG
- **CDN Link Generator**: Click the floating "Generate Premium Icon CDN Link" button to get a premium CDN link

#### Icons8
- **Modal Integration**: Download buttons appear in the icon preview modal
- **SVG Support**: Downloads SVG format when available

#### IconScout
- **Multi-Format Support**: Automatically detects and downloads:
  - SVG icons
  - Lottie animations (JSON)
  - 3D icons (PNG)

#### Flaticon
- **Direct SVG Download**: One-click SVG downloads
- **Copy to Clipboard**: Quick SVG code copying

## Project Structure

```bash
Snatcha/
├── manifest.json           # Extension configuration
├── README.md              # This file
├── icons/                 # Extension icons
│   ├── 32.png
│   ├── 48.png
│   ├── 128.png
│   └── 256.png
└── scripts/
    ├── snatcha-jquery.js   # jQuery library
    ├── snatcha-assets.js   # Icon assets
    ├── snatcha-snackbar.js # Notification system
    └── snatcha-main.js     # Main functionality
```

## Privacy & Security
---
- Snatcha operates entirely client-side
- No data is collected or transmitted to external servers
- Requires login on icon platforms to access premium content (standard platform authentication)
- Uses platform APIs to fetch icon data

## Important Notes
---
- You must be logged into the respective icon platform to download premium icons
- The extension respects each platform's terms of service
- Downloaded icons are subject to the licensing terms of their respective platforms
- Ensure you have appropriate rights/licenses to use downloaded icons in your projects

## Troubleshooting
---
**Download button not appearing?**
- Ensure you're logged into the platform
- Try refreshing the page
- Check that the extension is enabled in Chrome

**Download failed?**
- Verify your internet connection
- Confirm you have access to premium features on the platform
- Try reloading the page

**Icons8 download not working?**
- Make sure you've clicked on an icon to open the preview modal
- The download button appears after the modal fully loads

## License

This project is released under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## Support

If you encounter any issues or have questions, please file an issue on the project repository.

## Version History

- **v1.0.5** - Current version with multi-platform support

---

**Disclaimer**: This extension is designed to work with publicly available icon platforms.