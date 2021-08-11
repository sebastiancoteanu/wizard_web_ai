import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';
import { ContentModeratorClient } from '@azure/cognitiveservices-contentmoderator';
import {
  ImageModerationEvaluateUrlInputResponse,
  Screen,
  TextModerationScreenTextResponse,
} from '@azure/cognitiveservices-contentmoderator/esm/models';
import { ContentClassificationCategories } from 'app/utils/types';
import { IBlock } from 'app/shared/model/block.model';
import { BlockType } from 'app/shared/model/enumerations/block-type.model';

// TODO: find wise alternative
const CONTENT_MODERATOR_KEY = 'daba7141eea043cc97b946420c54b62c';
const CONTENT_MODERATOR_ENDPOINT = 'https://wizardwebaimoderator.cognitiveservices.azure.com/';
const TEXT_CONTENT_TYPE = 'text/plain';
const CATEGORY_THRESHOLD = 0.9;
const CONTENT_MODERATOR_DELAY = 2000;

let contentModeratorClient: ContentModeratorClient = null;

/**
 *
 * @param classification
 *
 * category 1 -> sexually explicit or adult in certain situations.
 * category 2 -> sexually suggestive or mature in certain situations.
 * category 3 -> offensive in certain situations.
 */

const textClassificationCheck = (classification: Screen['classification']): string[] => {
  const warnings = new Set<string>();

  if (!classification) {
    return Array.from(warnings);
  }

  if (classification.category1.score > CATEGORY_THRESHOLD) {
    warnings.add(ContentClassificationCategories.SEXUALLY_EXPLICIT);
  }

  if (classification.category2.score > CATEGORY_THRESHOLD) {
    warnings.add(ContentClassificationCategories.SEXUALLY_SUGGESTIVE);
  }

  if (classification.category3.score > CATEGORY_THRESHOLD) {
    warnings.add(ContentClassificationCategories.OFFENSIVE);
  }

  return Array.from(warnings);
};

const imageClassificationCheck = (responses: ImageModerationEvaluateUrlInputResponse[]): string[] => {
  const warnings = new Set<string>();

  responses.forEach(response => {
    if (response.isImageAdultClassified) {
      warnings.add(ContentClassificationCategories.SEXUALLY_EXPLICIT);
    }

    if (response.isImageRacyClassified) {
      warnings.add(ContentClassificationCategories.SEXUALLY_SUGGESTIVE);
    }
  });

  return Array.from(warnings);
};

const sleep = (multiplier = 0) => {
  return new Promise(resolve => setTimeout(resolve, CONTENT_MODERATOR_DELAY * (multiplier + 1)));
};

const initializeCognitiveService = () => {
  if (!contentModeratorClient) {
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(CONTENT_MODERATOR_KEY);
    contentModeratorClient = new ContentModeratorClient(cognitiveServiceCredentials, CONTENT_MODERATOR_ENDPOINT);
  }
};

const contentCompressBlockFilter = (block: IBlock, blockTypes: BlockType[]) => {
  return blockTypes.some(testedType => testedType === block.type) && block.options?.content.length;
};

const getCompressedTextBlocks = (blocks: IBlock[]): string =>
  blocks
    .filter(block => contentCompressBlockFilter(block, [BlockType.HEADER, BlockType.PARAGRAPH]))
    .map(block => block.options.content[0].value)
    .join('. ');

const getCompressedImageBlocks = (blocks: IBlock[]): string[] =>
  blocks
    .filter(block => contentCompressBlockFilter(block, [BlockType.IMAGE, BlockType.THREE_IMAGE_LIST]))
    .reduce((currentImageList, currentBlock) => {
      return currentImageList.concat(
        ...currentBlock.options.content.filter(contentItem => contentItem?.value).map(contentItem => contentItem.value)
      );
    }, []);

const textModeration = async (text: string) => {
  const result: TextModerationScreenTextResponse = await contentModeratorClient.textModeration.screenText(TEXT_CONTENT_TYPE, text, {
    classify: true,
  });

  return textClassificationCheck(result.classification);
};

const lazyUrlEvaluate = async (imageUrl: string, imageIdx: number) => {
  await sleep(imageIdx);
  return contentModeratorClient.imageModeration.evaluateUrlInput('application/json', {
    dataRepresentation: 'URL',
    value: imageUrl,
  });
};

const imageModeration = async (imageList: string[]) => {
  const result = await Promise.all(imageList.map(lazyUrlEvaluate));

  return imageClassificationCheck(result);
};

const imageTextEvaluation = async (text, imageSrcList) => {
  let textModerationWarnings = [];
  let imageModerationWarnings = [];

  initializeCognitiveService();

  if (text) {
    textModerationWarnings = await textModeration(text);
    await sleep();
  }

  if (imageSrcList.length) {
    imageModerationWarnings = await imageModeration(imageSrcList);
  }

  return {
    textModerationWarnings,
    imageModerationWarnings,
  };
};

const getCompressedBlockContent = (blocks: IBlock[]) => {
  const text = getCompressedTextBlocks(blocks);
  const imageSrcList = getCompressedImageBlocks(blocks);

  return {
    text,
    imageSrcList,
  };
};

export default {
  imageTextEvaluation,
  getCompressedBlockContent,
};
