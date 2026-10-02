export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "image/png",
  "image/jpeg",
];
export const isAcceptedFileSize = (fileSize: number) => {
  return fileSize <= MAX_FILE_SIZE_BYTES;
};

export const isAcceptedFileType = (fileType: string) => {
  return ACCEPTED_FILE_TYPES.includes(fileType);
};
