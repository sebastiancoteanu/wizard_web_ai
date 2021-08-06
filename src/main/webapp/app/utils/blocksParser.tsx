import { IBlock } from "app/shared/model/block.model";

interface IRawBlock extends Omit<IBlock, 'options'> {
  options: string;
}

const parseOptions = (options: IRawBlock['options']): IBlock['options'] => {
  try {
    return JSON.parse(options) as IBlock['options'];
  } catch (_) {
    return {};
  }
}

const parseBlock = (block: IRawBlock): IBlock => {
  const options = parseOptions(block.options);
  return {
    ...block as IBlock,
    options,
  }
}

export const parseBlocks = (blocks: IRawBlock[]): IBlock[] => blocks.map(parseBlock);