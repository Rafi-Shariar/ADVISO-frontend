export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024

export const isAcceptedFileSize = (fileSize : number) => {
    return fileSize <= MAX_FILE_SIZE_BYTES
}