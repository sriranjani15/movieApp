import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./MovieCard.scss";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Box, Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  addToFavourites,
  removeFromFavourites,
  addToWatchlist,
  removeFromWatchlist,
  fetchAsyncMovieOrshowDetail,
  removeRecentlyViewed,
  addToTempFavourites,
  removeFromTempFavourites,
  bulkDeleteFromFavourites,
  removeAllFromTempFavourites,
  removeFromTempWatchlist,
  addToTempWatchlist,
} from "../../features/movies/movieSlice";
const MovieCard = (props) => {
  const loc = useLocation();
  const pathname = loc.pathname;
  const { data } = props;
  const [checkboxFav, setCheckBoxFav] = useState(false);
  const [checkboxWat, setCheckBoxWat] = useState(false);
  const [hoverFav, setHoverFav] = useState(false);
  const [hoverWat, setHoverWat] = useState(false);
  const movies = useSelector((state) => state.movies.movies);
  const shows = useSelector((state) => state.movies.shows);
  const values = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [tempFav, setTempFav] = useState(false);
  const [tempWat, setTempWat] = useState(false);
  const movieIdsFav = useSelector((state) => state.movies.favourites);
  const movieIdsWat = useSelector((state) => state.movies.watchlists);
  const tempIdsFav = useSelector((state) => state.movies.tempFav);
  const tempIdsWat = useSelector((state) => state.movies.tempWat);
  const onClickWatch = (e) => {
    e.preventDefault();
    e.nativeEvent.stopPropagation();
    console.log(data);
    if (movieIdsWat.indexOf(data.imdbID) === -1) {
      setTempWat(true);
      dispatch(addToWatchlist([data.imdbID, data]));
    } else {
      setTempWat(false);
      dispatch(removeFromWatchlist(data.imdbID));
    }
  };
  useEffect(() => {
    setCheckBoxFav(false);
    setCheckBoxWat(false);
    setHoverFav(false);
    setHoverWat(false);
  }, [movieIdsFav, movieIdsWat]);
  const onClickFav = (e) => {
    e.preventDefault();
    e.nativeEvent.stopPropagation();
    console.log(data);
    if (movieIdsFav.indexOf(data.imdbID) === -1) {
      axios
        .post("http://localhost:4000/movies/create-fav", data)
        .then((res) => {
          if (res.status === 200) console.log("fav successfully created");
          else Promise.reject();
        })
        .catch((err) => console.log("Something went wrong"));
      setTempFav(true);
      dispatch(addToFavourites([data.imdbID, data]));
    } else {
      setTempFav(false);
      dispatch(removeFromFavourites(data.imdbID));
    }
  };

  const handleMouseOver = () => {
    if (pathname === "/favourites") {
      setHoverFav(true);
    } else if (pathname === "/watchlist") {
      setHoverWat(true);
    }
  };
  const handleMouseOut = (id) => {
    if (pathname === "/favourites") {
      if (tempIdsFav.indexOf(id) === -1) {
        setHoverFav(false);
      } else {
        setHoverFav(true);
      }
    } else if (pathname === "/watchlist") {
      if (tempIdsWat.indexOf(id) === -1) {
        setHoverWat(false);
      } else {
        setHoverWat(true);
      }
    }
  };
  const handleCheckboxFav = (e, id) => {
    e.preventDefault();
    e.nativeEvent.stopPropagation();
    if (tempIdsFav.indexOf(id) !== -1) {
      setCheckBoxFav(false);
      dispatch(removeFromTempFavourites(id));
    } else {
      setCheckBoxFav(true);
      dispatch(addToTempFavourites(id));
    }
  };
  const handleCheckboxWatch = (e, id) => {
    e.preventDefault();
    e.nativeEvent.stopPropagation();
    if (tempIdsWat.indexOf(id) !== -1) {
      dispatch(removeFromTempWatchlist(id));
    } else {
      dispatch(addToTempWatchlist(id));
    }
    setCheckBoxWat(!checkboxWat);
  };
  return (
    <div className="card-item">
      <Link to={`/movie/${data.imdbID}`}>
        <div
          className="card-inner"
          onMouseOver={handleMouseOver}
          onMouseOut={() => handleMouseOut(data.imdbID)}
        >
          <div className="card-top">
            <img src={data.Poster} alt={data.Title}></img>
          </div>
          {localStorage.getItem("key") ? (
            <>
              {pathname === "/" ? (
                <>
                  <IconButton
                    aria-label="watch"
                    onClick={onClickWatch}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#6839a1",
                      },
                    }}
                  >
                    {movieIdsWat.indexOf(data.imdbID) === -1 ? (
                      <Tooltip
                        leaveTouchDelay={10}
                        title={
                          <h3 style={{ color: "white" }}>Add to Watchlist</h3>
                        }
                      >
                        <BookmarkAddOutlinedIcon
                          sx={{ fontSize: 30, zIndex: 1, color: "white" }}
                        ></BookmarkAddOutlinedIcon>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        leaveTouchDelay={10}
                        title={
                          <h3 style={{ color: "white" }}>
                            Remove from Watchlist
                          </h3>
                        }
                      >
                        <BookmarkOutlinedIcon
                          sx={{ fontSize: 30, zIndex: 1, color: "white" }}
                        ></BookmarkOutlinedIcon>
                      </Tooltip>
                    )}
                  </IconButton>
                  <IconButton
                    aria-label="favourites"
                    onClick={onClickFav}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#6839a1",
                      },
                    }}
                  >
                    {movieIdsFav.indexOf(data.imdbID) === -1 ? (
                      <Tooltip
                        leaveTouchDelay={10}
                        title={
                          <h3 style={{ color: "white" }}>Add to Favourites</h3>
                        }
                      >
                        <FavoriteBorderOutlinedIcon
                          sx={{ fontSize: 30, zIndex: 1, color: "white" }}
                        ></FavoriteBorderOutlinedIcon>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        leaveTouchDelay={10}
                        title={
                          <h3 style={{ color: "white" }}>
                            Remove from Favourites
                          </h3>
                        }
                      >
                        <FavoriteOutlinedIcon
                          sx={{ fontSize: 30, zIndex: 1, color: "red" }}
                        ></FavoriteOutlinedIcon>
                      </Tooltip>
                    )}
                  </IconButton>
                </>
              ) : (
                <>
                  {pathname !== "/favourites" ? (
                    <>
                      <IconButton
                        onClick={onClickWatch}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#6839a1",
                          },
                        }}
                      >
                        {movieIdsWat.indexOf(data.imdbID) === -1 ? (
                          <Tooltip
                            leaveTouchDelay={10}
                            title={
                              <h3 style={{ color: "white" }}>
                                Add to Watchlist
                              </h3>
                            }
                          >
                            <BookmarkAddOutlinedIcon
                              sx={{ fontSize: 30, zIndex: 1, color: "white" }}
                            ></BookmarkAddOutlinedIcon>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            leaveTouchDelay={10}
                            title={
                              <h3 style={{ color: "white" }}>
                                Remove from Watchlist
                              </h3>
                            }
                          >
                            <BookmarkOutlinedIcon
                              sx={{ fontSize: 30, zIndex: 1, color: "white" }}
                            ></BookmarkOutlinedIcon>
                          </Tooltip>
                        )}
                      </IconButton>
                      {hoverWat && pathname === "/watchlist" ? (
                        <>
                          {checkboxWat ? (
                            <>
                              <Tooltip
                                leaveTouchDelay={10}
                                title={
                                  <h3 style={{ color: "white" }}>Unselect</h3>
                                }
                              >
                                <IconButton
                                  sx={{ marginLeft: 18 }}
                                  onClick={(event) => {
                                    handleCheckboxWatch(event, data.imdbID);
                                  }}
                                >
                                  <CheckBoxIcon
                                    sx={{ color: "white" }}
                                  ></CheckBoxIcon>
                                </IconButton>
                              </Tooltip>
                            </>
                          ) : (
                            <>
                              <Tooltip
                                leaveTouchDelay={10}
                                title={
                                  <h3 style={{ color: "white" }}>
                                    Select to Remove
                                  </h3>
                                }
                              >
                                <IconButton
                                  sx={{ marginLeft: 18 }}
                                  onClick={(event) => {
                                    handleCheckboxWatch(event, data.imdbID);
                                  }}
                                >
                                  <CheckBoxOutlineBlankIcon
                                    sx={{ color: "white" }}
                                  ></CheckBoxOutlineBlankIcon>
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={onClickFav}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#6839a1",
                          },
                        }}
                      >
                        {movieIdsFav.indexOf(data.imdbID) === -1 ? (
                          <Tooltip
                            leaveTouchDelay={10}
                            title={
                              <h3 style={{ color: "white" }}>
                                Add to Favourites
                              </h3>
                            }
                          >
                            <FavoriteBorderOutlinedIcon
                              sx={{ fontSize: 30, zIndex: 1, color: "white" }}
                            ></FavoriteBorderOutlinedIcon>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            leaveTouchDelay={10}
                            title={
                              <h3 style={{ color: "white" }}>
                                Remove from Favourites
                              </h3>
                            }
                          >
                            <FavoriteOutlinedIcon
                              sx={{ fontSize: 30, zIndex: 1, color: "red" }}
                            ></FavoriteOutlinedIcon>
                          </Tooltip>
                        )}
                      </IconButton>
                      {hoverFav && pathname === "/favourites" ? (
                        <>
                          {checkboxFav ? (
                            <>
                              <Tooltip
                                leaveTouchDelay={10}
                                title={
                                  <h3 style={{ color: "white" }}>Unselect</h3>
                                }
                              >
                                <IconButton
                                  sx={{ marginLeft: 18 }}
                                  onClick={(event) => {
                                    handleCheckboxFav(event, data.imdbID);
                                  }}
                                >
                                  <CheckBoxIcon
                                    sx={{ color: "white" }}
                                  ></CheckBoxIcon>
                                </IconButton>
                              </Tooltip>
                            </>
                          ) : (
                            <>
                              <Tooltip
                                leaveTouchDelay={10}
                                title={
                                  <h3 style={{ color: "white" }}>
                                    Select to Remove
                                  </h3>
                                }
                              >
                                <IconButton
                                  sx={{ marginLeft: 18 }}
                                  onClick={(event) => {
                                    handleCheckboxFav(event, data.imdbID);
                                  }}
                                >
                                  <CheckBoxOutlineBlankIcon
                                    sx={{ color: "white" }}
                                  ></CheckBoxOutlineBlankIcon>
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <></>
          )}
          <div className="card-bottom">
            <div className="card-info">
              <h4>{data.Title}</h4>
              <div>{data.Year}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
