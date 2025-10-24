# Figma Dimensions Display Plugin

A Figma plugin that displays dimensions in millimeters, inches, and aspect ratio based on a 160 PPI (pixels per inch) standard.

## Features

- Select any frame or rectangle in Figma
- Automatically generates a text frame showing:
  - Original pixel dimensions
  - Dimensions in millimeters at 160 PPI
  - Dimensions in inches (to 2 decimal places) at 160 PPI
  - Simplified aspect ratio

## Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to compile TypeScript to JavaScript
4. In Figma, go to Plugins > Development > Import plugin from manifest
5. Select the `manifest.json` file from this directory

## Usage

1. Select a frame or rectangle in your Figma document
2. Run the plugin from Plugins > Development > Dimensions Display (PPI/MM/Aspect Ratio)
3. A text frame will appear next to your selection showing all calculated dimensions

## Calculations

- **Millimeters**: `(pixels / 160) × 25.4`
- **Inches**: `pixels / 160`
- **Aspect Ratio**: Simplified width:height ratio (e.g., 16:9, 4:3)

## Example Output

For a 1920px × 1080px frame:
```
Dimensions (1920px × 1080px)

At 160 PPI:
• 304.80mm × 171.45mm
• 12.00" × 6.75"
• Aspect Ratio: 16:9
```

## Development

- `code.ts` - Main plugin logic
- `manifest.json` - Plugin configuration
- `ui.html` - Minimal UI file (hidden during execution)

## License

MIT
