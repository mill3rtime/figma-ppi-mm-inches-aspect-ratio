# Figma Dimensions Display Plugin

A Figma plugin that displays dimensions in millimeters, inches, and aspect ratio based on a 160 PPI (pixels per inch) standard.

## Features

- Select any frame or rectangle in Figma
- Automatically generates a text frame to the left of your selection showing:
  - Diagonal size in millimeters and inches at 160 PPI
  - Frame name
  - Dimensions in millimeters and inches (to 2 decimal places) at 160 PPI
  - Pixel dimensions at 160 PPI

## Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to compile TypeScript to JavaScript
4. In Figma, go to Plugins > Development > Import plugin from manifest
5. Select the `manifest.json` file from this directory

## Usage

1. Select a frame or rectangle in your Figma document
2. Run the plugin from Plugins > Development > Dimensions Display (PPI/MM/Aspect Ratio)
3. A text frame will appear to the left of your selection showing all calculated dimensions

## Calculations

- **Millimeters**: `(pixels / 160) × 25.4`
- **Inches**: `pixels / 160`
- **Diagonal**: `sqrt(width² + height²)` in pixels, then converted to mm and inches

## Example Output

For a 1920px × 1080px frame named "Hero Image":
```
[349.70mm (13.77")] Hero Image
304.80mm (12.00") × 171.45mm (6.75")
1920×1080 @ 160 ppi
```

## Development

- `code.ts` - Main plugin logic
- `manifest.json` - Plugin configuration
- `ui.html` - Minimal UI file (hidden during execution)

## License

MIT
