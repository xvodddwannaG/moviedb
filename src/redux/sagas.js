import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  GET_INITIAL_USER_DATA,
  LOGOUT,
  UPDATE_FAVORITE,
  UPDATE_WATCHLIST,
  USER_AUTHENTICATION,
} from "./actionType";
import CallApi from "../api/api_v2";
import {
  setModalClose,
  setUpdateFavorite,
  setUpdateFavoriteError,
  setUpdateFavoriteStarting,
  setUpdateUserError,
  setUpdateUserStarting,
  setUpdateWatchList,
  setUpdateWatchListError,
  setUpdateWatchListStarting,
  setUserData,
} from "./actionCreators";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const ONE_WEEK_COOKIES_TIME = 604800;

function* getUser(action) {
  yield put(setUpdateUserStarting());
  const result = yield call(
    CallApi.authorization,
    action.payload.username,
    action.payload.password
  );
  if (result.success === false) {
    yield put(setUpdateUserError(result.errorMessage));
  } else {
    const [watchList, favoriteList] = yield all([
      call(CallApi.get, `/account/${result.userData.id}/watchlist/movies`, {
        params: { session_id: result.session_id },
      }),
      call(CallApi.get, `/account/${result.userData.id}/favorite/movies`, {
        params: { session_id: result.session_id },
      }),
    ]);

    yield put(setUpdateFavorite(favoriteList.results));
    yield put(setUpdateWatchList(watchList.results));

    yield put(
      setUserData({
        user: result.userData,
        session_id: result.session_id,
      })
    );

    yield put(setModalClose());

    cookies.set("session_id", result.session_id, {
      path: "/",
      maxAge: ONE_WEEK_COOKIES_TIME,
    });
  }
}

function* userLogout(action) {
  yield call(CallApi.delete, "/authentication/session", {
    body: { session_id: action.payload },
  });
  cookies.remove("session_id");

  yield put(setUpdateFavorite([]));
  yield put(setUpdateWatchList([]));
}

function* getCookies(action) {
  const session_id = cookies.get("session_id");
  try {
    if (session_id) {
      yield put(setUpdateUserStarting());
      const result = yield call(CallApi.get, "/account", {
        params: { session_id },
      });
      yield put(setUpdateFavoriteStarting());
      yield put(setUpdateWatchListStarting());
      const [watchList, favoriteList] = yield all([
        call(CallApi.get, `/account/${result.id}/watchlist/movies`, {
          params: { session_id: session_id },
        }),
        call(CallApi.get, `/account/${result.id}/favorite/movies`, {
          params: { session_id: session_id },
        }),
      ]);

      yield put(setUpdateFavorite(favoriteList.results));
      yield put(setUpdateWatchList(watchList.results));

      yield put(
        setUserData({
          user: result,
          session_id,
        })
      );
    }
  } catch (error) {
    yield put(setUpdateUserError(error));
    yield put(setUpdateFavoriteError(error));
    yield put(setUpdateWatchListError());
  }
}

function* updateFavorite(action) {
  yield put(setUpdateFavoriteStarting());
  try {
    yield call(CallApi.post, `/account/${action.payload.account_id}/favorite`, {
      params: { session_id: action.payload.session_id },
      body: {
        media_type: "movie",
        media_id: action.payload.movie_id,
        favorite: !action.payload.isFavorite,
      },
    });
    const favoriteList = yield call(
      CallApi.get,
      `/account/${action.payload.account_id}/favorite/movies`,
      { params: { session_id: action.payload.session_id } }
    );
    yield put(setUpdateFavorite(favoriteList.results));
  } catch (error) {
    yield put(setUpdateFavoriteError(error));
  }
}

function* updateWatchlist(action) {
  yield put(setUpdateWatchListStarting());
  try {
    yield call(
      CallApi.post,
      `/account/${action.payload.account_id}/watchlist`,
      {
        params: { session_id: action.payload.session_id },
        body: {
          media_type: "movie",
          media_id: action.payload.movie_id,
          watchlist: !action.payload.isWatchList,
        },
      }
    );
    const watchList = yield call(
      CallApi.get,
      `/account/${action.payload.account_id}/watchlist/movies`,
      { params: { session_id: action.payload.session_id } }
    );
    yield put(setUpdateWatchList(watchList.results));
  } catch (error) {
    yield put(setUpdateWatchListError(error));
  }
}

function* rootSaga() {
  yield takeEvery(LOGOUT, userLogout);
  yield takeEvery(USER_AUTHENTICATION, getUser);
  yield takeEvery(GET_INITIAL_USER_DATA, getCookies);
  yield takeEvery(UPDATE_WATCHLIST, updateWatchlist);
  yield takeEvery(UPDATE_FAVORITE, updateFavorite);
}

export default rootSaga;
