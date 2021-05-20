import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPage, defaultValue } from 'app/shared/model/page.model';

export const ACTION_TYPES = {
  SET_PAGES: 'page/SET_PAGES',
  CREATE_LOCAL_PAGE: 'page/CREATE_LOCAL_PAGE',
  FETCH_PAGE_LIST: 'page/FETCH_PAGE_LIST',
  FETCH_PAGE: 'page/FETCH_PAGE',
  CREATE_PAGE: 'page/CREATE_PAGE',
  UPDATE_PAGE: 'page/UPDATE_PAGE',
  DELETE_PAGE: 'page/DELETE_PAGE',
  RESET: 'page/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PageState = Readonly<typeof initialState>;

// Reducer

export default (state: PageState = initialState, action): PageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PAGE):
    case REQUEST(ACTION_TYPES.UPDATE_PAGE):
    case REQUEST(ACTION_TYPES.DELETE_PAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAGE):
    case FAILURE(ACTION_TYPES.CREATE_PAGE):
    case FAILURE(ACTION_TYPES.UPDATE_PAGE):
    case FAILURE(ACTION_TYPES.DELETE_PAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case ACTION_TYPES.CREATE_LOCAL_PAGE:
      return {
        ...state,
        entities: [...state.entities, action.payload],
      };
    case ACTION_TYPES.SET_PAGES:
      return {
        ...state,
        entities: action.payload,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_PAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAGE):
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
    default:
      return state;
  }
};

const apiUrl = 'api/pages';

// Actions

export const getEntities: ICrudGetAllAction<IPage> = (websiteId?: number) => ({
  type: ACTION_TYPES.FETCH_PAGE_LIST,
  payload: axios.get<IPage>(`${apiUrl}?cacheBuster=${new Date().getTime()}`, {
    params: {
      websiteId,
    },
  }),
});

export const getEntity: ICrudGetAction<IPage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAGE,
    payload: axios.get<IPage>(requestUrl),
  };
};

export const createLocalPage = (page: IPage) => ({
  type: ACTION_TYPES.CREATE_LOCAL_PAGE,
  payload: page,
});

export const setPages = (pages: IPage[]) => ({
  type: ACTION_TYPES.SET_PAGES,
  payload: pages,
});

export const createEntity: ICrudPutAction<IPage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAGE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });

  dispatch(getEntities(entity.websiteId));
  return result;
};

export const updateEntity: ICrudPutAction<IPage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAGE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAGE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
