import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, IPayloadResult } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { getEntity as getAppUser } from '../app-user/app-user.reducer';

import { IWebsite, defaultValue } from 'app/shared/model/website.model';

export const ACTION_TYPES = {
  SET_DRAFT_WEBSITE: 'website/SET_DRAFT_WEBSITE',
  RESET_DRAFT_WEBSITE: 'website/RESET_DRAFT_WEBSITE',
  FETCH_WEBSITE_LIST: 'website/FETCH_WEBSITE_LIST',
  FETCH_WEBSITE: 'website/FETCH_WEBSITE',
  CREATE_WEBSITE: 'website/CREATE_WEBSITE',
  UPDATE_WEBSITE: 'website/UPDATE_WEBSITE',
  DELETE_WEBSITE: 'website/DELETE_WEBSITE',
  RESET: 'website/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWebsite>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type WebsiteState = Readonly<typeof initialState>;

// Reducer

export default (state: WebsiteState = initialState, action): WebsiteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_WEBSITE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WEBSITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_WEBSITE):
    case REQUEST(ACTION_TYPES.UPDATE_WEBSITE):
    case REQUEST(ACTION_TYPES.DELETE_WEBSITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_WEBSITE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_WEBSITE):
    case FAILURE(ACTION_TYPES.CREATE_WEBSITE):
    case FAILURE(ACTION_TYPES.UPDATE_WEBSITE):
    case FAILURE(ACTION_TYPES.DELETE_WEBSITE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEBSITE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEBSITE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_WEBSITE):
    case SUCCESS(ACTION_TYPES.UPDATE_WEBSITE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_WEBSITE):
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
    case ACTION_TYPES.SET_DRAFT_WEBSITE:
      return {
        ...state,
        entity: {
          ...state.entity,
          ...action.payload,
        },
      };
    case ACTION_TYPES.RESET_DRAFT_WEBSITE:
      return {
        ...state,
        entity: defaultValue,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/websites';

// Actions

export const setDraftWebsite = (website: Partial<IWebsite>) => ({
  type: ACTION_TYPES.SET_DRAFT_WEBSITE,
  payload: website,
});

export const resetDraftWebsite = () => ({
  type: ACTION_TYPES.RESET_DRAFT_WEBSITE,
});

export const getEntities: ICrudGetAllAction<IWebsite> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_WEBSITE_LIST,
  payload: axios.get<IWebsite>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IWebsite> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WEBSITE,
    payload: axios.get<IWebsite>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IWebsite> = entity => async dispatch => {
  let result;
  try {
    result = await dispatch({
      type: ACTION_TYPES.CREATE_WEBSITE,
      payload: axios.post(apiUrl, cleanEntity(entity)),
    });
    dispatch(getEntities());
    dispatch(getAppUser(entity.creatorId));
  } catch (e) {
    console.log(e);
  }

  return result;
};

export const updateEntity: ICrudPutAction<IWebsite> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WEBSITE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IWebsite> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WEBSITE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
