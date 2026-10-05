/** Free-tier friendly upload limits for the portal */

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

export function formatMaxUpload() {
  return `${MAX_UPLOAD_BYTES / (1024 * 1024)} MB`;
}

export function assertUploadSize(file: { size: number }) {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(
      `File is too large. Maximum size is ${formatMaxUpload()} (free storage limit).`,
    );
  }
}
