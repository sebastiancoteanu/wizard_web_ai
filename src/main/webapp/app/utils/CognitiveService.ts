import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';
import { ContentModeratorClient } from '@azure/cognitiveservices-contentmoderator';
import { Screen, TextModerationScreenTextResponse } from '@azure/cognitiveservices-contentmoderator/esm/models';
import { TextClassificationCategories } from 'app/utils/types';
import { IBlock } from 'app/shared/model/block.model';
import { BlockType } from 'app/shared/model/enumerations/block-type.model';

const TEXT_CONTENT_TYPE = 'text/plain';
const CATEGORY_THRESHOLD = 0.9;

let cognitiveServiceCredentials = null;
let contentModeratorClient = null;

/**
 *
 * @param classification
 *
 * category 1 -> sexually explicit or adult in certain situations.
 * category 2 -> sexually suggestive or mature in certain situations.
 * category 3 -> offensive in certain situations.
 */

const textClassificationCheck = (classification: Screen['classification']): string[] => {
  const warnings = [];

  if (!classification) {
    return warnings;
  }

  if (classification.category1.score > CATEGORY_THRESHOLD) {
    warnings.push(TextClassificationCategories.SEXUALLY_EXPLICIT);
  }

  if (classification.category2.score > CATEGORY_THRESHOLD) {
    warnings.push(TextClassificationCategories.SEXUALLY_SUGGESTIVE);
  }

  if (classification.category3.score > CATEGORY_THRESHOLD) {
    warnings.push(TextClassificationCategories.OFFENSIVE);
  }

  return warnings;
};

const textBlockCompressFilter = (block: IBlock) =>
  (block.type === BlockType.PARAGRAPH || block.type === BlockType.HEADER) && block.options?.content.length;

const compressTextBlocks = (blocks: IBlock[]): string =>
  blocks
    .filter(textBlockCompressFilter)
    .map(block => block.options.content[0])
    .join('. ');

const textModeration = async (text: string) => {
  // TODO: find wise alternative
  const contentModeratorKey = 'daba7141eea043cc97b946420c54b62c';
  const contentModeratorEndPoint = 'https://wizardwebaimoderator.cognitiveservices.azure.com/';

  if (!cognitiveServiceCredentials) {
    cognitiveServiceCredentials = new CognitiveServicesCredentials(contentModeratorKey);
  }

  if (!contentModeratorClient) {
    contentModeratorClient = new ContentModeratorClient(cognitiveServiceCredentials, contentModeratorEndPoint);
  }

  const result: TextModerationScreenTextResponse = await contentModeratorClient.textModeration.screenText(TEXT_CONTENT_TYPE, text, {
    classify: true,
  });

  const classificationCheckResult = textClassificationCheck(result.classification);

  console.log('classificationCheckResult', classificationCheckResult);

  return classificationCheckResult;
};

export default {
  textModeration,
  compressTextBlocks,
};
