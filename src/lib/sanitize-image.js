/**
 * Client-side image sanitisation for dataset contributions.
 *
 * Policy implemented here (keep in step with /privacy and /data-license):
 *   - Every byte of embedded metadata is destroyed before upload.
 *   - The original filename is discarded.
 *
 * Method: re-encode the pixels through a canvas. That drops EXIF, XMP, IPTC
 * and maker notes unconditionally, in one step, with no library needed.
 * An allowlist applied to an EXIF writer is easy to get wrong, and GPS can
 * hide in XMP and maker notes as well as EXIF, so destroying everything and
 * keeping only what the contributor typed is the safer direction.
 *
 * Runs entirely in the browser. The original file never leaves the device.
 */

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_INPUT_BYTES = 10 * 1024 * 1024; // matches the 10 MB hint on the form
const MAX_EDGE_PX = 2048;                 // keeps files inside the storage quota
const JPEG_QUALITY = 0.92;

export async function sanitizeImage(input) {
  if (!ALLOWED_TYPES.includes(input.type)) {
    throw new Error(
      `Unsupported file type${input.type ? ` (${input.type})` : ''}. Use JPEG, PNG or WebP.`
    );
  }
  if (input.size > MAX_INPUT_BYTES) {
    throw new Error(
      `That file is ${(input.size / 1048576).toFixed(1)} MB. The limit is 10 MB.`
    );
  }

  const bitmap = await createImageBitmap(input);

  const scale = Math.min(1, MAX_EDGE_PX / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close?.();
    throw new Error('Your browser could not process this image.');
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Could not re-encode the image.'))),
      'image/jpeg',
      JPEG_QUALITY
    )
  );

  // Random name: the original filename can itself carry identifying detail.
  const name = `${crypto.randomUUID()}.jpg`;
  const file = new File([blob], name, {
    type: 'image/jpeg',
    lastModified: Date.now(),
  });

  return {
    file,
    width,
    height,
    sizeKb: Math.round(file.size / 1024),
  };
}
