// Figma plugin to display dimensions in mm, inches, and aspect ratio at 160 PPI

const PPI = 160;

// Helper function to calculate GCD for aspect ratio simplification
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// Helper function to simplify aspect ratio
function getAspectRatio(width: number, height: number): string {
  const divisor = gcd(Math.round(width), Math.round(height));
  const w = Math.round(width) / divisor;
  const h = Math.round(height) / divisor;
  return `${w}:${h}`;
}

// Main plugin code
figma.showUI(__html__, { visible: false });

if (figma.currentPage.selection.length === 0) {
  figma.closePlugin("Please select a frame or rectangle first.");
} else if (figma.currentPage.selection.length > 1) {
  figma.closePlugin("Please select only one frame or rectangle.");
} else {
  const selection = figma.currentPage.selection[0];

  // Check if selection is a frame or rectangle
  if (selection.type !== "FRAME" && selection.type !== "RECTANGLE") {
    figma.closePlugin("Please select a frame or rectangle.");
  } else {
    const width = selection.width;
    const height = selection.height;

    // Calculate dimensions at 160 PPI
    const widthMm = ((width / PPI) * 25.4).toFixed(2);
    const heightMm = ((height / PPI) * 25.4).toFixed(2);
    const widthInches = (width / PPI).toFixed(2);
    const heightInches = (height / PPI).toFixed(2);
    const aspectRatio = getAspectRatio(width, height);

    // Create text with dimensions
    const text = figma.createText();

    // Load font asynchronously
    figma.loadFontAsync({ family: "Inter", style: "Regular" }).then(() => {
      text.characters = `Dimensions (${width}px × ${height}px)\n\nAt 160 PPI:\n• ${widthMm}mm × ${heightMm}mm\n• ${widthInches}" × ${heightInches}"\n• Aspect Ratio: ${aspectRatio}`;
      text.fontSize = 14;

      // Position the text to the right of the selected object
      text.x = selection.x + selection.width + 20;
      text.y = selection.y;

      // Add auto-layout to make text readable
      const frame = figma.createFrame();
      frame.name = "Dimensions Info";
      frame.appendChild(text);
      frame.resize(text.width + 20, text.height + 20);
      frame.x = selection.x + selection.width + 20;
      frame.y = selection.y;
      frame.paddingLeft = 10;
      frame.paddingRight = 10;
      frame.paddingTop = 10;
      frame.paddingBottom = 10;
      frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      frame.strokes = [{ type: "SOLID", color: { r: 0.8, g: 0.8, b: 0.8 } }];
      frame.strokeWeight = 1;

      // Reposition text to 0,0 since it's now in a frame
      text.x = 0;
      text.y = 0;

      figma.currentPage.selection = [frame];
      figma.viewport.scrollAndZoomIntoView([frame]);

      figma.closePlugin(`Dimensions displayed: ${widthMm}mm × ${heightMm}mm, ${widthInches}" × ${heightInches}", Aspect ratio: ${aspectRatio}`);
    }).catch((error) => {
      // If Inter font is not available, try default font
      figma.loadFontAsync({ family: "Roboto", style: "Regular" }).then(() => {
        text.characters = `Dimensions (${width}px × ${height}px)\n\nAt 160 PPI:\n• ${widthMm}mm × ${heightMm}mm\n• ${widthInches}" × ${heightInches}"\n• Aspect Ratio: ${aspectRatio}`;
        text.fontSize = 14;
        text.x = selection.x + selection.width + 20;
        text.y = selection.y;

        figma.currentPage.selection = [text];
        figma.viewport.scrollAndZoomIntoView([text]);

        figma.closePlugin(`Dimensions displayed: ${widthMm}mm × ${heightMm}mm, ${widthInches}" × ${heightInches}", Aspect ratio: ${aspectRatio}`);
      });
    });
  }
}
