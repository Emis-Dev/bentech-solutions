const fs = require('fs');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const jpegData = fs.readFileSync('assets/logo.jpeg');
const rawImageData = jpeg.decode(jpegData, { useTolerantUnknown: true });

const width = rawImageData.width;
const height = rawImageData.height;

const png = new PNG({ width, height });

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    const r = rawImageData.data[idx];
    const g = rawImageData.data[idx + 1];
    const b = rawImageData.data[idx + 2];

    png.data[idx] = r;
    png.data[idx + 1] = g;
    png.data[idx + 2] = b;

    // Check if pixel is outer white background OR inner dark navy background
    const isWhiteBg = (r > 240 && g > 240 && b > 240);
    const isDarkNavyBg = (r < 25 && g < 32 && b < 50);

    if (isWhiteBg || isDarkNavyBg) {
      png.data[idx + 3] = 0; // Transparent
    } else {
      png.data[idx + 3] = 255; // Keep original logo artwork (Green bulb/gear/arrows + White BenTech + Green Solutions)
    }
  }
}

const buffer = PNG.sync.write(png);
fs.writeFileSync('assets/logo.png', buffer);
console.log(`Saved transparent logo.png (${width}x${height}, ${buffer.length} bytes)`);
