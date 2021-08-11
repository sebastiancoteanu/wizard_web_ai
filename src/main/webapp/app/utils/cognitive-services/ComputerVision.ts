import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';

// TODO: find wise alternative
const COMPUTER_VISION_KEY = '1789580e88bd4e93b4ebc39e7c8838fb';
const COMPUTER_VISION_ENDPOINT = 'https://wizardwebaicomputervision.cognitiveservices.azure.com/';

let computerVisionClient: ComputerVisionClient = null;

const initializeCognitiveService = () => {
  if (!computerVisionClient) {
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(COMPUTER_VISION_KEY);
    computerVisionClient = new ComputerVisionClient(cognitiveServiceCredentials, COMPUTER_VISION_ENDPOINT);
  }
};

const analyzeImage = async (imageSrc: string) => {
  let description = '';

  if (!imageSrc) {
    return description;
  }

  initializeCognitiveService();

  const result = await computerVisionClient.describeImage(imageSrc, {
    maxCandidates: 5,
    language: 'en',
  });

  if (result) {
    description = result.captions[0].text;
  }

  return description;
};

export default {
  analyzeImage,
};
