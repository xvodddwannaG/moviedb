import {
  LOGOUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_STARTING,
  SHOW_MODAL,
  CLOSE_MODAL,
  UPDATE_FAVORITE,
  UPDATE_WATCHLIST,
} from "./actionType";

const authInitialState = {
  user: null,
  session_id: null,
  updateUserError: null,
  userIsLoading: false,
  isShowModal: false,
  favoriteList: [],
  watchList: [],
};

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case UPDATE_USER_STARTING:
      return {
        ...state,
        userIsLoading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        updateUserError: null,
        userIsLoading: false,
        isShowModal: false,
        favoriteList: action.payload.favoriteList.map((item) => item.id),
        watchList: action.payload.watchList.map((item) => item.id),
      };
    case LOGOUT:
      return {
        ...state,
        session_id: null,
        user: null,
        favoriteList: [],
        watchList: [],
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        updateUserError: action.payload,
        userIsLoading: false,
      };
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
    case UPDATE_FAVORITE:
      return {
        ...state,
        favoriteList: action.payload.map((item) => item.id),
      };
    case UPDATE_WATCHLIST:
      return {
        ...state,
        watchList: action.payload.map((item) => item.id),
      };
    default:
      return state;
  }
};
