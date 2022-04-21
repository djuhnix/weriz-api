import { S3 } from 'aws-sdk';
import { AWS_ACCESS_KEY, AWS_ENDPOINT, AWS_REGION, AWS_SECRET_KEY } from './';

/**
 * Create a s3 client to be used later
 */
const createClient = () => {
  return new S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    endpoint: AWS_ENDPOINT,
    region: AWS_REGION,
    s3ForcePathStyle: true, // needed with minio?
    signatureVersion: 'v4',
  });
};

export default createClient;
