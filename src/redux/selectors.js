import { useSelector } from "react-redux";

const userData = (state) => state.user.userData;
const userIsLoading = (state) => state.user.userIsLoading;
const session_id = (state) => state.user.session_id;
const UserErrorMessage = (state) => state.user.updateUserError;
const isShowModal = (state) => state.modal.isShowModal;
const favoriteList = (state) => state.favoriteList.items;
const watchList = (state) => state.watchList.items;

export const useUserData = () => useSelector(userData);
export const useUserIsLoading = () => useSelector(userIsLoading);
export const useSessionId = () => useSelector(session_id);
export const useErrorMessage = () => useSelector(UserErrorMessage);
export const useIsShowModal = () => useSelector(isShowModal);
export const useFavoriteList = () => useSelector(favoriteList);
export const useWatchList = () => useSelector(watchList);
