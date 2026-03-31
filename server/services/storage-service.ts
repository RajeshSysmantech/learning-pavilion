export function validateUpload(input: { mimeType: string; size: number }) {
  const allowed = ["image/png", "image/jpeg", "image/webp", "application/pdf"];
  if (!allowed.includes(input.mimeType)) {
    throw new Error("Unsupported file type");
  }
  if (input.size > 5 * 1024 * 1024) {
    throw new Error("File too large");
  }
  return true;
}
