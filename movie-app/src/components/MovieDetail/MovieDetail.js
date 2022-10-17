import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { IconButton } from "@mui/material";
import { Skeleton } from "@mui/material";
import {Grid} from "@mui/material";
import {
  fetchAsyncMovieOrshowDetail,
  getSelectedMovieOrShow,
  removeSelectedMovieOrShow,
  addToFavourites,
  removeFromFavourites,
  addToWatchlist,
  removeFromWatchlist,
  fetchByTitle,
} from "../../features/movies/movieSlice";
import "./MovieDetail.scss";
import { Tooltip } from "@mui/material";
const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isInWatchlist, setInWatchlist] = useState(false);
  // console.log(data);
  // localStorage.setItem("isHome", false);
  const movieIdsFav = useSelector((state) => state.movies.favourites);
  console.log(movieIdsFav);
  const movieIdsWat = useSelector((state) => state.movies.watchlists);
  useEffect(() => {
    if (movieIdsFav.length !== 0) {
      movieIdsFav.forEach((id) => {
        if (id === imdbID) {
          setIsFavourite(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (movieIdsWat.length !== 0) {
      movieIdsWat.forEach((id) => {
        if (id === imdbID) {
          setInWatchlist(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAsyncMovieOrshowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);

  const [buttonTextFav, setButtonTextFav] = useState("");
  const [buttonTextWatch, setButtonTextWatch] = useState("");
  useEffect(() => {
    if (isFavourite) {
      setButtonTextFav("-Favourites");
    } else {
      setButtonTextFav("+Favourites");
    }
  }, [isFavourite]);

  useEffect(() => {
    if (isInWatchlist) {
      setButtonTextWatch("-Watchlist");
    } else {
      setButtonTextWatch("+Watchlist");
    }
  }, [isInWatchlist]);

  const onFavouritesClick = () => {
    if (!isFavourite) {
      setIsFavourite(true);
      dispatch(addToFavourites([imdbID, {}]));
    } else {
      setIsFavourite(false);
      dispatch(removeFromFavourites(imdbID));
    }
  };
  const onWatchlistClick = () => {
    if (!isInWatchlist) {
      setInWatchlist(true);
      dispatch(addToWatchlist([imdbID, {}]));
    } else {
      setInWatchlist(false);
      dispatch(removeFromWatchlist(imdbID));
    }
  };
  return (
    <div className="movie-section">
      {/* {Object.keys(data).length === 0 ? (
        // <div>...loading</div>
        <CircularProgress style={{ color: "#4b3b6d" }} size={300} />
      ) : ( */}
      {/* <> */}
      <div className="section-left">
        {data.Title ? (
          <>
            <div className="movie-title">{data.Title}</div>
          </>
        ) : (
          <>
            <Skeleton
              variant="rounded"
              width={800}
              height={60}
              marginLeft={-1}
              animation="wave"
              sx={{ bgcolor: "#e6ccff" }}
            />
          </>
        )}
        {/* <div className="movie-title">{data.Title}</div> */}
        <div className="movie-rating">
          {data.imdbRating ? (
            <>
              <span>
                IMDB Rating <i className="fa fa-star"></i> : {data.imdbRating}
              </span>
            </>
          ) : (
            <>
              <Skeleton
                variant="rounded"
                width={100}
                height={60}
                marginLeft={-1}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
            </>
          )}
          {data.imdbVotes ? (
            <>
              <span>
                IMDB Votes <i className="fa fa-thumbs-up"></i> :{data.imdbVotes}
              </span>
            </>
          ) : (
            <>
              <Skeleton
                variant="rounded"
                width={100}
                height={60}
                marginLeft={-1}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
            </>
          )}
          {/* <span>
                IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                {data.imdbVotes}
              </span> */}
          {/* <span>
                IMDB Rating <i className="fa fa-star"></i> : {data.imdbRating}
              </span>
              <span>
                IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                {data.imdbVotes}
              </span> */}
          {data.Runtime ? (
            <>
              <span>
                Runtime <i className="fa fa-film"></i> : {data.Runtime}
              </span>
            </>
          ) : (
            <>
              <Skeleton
                variant="rounded"
                width={100}
                height={60}
                marginLeft={-1}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
            </>
          )}
          {/* <span>
            Runtime <i className="fa fa-film"></i> : {data.Runtime}
          </span> */}
           {data.Year ? (
            <>
          <span>
            Year <i className="fa fa-calendar"></i> : {data.Year}
          </span>
            </>
          ) : (
            <>
              <Skeleton
                variant="rounded"
                width={100}
                height={60}
                marginLeft={-1}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
            </>
          )}
          {/* <span>
            Year <i className="fa fa-calendar"></i> : {data.Year}
          </span> */}
        </div>
        <div className="movie-plot">{data.Plot?(<>{data.Plot}</>):(<>
              <Skeleton
                variant="rounded"
                width={700}
                height={100}
                marginLeft={-1}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
            </>)}</div>
        <div className="movie-info">
          <div>
            {data.Director?(<>
            <span>Director</span>
            <span>{data.Director}</span></>):(<><Grid container direction="row" gap={4}>
              <Skeleton
                variant="text"
                marginLeft={-1}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
              <Skeleton
                variant="text"
                width={300}
                height={50}
                top={10}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
              </Grid>
            </>)}
          </div>
          <div>
          {data.Actors?(<>
            <span>Stars</span>
            <span>{data.Actors}</span></>):(<><Grid container direction="row" gap={4}>
              <Skeleton
                variant="text"
                marginLeft={-1}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
              <Skeleton
                variant="text"
                width={300}
                height={50}
                top={10}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
              </Grid>
            </>)}
          </div>
          <div>
          {data.Genre?(<>
            <span>Genres</span>
            <span>{data.Genre}</span></>):(<><Grid container direction="row" gap={4}>
              <Skeleton
                variant="text"
                marginLeft={-1}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
              <Skeleton
                variant="text"
                width={300}
                height={50}
                top={10}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
              </Grid>
            </>)}
          </div>
          <div>
          {data.Language?(<>
            <span>Languages</span>
            <span>{data.Language}</span></>):(<><Grid container direction="row" gap={4}>
              <Skeleton
                variant="text"
                marginLeft={-1}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
              <Skeleton
                variant="text"
                width={300}
                height={50}
                top={10}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
              </Grid>
            </>)}
          </div>
          <div>
          {data.Awards?(<>
            <span>Awards</span>
            <span>{data.Awards}</span></>):(<><Grid container direction="row" gap={4}>
              <Skeleton
                variant="text"
                marginLeft={-1}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
              <Skeleton
                variant="text"
                width={300}
                height={50}
                top={10}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
              </Grid>
            </>)}
          </div>
        </div>
        {localStorage.getItem("key") ? (
          <div className="section-below">
            <IconButton
              onClick={onWatchlistClick}
              sx={{
                "&:hover": {
                  backgroundColor: "#6839a1",
                },
              }}
            >
              {movieIdsWat.indexOf(data.imdbID) === -1 ? (
                <Tooltip
                  leaveTouchDelay={10}
                  title={<h3 style={{ color: "white" }}>Add to Watchlist</h3>}
                >
                  <BookmarkAddOutlinedIcon
                    sx={{ fontSize: 30, zIndex: 1, color: "white" }}
                  ></BookmarkAddOutlinedIcon>
                </Tooltip>
              ) : (
                <Tooltip
                  leaveTouchDelay={10}
                  title={
                    <h3 style={{ color: "white" }}>Remove from Watchlist</h3>
                  }
                >
                  <BookmarkOutlinedIcon
                    sx={{ fontSize: 30, zIndex: 1, color: "white" }}
                  ></BookmarkOutlinedIcon>
                </Tooltip>
              )}
            </IconButton>
            <IconButton
              onClick={onFavouritesClick}
              sx={{
                "&:hover": {
                  backgroundColor: "#6839a1",
                },
              }}
            >
              {movieIdsFav.indexOf(data.imdbID) === -1 ? (
                <Tooltip
                  leaveTouchDelay={10}
                  title={<h3 style={{ color: "white" }}>Add to Favourites</h3>}
                >
                  <FavoriteBorderOutlinedIcon
                    sx={{ fontSize: 30, zIndex: 1, color: "white" }}
                  ></FavoriteBorderOutlinedIcon>
                </Tooltip>
              ) : (
                <Tooltip
                  leaveTouchDelay={10}
                  title={
                    <h3 style={{ color: "white" }}>Remove from Favourites</h3>
                  }
                >
                  <FavoriteOutlinedIcon
                    sx={{ fontSize: 30, zIndex: 1, color: "red" }}
                  ></FavoriteOutlinedIcon>
                </Tooltip>
              )}
            </IconButton>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="section-right">
        {data.Poster?(<><img src={data.Poster} alt={data.Title}></img></>):(<>
              <Skeleton
                variant="rounded"
                width={300}
                height={500}
                marginLeft={-1}
                animation="wave"
                sx={{ bgcolor: "#e6ccff" }}
              />
            </>)}
        {/* <Button variant="outlined" onClick={onFavouritesClick}>{buttonTextFav}</Button>
            <Button variant="outlined" onClick={onWatchlistClick}>{buttonTextWatch}</Button> */}
      </div>
      {/* </> */}
      {/* )} */}
    </div>
  );
};

export default MovieDetail;
