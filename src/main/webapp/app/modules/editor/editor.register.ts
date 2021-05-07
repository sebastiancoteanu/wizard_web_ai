import { CSSProperties } from 'styled-components';

export const ACTION_TYPES = {
  SET_EDITING_BLOCK: 'editor/SET_EDITING_BLOCK',
  CHANGE_BLOCK_PROPS: 'editor/CHANGE_BLOCK_PROPS',
  RESET_EDITING_BLOCK: 'editor/RESET_EDITING_BLOCK',
};

export interface State {
  blockId: string;
  cssProps: CSSProperties;
}

const initialState: State = {
  blockId: '',
  cssProps: {
    fontSize: '200px',
    fontWeight: 300,
  },
};

export type EditorState = Readonly<typeof initialState>;

// Reducer
export default (state: EditorState = initialState, action): EditorState => {
  switch (action.type) {
    case ACTION_TYPES.SET_EDITING_BLOCK:
      return {
        ...state,
        blockId: action.blockId,
        cssProps: action.cssProps,
      };
    case ACTION_TYPES.CHANGE_BLOCK_PROPS:
      return {
        ...state,
        cssProps: {
          ...state.cssProps,
          ...action.cssProps,
        },
      };
    case ACTION_TYPES.RESET_EDITING_BLOCK:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Actions
export const setEditingBLock = (blockId: string, cssProps: CSSProperties) => ({
  type: ACTION_TYPES.SET_EDITING_BLOCK,
  blockId,
  cssProps,
});

export const changeBlockProps = (cssProps: CSSProperties) => ({
  type: ACTION_TYPES.CHANGE_BLOCK_PROPS,
  cssProps,
});

export const reset = () => ({
  type: ACTION_TYPES.RESET_EDITING_BLOCK,
});
