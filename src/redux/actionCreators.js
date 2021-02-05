import {
  LOGOUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_STARTING,
  CLOSE_MODAL,
  SHOW_MODAL,
  UPDATE_FAVORITE,
  UPDATE_WATCHLIST,
  USER_AUTHENTICATION,
  GET_INITIAL_USER_DATA,
  UPDATE_FAVORITE_SUCCESS,
  UPDATE_FAVORITE_ERROR,
  UPDATE_FAVORITE_STARTING,
  UPDATE_WATCHLIST_SUCCESS,
  UPDATE_WATCHLIST_ERROR,
  UPDATE_WATCHLIST_STARTING,
} from "./actionType";

//redux
export const setUpdateUserStarting = () => ({
  type: UPDATE_USER_STARTING,
});

export const setUserData = (payload) => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});

export const setUpdateUserError = (payload) => ({
  type: UPDATE_USER_ERROR,
  payload,
});
export const setModalClose = () => ({
  type: CLOSE_MODAL,
});

export const setModalShow = () => ({
  type: SHOW_MODAL,
});

export const setUpdateFavoriteStarting = () => ({
  type: UPDATE_FAVORITE_STARTING,
});

export const setUpdateFavorite = (payload) => ({
  type: UPDATE_FAVORITE_SUCCESS,
  payload,
});

export const setUpdateFavoriteError = (payload) => ({
  type: UPDATE_FAVORITE_ERROR,
  payload,
});

export const setUpdateWatchListStarting = () => ({
  type: UPDATE_WATCHLIST_STARTING,
});

export const setUpdateWatchList = (payload) => ({
  type: UPDATE_WATCHLIST_SUCCESS,
  payload,
});

export const setUpdateWatchListError = (payload) => ({
  type: UPDATE_WATCHLIST_ERROR,
  payload,
});

//saga
export const getUserInitialData = () => ({ type: GET_INITIAL_USER_DATA });
export const setUserAuth = (payload) => ({
  type: USER_AUTHENTICATION,
  payload,
});
export const setLogout = (payload) => ({ type: LOGOUT, payload });
export const setNewFavorite = (payload) => ({ type: UPDATE_FAVORITE, payload });
export const setNewWatchlist = (payload) => ({
  type: UPDATE_WATCHLIST,
  payload,
});
