export function validateImageFile(
  file: File | null,
  allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  maxSizeMB = 2
): string | undefined {
  if (!file) return undefined; // No file, no error (optional field)

  if (!allowedTypes.includes(file.type)) {
    return "Only JPG, PNG, GIF, or WEBP images are allowed.";
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `Image must be less than ${maxSizeMB}MB.`;
  }
  return undefined; // No error
}
