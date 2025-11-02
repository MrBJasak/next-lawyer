export interface FileMetadata {
  eTag: string;
  size: number;
  mimetype: string;
  cacheControl: string;
  lastModified: string;
  contentLength: number;
  httpStatusCode: number;
}

export interface StorageFile {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: FileMetadata;
}

export type StorageFileList = StorageFile[];

export interface Certificate {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  publicUrl: string;
  display_order?: number;
  db_id?: string;
  metadata: {
    size: number;
    mimetype: string;
    contentLength: number;
  };
}

export const BUCKET_NAME = 'next-lawyer-images';
export const CERTIFICATES_BUCKET_NAME = 'next-lawyer-certificates';
