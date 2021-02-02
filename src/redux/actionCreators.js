import {
  LOGOUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_STARTING,
  CLOSE_MODAL,
  SHOW_MODAL,
  UPDATE_FAVORITE,
  UPDATE_WATCHLIST,
} from "./actionType";

export const setUserData = (payload) => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});

export const setLogout = () => ({
  type: LOGOUT,
});

export const setUpdateUserError = (payload) => ({
  type: UPDATE_USER_ERROR,
  payload,
});

export const setUpdateUserStarting = (payload) => ({
  type: UPDATE_USER_STARTING,
  payload,
});

export const setModalClose = () => ({
  type: CLOSE_MODAL,
});

export const setModalShow = () => ({
  type: SHOW_MODAL,
});

export const setUpdateFavorite = (payload) => ({
  type: UPDATE_FAVORITE,
  payload,
});

export const setUpdateWatchList = (payload) => ({
  type: UPDATE_WATCHLIST,
  payload,
});
