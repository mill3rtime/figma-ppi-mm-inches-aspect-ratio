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

    // Calculate diagonal using Pythagorean theorem
    const diagonalPx = Math.sqrt(width * width + height * height);
    const diagonalMm = ((diagonalPx / PPI) * 25.4).toFixed(2);
    const diagonalInches = (diagonalPx / PPI).toFixed(2);

    const aspectRatio = getAspectRatio(width, height);

    // Create text with dimensions
    const text = figma.createText();

    // Load font asynchronously
    figma.loadFontAsync({ family: "Inter", style: "Regular" }).then(() => {
      text.characters = `[${diagonalMm}mm (${diagonalInches}")] ${selection.name}\n${widthMm}mm (${widthInches}") × ${heightMm}mm (${heightInches}")\n${Math.round(width)}×${Math.round(height)} @ ${PPI} ppi`;
      text.fontSize = 14;

      // Add auto-layout to make text readable
      const frame = figma.createFrame();
      frame.name = "Dimensions Info";
      frame.appendChild(text);
      frame.resize(text.width + 20, text.height + 20);

      // Position the text 100px to the left and 100px above the selected object
      frame.x = selection.x - 100;
      frame.y = selection.y - 100;
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

      figma.closePlugin(`Dimensions displayed: [${diagonalMm}mm (${diagonalInches}")] ${Math.round(width)}×${Math.round(height)} @ ${PPI} ppi`);
    }).catch((error) => {
      // If Inter font is not available, try default font
      figma.loadFontAsync({ family: "Roboto", style: "Regular" }).then(() => {
        text.characters = `[${diagonalMm}mm (${diagonalInches}")] ${selection.name}\n${widthMm}mm (${widthInches}") × ${heightMm}mm (${heightInches}")\n${Math.round(width)}×${Math.round(height)} @ ${PPI} ppi`;
        text.fontSize = 14;

        const frame = figma.createFrame();
        frame.name = "Dimensions Info";
        frame.appendChild(text);
        frame.resize(text.width + 20, text.height + 20);
        frame.x = selection.x - 100;
        frame.y = selection.y - 100;
        frame.paddingLeft = 10;
        frame.paddingRight = 10;
        frame.paddingTop = 10;
        frame.paddingBottom = 10;
        frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
        frame.strokes = [{ type: "SOLID", color: { r: 0.8, g: 0.8, b: 0.8 } }];
        frame.strokeWeight = 1;
        text.x = 0;
        text.y = 0;

        figma.currentPage.selection = [frame];
        figma.viewport.scrollAndZoomIntoView([frame]);

        figma.closePlugin(`Dimensions displayed: [${diagonalMm}mm (${diagonalInches}")] ${Math.round(width)}×${Math.round(height)} @ ${PPI} ppi`);
      });
    });
  }
}
