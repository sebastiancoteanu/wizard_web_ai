import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

// TODO: find wise alternative
const STORAGE_ACCOUNT_NAME = 'wizardwebaistorage';
const STORAGE_SAS_TOKEN =
  'sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2021-10-01T16:44:12Z&st=2021-08-19T08:44:12Z&spr=https&sig=knjLtB%2FPLiV%2BwtWM4NWX%2B81Ly8zpwq1jIy4ineybgNo%3D';
const CONTAINER_NAME = 'image-uploads';

let blobServiceClient: BlobServiceClient = null;
let containerClient: ContainerClient = null;

const initializeStorageService = () => {
  if (!blobServiceClient) {
    blobServiceClient = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${STORAGE_SAS_TOKEN}`);
    containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
  }
};

const uploadImageFile = async (imageFile: File) => {
  initializeStorageService();
  const result = await containerClient.uploadBlockBlob(imageFile.name + new Date().getTime(), imageFile, imageFile.size);
  return result.blockBlobClient.url;
};

export default {
  uploadImageFile,
};
