import { IBlock } from "app/shared/model/block.model";
import generateId from "app/utils/generateId";

export const reorder = (list: ReadonlyArray<IBlock>, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const copy = (source: IBlock[], destination: ReadonlyArray<IBlock>, sourceIndex, destinationIndex) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[sourceIndex];

  destClone.splice(destinationIndex, 0, { ...item, id: generateId() });
  return destClone;
};