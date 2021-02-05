import React from "react";
import { BookmarkBorder, StarBorder, Star, Bookmark } from "@material-ui/icons";
import {
  useFavoriteList,
  useSessionId,
  useUserData,
  useWatchList,
} from "../../redux/selectors";
import { useDispatch } from "react-redux";
import {
  setModalShow,
  setNewFavorite,
  setNewWatchlist,
} from "../../redux/actionCreators";

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
      dispatch(
        setNewFavorite({
          account_id: userData.id,
          session_id,
          movie_id: id,
          isFavorite,
        })
      );
    }
  };

  const buttonWatchlistHandler = () => {
    if (!session_id) {
      dispatch(setModalShow());
    } else {
      dispatch(
        setNewWatchlist({
          account_id: userData.id,
          session_id,
          movie_id: id,
          isWatchList,
        })
      );
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
