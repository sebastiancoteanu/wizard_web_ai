import { IBlock } from "app/shared/model/block.model";
import { useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";

type ReturnData = IBlock | undefined;

type Hook = () => IBlock | ReturnData;

const useCurrentEditingBlock: Hook = () => {
  return useSelector<IRootState, ReturnData>(state => {
    if (state.block.editingBlockId) {
      return state.block.entities.find((block) => block.id === state.block.editingBlockId);
    }
  });
};

export default useCurrentEditingBlock;
