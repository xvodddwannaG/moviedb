import {
  setLogout,
  setUpdateFavorite,
  setUpdateUserError,
  setUpdateUserStarting,
  setUpdateWatchList,
  setUserData,
} from "./actionCreators";
import CallApi from "../api/api_v2";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const ONE_WEEK_COOKIES_TIME = 604800;

export const getUser = (username, password) => async (dispatch) => {
  await dispatch(setUpdateUserStarting());
  const result = await CallApi.authorization(username, password);
  if (result.success === false) {
    dispatch(setUpdateUserError(result.errorMessage));
  } else {
    const watchList = await CallApi.get(
      `/account/${result.userData.id}/watchlist/movies`,
      { params: { session_id: result.session_id } }
    );
    const favoriteList = await CallApi.get(
      `/account/${result.userData.id}/favorite/movies`,
      { params: { session_id: result.session_id } }
    );
    await dispatch(
      setUserData({
        user: result.userData,
        session_id: result.session_id,
        watchList: watchList.results,
        favoriteList: favoriteList.results,
      })
    );
    await cookies.set("session_id", result.session_id, {
      path: "/",
      maxAge: ONE_WEEK_COOKIES_TIME,
    });
  }
};

export const userLogout = (session_id) => async (dispatch) => {
  await CallApi.delete("/authentication/session", {
    body: { session_id: session_id },
  });
  await cookies.remove("session_id");
  await dispatch(setLogout());
};

export const getCookies = () => async (dispatch) => {
  const session_id = await cookies.get("session_id");
  if (session_id) {
    const result = await CallApi.get("/account", { params: { session_id } });
    const watchList = await CallApi.get(
      `/account/${result.id}/watchlist/movies`,
      { params: { session_id } }
    );
    const favoriteList = await CallApi.get(
      `/account/${result.id}/favorite/movies`,
      { params: { session_id } }
    );
    await dispatch(
      setUserData({
        user: result,
        session_id,
        watchList: watchList.results,
        favoriteList: favoriteList.results,
      })
    );
  }
};

export const updateFavorite = (
  account_id,
  session_id,
  movie_id,
  isFavorite
) => async (dispatch) => {
  await CallApi.post(`/account/${account_id}/favorite`, {
    params: { session_id },
    body: {
      media_type: "movie",
      media_id: movie_id,
      favorite: !isFavorite,
    },
  });
  const favoriteList = await CallApi.get(
    `/account/${account_id}/favorite/movies`,
    { params: { session_id } }
  );
  console.log(favoriteList);
  await dispatch(setUpdateFavorite(favoriteList.results));
};

export const updateWatchList = (
  account_id,
  session_id,
  movie_id,
  isWatchList
) => async (dispatch) => {
  await CallApi.post(`/account/${movie_id.id}/watchlist`, {
    params: { session_id },
    body: {
      media_type: "movie",
      media_id: movie_id,
      watchlist: !isWatchList,
    },
  });
  const watchList = await CallApi.get(
    `/account/${account_id}/watchlist/movies`,
    { params: { session_id } }
  );
  await dispatch(setUpdateWatchList(watchList.results));
};
