import { S3 } from 'aws-sdk';
import createClient from '@/config/s3';
import { File } from '@interfaces/file/file.interface';
import { AWS_BUCKET } from '@config';

/**
 * Service to handle AWS S3 request
 */
class S3Service {
  private client: S3;
  private readonly bucketName = AWS_BUCKET;

  constructor() {
    this.client = createClient();
  }

  /**
   * Upload a file to a bucket
   * @param file
   */
  async uploadFile(file: File): Promise<string> {
    const timestamp = Date.now();
    const fileKey = this.generateFileKey(file, timestamp);
    await this.client
      .putObject({
        Bucket: this.bucketName,
        Key: fileKey,
        ContentType: file.type,
        Body: file.content,
        // ACL: s3_config.defaultFilesACL, // handle later
      })
      .promise();

    return `${this.bucketName}/${fileKey}`;
  }

  // TODO getFiles (many and one)

  getFileStream(fileKey: string) {
    const fileStream = this.client
      .getObject({
        Bucket: this.bucketName,
        Key: fileKey,
      })
      .createReadStream();
    return fileStream;
  }

  /**
   * Generate a unique id for an uploaded file
   * @param file
   * @param timestamp
   */
  private generateFileKey = (file: File, timestamp: number): string => `${file.name}-${timestamp}.${file.extension}`;
}

export default S3Service;
