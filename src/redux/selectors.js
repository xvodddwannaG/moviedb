import { useSelector } from "react-redux";

const userData = (state) => state.user;
const session_id = (state) => state.session_id;
const errorMessage = (state) => state.updateUserError;
const isShowModal = (state) => state.isShowModal;
const favoriteList = (state) => state.favoriteList;
const watchList = (state) => state.watchList;

export const useUserData = () => useSelector(userData);
export const useSessionId = () => useSelector(session_id);
export const useErrorMessage = () => useSelector(errorMessage);
export const useIsShowModal = () => useSelector(isShowModal);
export const useFavoriteList = () => useSelector(favoriteList);
export const useWatchList = () => useSelector(watchList);
