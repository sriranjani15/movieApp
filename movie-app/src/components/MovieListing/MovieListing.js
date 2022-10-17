import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllMovies, getAllShows } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";
import Slider from "react-slick";
import { Settings } from "../../common/settings";
import {SettingsC} from "../../common/settingsC";
import { useLocation } from "react-router-dom";
import Search from "../Search/Search";
import { Button, Tooltip, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  addToFavourites,
  removeFromFavourites,
  addToWatchlist,
  removeFromWatchlist,
  fetchAsyncMovieOrshowDetail,
  removeRecentlyViewed
} from "../../features/movies/movieSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const MovieListing = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#d9b3ff",
      },
      secondary: {
        main: "#45345f",
      },
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          standardInfo: {
            color: "black",
          },
        },
      },
    },
  });
  const movies = useSelector((state) => state.movies.movies);
  const shows = useSelector((state) => state.movies.shows);
  const values = useSelector((state) => state.movies);
  const recentlyViewed = values.recentlyViewed;
  const [openf, setOpenF] = useState(false);
  const [openw, setOpenW] = useState(false);
  const [tempFav, setTempFav] = useState(false);
  const [tempWat, setTempWat] = useState(false);
  let renderMovies = "";
  let renderShows = "";
  let renderRecentlyViewed="";
  let a = false;
  let b = false;
  let toolTextFav = "Add to Favorites";
  let toolTextWat = "Add to Watchlist";
  const dispatch = useDispatch();
  const movieIdsFav = useSelector((state) => state.movies.favourites);
  const movieIdsWat = useSelector((state) => state.movies.watchlists);
  const styleObj = {
    "&:hover": {
      backgroundColor: "white",
      color:"#45345f",
      cursor:"pointer"
    },
  };
  const handleToCloseFav = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpenF(false);
  };
  const handleToCloseWat = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpenW(false);
  };
  const onClickFav = (e, data, key) => {
    console.log(data);
    setOpenF(true);
    if (movieIdsFav.indexOf(data.movie.imdbID) === -1) {
      let object = {};
      if (data.movie.Type === "movie") {
        movies.Search.forEach((obj) => {
          if (obj.imdbID === data.movie.imdbID) {
            object = obj;
          }
        });
      } else {
        shows.Search.forEach((obj) => {
          if (obj.imdbID === data.movie.imdbID) {
            object = obj;
          }
        });
      }
      // console.log("object",object);
      setTempFav(true);
      dispatch(addToFavourites([data.movie.imdbID, object]));
    } else {
      setTempFav(false);
      dispatch(removeFromFavourites(data.movie.imdbID));
    }
  };

  const onClickWatch = (e, data, key) => {
    console.log(data);
    setOpenW(true);
    if (movieIdsWat.indexOf(data.movie.imdbID) === -1) {
      let object = {};
      if (data.movie.Type === "movie") {
        movies.Search.forEach((obj) => {
          if (obj.imdbID === data.movie.imdbID) {
            object = obj;
          }
        });
      } else {
        shows.Search.forEach((obj) => {
          if (obj.imdbID === data.movie.imdbID) {
            object = obj;
          }
        });
      }
      setTempWat(true);
      // console.log("object",object);
      dispatch(addToWatchlist([data.movie.imdbID, object]));
    } else {
      setTempWat(false);
      dispatch(removeFromWatchlist(data.movie.imdbID));
    }
  };

  const clearHistory=()=>{
    dispatch(removeRecentlyViewed());
  }

  renderRecentlyViewed = recentlyViewed ? (recentlyViewed.map((movie,index)=>{
    return (<div>
        <MovieCard key={index} data={movie}></MovieCard>
    </div>)
  })): (
    <div className="rencently viewed-error">
      <h3>{movies.Error}</h3>
    </div>
  );

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => {
        return (
          <div>
            <ThemeProvider theme={theme}>
              <MovieCard key={index} data={movie}></MovieCard>
            </ThemeProvider>
          </div>
        );
      })
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );
  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((movie, index) => {
        return (
          <div>
            <ThemeProvider theme={theme}>
              <MovieCard key={index} data={movie}></MovieCard>
            </ThemeProvider>
          </div>
        );
      })
    ) : (
      <div className="shows-error">
        <h3>{shows.Error}</h3>
      </div>
    );
  return (
    <div className="movie-wrapper">
      {Object.keys(movies).length === 0 ? (
        // <div>...loading</div>
        <CircularProgress
          style={{ color: "#4b3b6d", marginLeft: 500 }}
          size={300}
        />
      ) : (
        <>
          <div className="movie-list">
            <Box display="flex" gap={100}>
              <h2>Movies</h2>
              <Search></Search>
            </Box>
            <ThemeProvider theme={theme}>
              <Snackbar
                anchorOrigin={{
                  horizontal: "left",
                  vertical: "bottom",
                }}
                autoHideDuration={200}
                open={openf}
                onClose={handleToCloseFav}
                action={
                  <>
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={handleToCloseFav}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </>
                }
              >
                <Alert onClose={handleToCloseFav} severity="info">
                  {tempFav ? "Added to Favorites" : "Removed from Favorites"}
                </Alert>
              </Snackbar>
              <Snackbar
                anchorOrigin={{
                  horizontal: "left",
                  vertical: "bottom",
                }}
                autoHideDuration={200}
                open={openw}
                onClose={handleToCloseWat}
                action={
                  <>
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={handleToCloseWat}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </>
                }
              >
                <Alert onClose={handleToCloseWat} severity="info">
                  {tempWat ? "Added to Watchlist" : "Removed from WatchList"}
                </Alert>
              </Snackbar>
            </ThemeProvider>
            <div className="movie-container">
              <Slider {...SettingsC}>{renderMovies}</Slider>
            </div>
          </div>
          {renderShows.length?(<>
          <div className="show-list">
            <h2>Shows</h2>
            <div className="movie-container">
              <Slider {...SettingsC}>{renderShows}</Slider>
            </div>
          </div></>):(<></>)}
          <div className="show-list">
            {localStorage.getItem("key") ? (
              <>
              <Box display="flex" gap={110}>
                <h2>Recently Viewed</h2>
                <Button variant="contained" onClick={clearHistory} sx={{...styleObj,color: "white", backgroundColor: "#45345f" }}>Clear your history</Button>
              </Box>
                <div className="recent-container">
                  <Slider {...SettingsC}>{renderRecentlyViewed}</Slider>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      ;
    </div>
  );
};

export default MovieListing;
