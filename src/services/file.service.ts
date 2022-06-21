import { UploadedFile } from '@interfaces/file/uploaded.interface';
import { File } from '@interfaces/file/file.interface';
import S3Service from '@services/aws/s3.service';

class FileService {
  private s3Service = new S3Service();

  // another method to upload file
  // with the ability to link it to a community

  public async uploadInBucket(files: File | File[]): Promise<UploadedFile | UploadedFile[] | undefined> {
    try {
      if (Array.isArray(files)) {
        const paths = await Promise.all(files.map(async file => this.s3Service.uploadFile(file)));
        return paths.map(path => ({ path }));
      }

      const path = await this.s3Service.uploadFile(files);

      // TODO append path to database

      return {
        path,
      };
    } catch {
      return undefined;
    }
  }
}

export default FileService;
