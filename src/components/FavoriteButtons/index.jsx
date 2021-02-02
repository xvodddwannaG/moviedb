import React from "react";
import { BookmarkBorder, StarBorder, Star, Bookmark } from "@material-ui/icons";
import {
  useFavoriteList,
  useSessionId,
  useUserData,
  useWatchList,
} from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { setModalShow } from "../../redux/actionCreators";
import { updateFavorite, updateWatchList } from "../../redux/applyMiddleware";

const FavoriteButtons = ({ id }) => {
  const dispatch = useDispatch();
  const userData = useUserData();
  const session_id = useSessionId();
  const watchList = useWatchList();
  const favoriteList = useFavoriteList();
  const isFavorite = favoriteList.includes(id);
  const isWatchList = watchList.includes(id);

  const buttonFavoriteHandler = () => {
    if (!session_id) {
      dispatch(setModalShow());
    } else {
      dispatch(updateFavorite(userData.id, session_id, id, isFavorite));
    }
  };

  const buttonWatchlistHandler = () => {
    if (!session_id) {
      dispatch(setModalShow());
    } else {
      dispatch(updateWatchList(userData.id, session_id, id, isWatchList));
    }
  };

  return (
    <>
      <button
        className="icons-button"
        onClick={buttonFavoriteHandler}
        name="favorite"
      >
        {isFavorite ? (
          <Star className="icons" />
        ) : (
          <StarBorder className="icons" />
        )}
      </button>
      <button
        className="icons-button"
        onClick={buttonWatchlistHandler}
        name="watchlist"
      >
        {isWatchList ? (
          <Bookmark className="icons" />
        ) : (
          <BookmarkBorder className="icons" />
        )}
      </button>
    </>
  );
};

export default FavoriteButtons;
