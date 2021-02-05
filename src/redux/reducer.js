import {
  LOGOUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_STARTING,
  SHOW_MODAL,
  CLOSE_MODAL,
  UPDATE_FAVORITE_STARTING,
  UPDATE_FAVORITE_SUCCESS,
  UPDATE_FAVORITE_ERROR,
  UPDATE_WATCHLIST_SUCCESS,
  UPDATE_WATCHLIST_ERROR,
  UPDATE_WATCHLIST_STARTING,
} from "./actionType";
import { combineReducers } from "redux";

const authReducerInitialState = {
  userData: null,
  userIsLoading: false,
  updateUserError: null,
  session_id: null,
};
const favoriteListInitialState = {
  items: [],
  favoriteListIsLoading: false,
  favoriteListError: null,
};
const watchListInitialState = {
  items: [],
  watchListIsLoading: false,
  watchListError: null,
};
const modalReducerInitialState = {
  isShowModal: false,
};

const authReducer = (state = authReducerInitialState, action) => {
  switch (action.type) {
    case UPDATE_USER_STARTING:
      return {
        ...state,
        userIsLoading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload.user,
        session_id: action.payload.session_id,
        updateUserError: null,
        userIsLoading: false,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        updateUserError: action.payload,
        userIsLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        userData: null,
        session_id: null,
      };
    default:
      return state;
  }
};

const favoriteListReducer = (state = favoriteListInitialState, action) => {
  switch (action.type) {
    case UPDATE_FAVORITE_STARTING:
      return {
        ...state,
        favoriteListIsLoading: true,
      };
    case UPDATE_FAVORITE_SUCCESS:
      return {
        ...state,
        items: action.payload.map((item) => item.id),
        favoriteListIsLoading: false,
      };
    case UPDATE_FAVORITE_ERROR:
      return {
        ...state,
        favoriteListIsLoading: false,
        favoriteListError: action.payload,
      };
    default:
      return state;
  }
};

const watchListReducer = (state = watchListInitialState, action) => {
  switch (action.type) {
    case UPDATE_WATCHLIST_STARTING:
      return {
        ...state,
        watchListIsLoading: true,
      };
    case UPDATE_WATCHLIST_SUCCESS:
      return {
        ...state,
        items: action.payload.map((item) => item.id),
        watchListIsLoading: false,
      };
    case UPDATE_WATCHLIST_ERROR:
      return {
        ...state,
        watchListIsLoading: false,
        watchListError: action.payload,
      };
    default:
      return state;
  }
};

const modalReducer = (state = modalReducerInitialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        isShowModal: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isShowModal: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: authReducer,
  favoriteList: favoriteListReducer,
  watchList: watchListReducer,
  modal: modalReducer,
});

export default rootReducer;
