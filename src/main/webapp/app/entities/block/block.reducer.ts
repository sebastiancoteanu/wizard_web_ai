import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBlock, defaultValue, IBlockOptions } from 'app/shared/model/block.model';
import { deepDuplicate, reorder } from 'app/utils/blockManipulation';
import { IPageDraft } from 'app/shared/model/page-draft.model';
import { setDraftHasChanged } from 'app/entities/page-draft/page-draft.reducer';
import { parseBlocks } from 'app/utils/blocksParser';

export const ACTION_TYPES = {
  SET_UPDATING: 'block/SET_UPDATING',
  SET_PAGE_BLOCKS: 'block/SET_PAGE_BLOCKS',
  SET_EDITING_PAGE_BLOCK: 'block/SET_EDITING_PAGE_BLOCK',
  UPDATE_PAGE_BLOCKS: 'block/UPDATE_PAGE_BLOCKS',
  UPDATE_EDITING_PAGE_BLOCK_CSS: 'block/UPDATE_EDITING_PAGE_BLOCK_CSS',
  UPDATE_EDITING_PAGE_BLOCK_CONTENT: 'block/UPDATE_EDITING_PAGE_BLOCK_CONTENT',
  MOVE_PAGE_BLOCK_ONE_POSITION: 'block/MOVE_PAGE_BLOCK_ONE_POSITION',
  DUPLICATE_PAGE_BLOCK: 'block/DUPLICATE_PAGE_BLOCK',
  DELETE_PAGE_BLOCK: 'block/DELETE_PAGE_BLOCK',
  FETCH_BLOCK_LIST: 'block/FETCH_BLOCK_LIST',
  FETCH_BLOCK: 'block/FETCH_BLOCK',
  CREATE_BLOCK: 'block/CREATE_BLOCK',
  UPDATE_BLOCK: 'block/UPDATE_BLOCK',
  DELETE_BLOCK: 'block/DELETE_BLOCK',
  RESET: 'block/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBlock>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  editingBlockId: null,
};

export type BlockState = Readonly<typeof initialState>;

// Reducer

export default (state: BlockState = initialState, action): BlockState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BLOCK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BLOCK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BLOCK):
    case REQUEST(ACTION_TYPES.UPDATE_BLOCK):
    case REQUEST(ACTION_TYPES.UPDATE_PAGE_BLOCKS):
    case REQUEST(ACTION_TYPES.DELETE_BLOCK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BLOCK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BLOCK):
    case FAILURE(ACTION_TYPES.CREATE_BLOCK):
    case FAILURE(ACTION_TYPES.UPDATE_BLOCK):
    case FAILURE(ACTION_TYPES.UPDATE_PAGE_BLOCKS):
    case FAILURE(ACTION_TYPES.DELETE_BLOCK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BLOCK_LIST):
      return {
        ...state,
        loading: false,
        entities: parseBlocks(action.payload.data),
      };
    case SUCCESS(ACTION_TYPES.FETCH_BLOCK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BLOCK):
    case SUCCESS(ACTION_TYPES.UPDATE_BLOCK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.UPDATE_PAGE_BLOCKS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BLOCK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    case ACTION_TYPES.SET_PAGE_BLOCKS:
      return {
        ...state,
        entities: action.payload,
      };
    case ACTION_TYPES.DELETE_PAGE_BLOCK:
      return {
        ...state,
        editingBlockId: state.editingBlockId === state.entities[action.payload].id ? null : state.editingBlockId,
        entities: state.entities.filter((_, index) => index !== action.payload),
      };
    case ACTION_TYPES.MOVE_PAGE_BLOCK_ONE_POSITION:
      return {
        ...state,
        entities: reorder(state.entities, action.payload.startIndex, action.payload.endIndex),
      };
    case ACTION_TYPES.DUPLICATE_PAGE_BLOCK:
      return {
        ...state,
        entities: deepDuplicate(state.entities, action.payload),
      };
    case ACTION_TYPES.SET_EDITING_PAGE_BLOCK:
      return {
        ...state,
        editingBlockId: action.payload,
      };
    case ACTION_TYPES.UPDATE_EDITING_PAGE_BLOCK_CSS:
      return {
        ...state,
        entities: state.entities.map(block =>
          block.id === state.editingBlockId
            ? {
                ...block,
                options: {
                  ...block?.options,
                  cssProperties: {
                    ...block?.options?.cssProperties,
                    ...action.payload,
                  },
                },
              }
            : block
        ),
      };
    case ACTION_TYPES.UPDATE_EDITING_PAGE_BLOCK_CONTENT:
      return {
        ...state,
        entities: state.entities.map(block =>
          block.id === state.editingBlockId
            ? {
                ...block,
                options: {
                  ...block?.options,
                  content: action.payload,
                },
              }
            : block
        ),
      };
    case ACTION_TYPES.SET_UPDATING:
      return {
        ...state,
        updating: action.payload,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/blocks';

// Actions
export const setUpdating = (isUpdating: boolean) => ({
  type: ACTION_TYPES.SET_UPDATING,
  payload: isUpdating,
});

export const getEntities: ICrudGetAllAction<IBlock> = (pageDraftId: IPageDraft['id']) => ({
  type: ACTION_TYPES.FETCH_BLOCK_LIST,
  payload: axios.get<IBlock>(`${apiUrl}?cacheBuster=${new Date().getTime()}`, {
    params: {
      pageDraftId,
    },
  }),
});

export const setPageBlocks = (blocks: IBlock[]) => dispatch => {
  dispatch({
    type: ACTION_TYPES.SET_PAGE_BLOCKS,
    payload: blocks,
  });
  dispatch(setDraftHasChanged(true));
};

export const deletePageBlock = index => dispatch => {
  dispatch({
    type: ACTION_TYPES.DELETE_PAGE_BLOCK,
    payload: index,
  });
  dispatch(setDraftHasChanged(true));
};

export const moveBlockOnePosition = (startIndex: number, endIndex: number) => dispatch => {
  dispatch({
    type: ACTION_TYPES.MOVE_PAGE_BLOCK_ONE_POSITION,
    payload: {
      startIndex,
      endIndex,
    },
  });
  dispatch(setDraftHasChanged(true));
};

export const duplicateBlock = index => dispatch => {
  dispatch({
    type: ACTION_TYPES.DUPLICATE_PAGE_BLOCK,
    payload: index,
  });
  dispatch(setDraftHasChanged(true));
};

export const setEditingPageBlock = id => ({
  type: ACTION_TYPES.SET_EDITING_PAGE_BLOCK,
  payload: id,
});

export const updateEditingPageBlockCss = (cssProperties: IBlockOptions['cssProperties']) => dispatch => {
  dispatch({
    type: ACTION_TYPES.UPDATE_EDITING_PAGE_BLOCK_CSS,
    payload: cssProperties,
  });
  dispatch(setDraftHasChanged(true));
};

export const updateEditingPageBlockContent = (content: IBlockOptions['content']) => dispatch => {
  dispatch({
    type: ACTION_TYPES.UPDATE_EDITING_PAGE_BLOCK_CONTENT,
    payload: content,
  });
  dispatch(setDraftHasChanged(true));
};

export const getEntity: ICrudGetAction<IBlock> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BLOCK,
    payload: axios.get<IBlock>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBlock> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BLOCK,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBlock> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BLOCK,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateAllEntities: ICrudPutAction<IBlock[]> = entities => async dispatch => {
  const refinedBlocks = entities.map(entity =>
    cleanEntity({
      ...entity,
      options: JSON.stringify(entity.options),
    })
  );

  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAGE_BLOCKS,
    payload: axios.put(`${apiUrl}/all`, {
      list: refinedBlocks,
    }),
  });

  await dispatch(setDraftHasChanged(false));
  await dispatch(getEntities(entities[0].pageDraftId));

  return result;
};

export const deleteEntity: ICrudDeleteAction<IBlock> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BLOCK,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
