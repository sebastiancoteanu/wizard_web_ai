import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPageDraft, defaultValue } from 'app/shared/model/page-draft.model';
import { IPage } from 'app/shared/model/page.model';

export const ACTION_TYPES = {
  SET_DRAFT_HAS_CHANGED: 'pageDraft/SET_DRAFT_HAS_CHANGED',
  FETCH_PAGEDRAFTS_BY_PAGE: 'pageDraft/FETCH_PAGEDRAFTS_BY_PAGE',
  FETCH_PAGEDRAFT_LIST: 'pageDraft/FETCH_PAGEDRAFT_LIST',
  FETCH_PAGEDRAFT: 'pageDraft/FETCH_PAGEDRAFT',
  CREATE_PAGEDRAFT: 'pageDraft/CREATE_PAGEDRAFT',
  UPDATE_PAGEDRAFT: 'pageDraft/UPDATE_PAGEDRAFT',
  DELETE_PAGEDRAFT: 'pageDraft/DELETE_PAGEDRAFT',
  RESET: 'pageDraft/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPageDraft>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  pageMappedEntities: {},
  draftHasChanged: false,
};

export type PageDraftState = Readonly<typeof initialState>;

// Reducer

export default (state: PageDraftState = initialState, action): PageDraftState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAGEDRAFTS_BY_PAGE):
    case REQUEST(ACTION_TYPES.FETCH_PAGEDRAFT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAGEDRAFT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PAGEDRAFT):
    case REQUEST(ACTION_TYPES.UPDATE_PAGEDRAFT):
    case REQUEST(ACTION_TYPES.DELETE_PAGEDRAFT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PAGEDRAFTS_BY_PAGE):
    case FAILURE(ACTION_TYPES.FETCH_PAGEDRAFT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAGEDRAFT):
    case FAILURE(ACTION_TYPES.CREATE_PAGEDRAFT):
    case FAILURE(ACTION_TYPES.UPDATE_PAGEDRAFT):
    case FAILURE(ACTION_TYPES.DELETE_PAGEDRAFT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAGEDRAFTS_BY_PAGE):
      if (action.payload.data.length) {
        return {
          ...state,
          loading: false,
          pageMappedEntities: {
            ...state.pageMappedEntities,
            [action.payload.data[0].pageId]: action.payload.data,
          },
        };
      }
      break;
    case SUCCESS(ACTION_TYPES.FETCH_PAGEDRAFT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAGEDRAFT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAGEDRAFT):
    case SUCCESS(ACTION_TYPES.UPDATE_PAGEDRAFT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAGEDRAFT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_DRAFT_HAS_CHANGED:
      return {
        ...state,
        draftHasChanged: action.payload,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/page-drafts';

// Actions
export const getPageDraftsByPageId = (pageId: IPage['id']) => ({
  type: ACTION_TYPES.FETCH_PAGEDRAFTS_BY_PAGE,
  payload: axios.get<IPageDraft>(`${apiUrl}/page/${pageId}?cacheBuster=${new Date().getTime()}`),
});

export const getEntities: ICrudGetAllAction<IPageDraft> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PAGEDRAFT_LIST,
  payload: axios.get<IPageDraft>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPageDraft> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAGEDRAFT,
    payload: axios.get<IPageDraft>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPageDraft> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAGEDRAFT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPageDraft> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAGEDRAFT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPageDraft> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAGEDRAFT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setDraftHasChanged = hasChanged => ({
  type: ACTION_TYPES.SET_DRAFT_HAS_CHANGED,
  payload: hasChanged,
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
