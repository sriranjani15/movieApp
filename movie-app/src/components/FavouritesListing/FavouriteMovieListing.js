import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import "./FavouriteMovieListing.scss";
import Slider from "react-slick";
import { SettingsC } from "../../common/settingsC";
import { useLocation } from "react-router-dom";
import empty from "../../images/empty.png";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Alert, Grid } from "@mui/material";
import { Snackbar } from "@mui/material";
import Typography from "@mui/material/Typography";

import {
  addToTempFavourites,
  removeFromTempFavourites,
  bulkDeleteFromFavourites,
  removeAllFromTempFavourites,
} from "../../features/movies/movieSlice";

const FavouriteMovieListing = () => {
  const values = useSelector((state) => state.movies);
  const shows = useSelector((state) => state.movies.shows);
  const [value, setValue] = useState(false);
  const [checkbox, setCheckBox] = useState(false);
  const [selectButtonText, setSelectButtonText] = useState("Select to Delete");
  const ids = values.favourites;
  const dispatch = useDispatch();
  const styleObj = {
    "&:hover": {
      backgroundColor: "white",
      color:"#45345f"
    },
  };
  let a = false;
  const tempIds = useSelector((state) => state.movies.tempFav);
  // console.log(loc);
  console.log("favouritesdata", values.favouritesData);
  let renderMovies = "";
  let renderShows = "";
  useEffect(()=>{
    dispatch(removeAllFromTempFavourites());
  },[]);
  const handleClick = (e, data, key) => {
    //console.log("key",e.currentTarget.value);
    if (tempIds.indexOf(data.imdbID) !== -1) {
      dispatch(removeFromTempFavourites(data.imdbID));
      // tempIds.splice(tempIds.indexOf(data.imdbID));
    } else {
      dispatch(addToTempFavourites(data.imdbID));
    }
    console.log(tempIds);
  };
  const handleBulkDelete = () => {
    if (tempIds.length === 0) {
      setValue(true);
    }
    if (tempIds.length !== 0) {
      dispatch(bulkDeleteFromFavourites());
    }
  };
  renderMovies = values.favouritesData.length ? (
    values.favouritesData.map((movie, index) => {
      a = false;
      if (tempIds.indexOf(movie.imdbID) !== -1) {
        a = true;
      }
      return (
        <div>
          <MovieCard key={index} data={movie}></MovieCard>
          <Button
            value={movie.imdbID}
            sx={{ marginLeft: 10 }}
            onClick={(event) => handleClick(event, movie, index)}
          >
            {checkbox ? (
              <>
                {a ? (
                  <CheckBoxIcon
                    sx={{ color: "white", cursor: "pointer" }}
                  ></CheckBoxIcon>
                ) : (
                  <CheckBoxOutlineBlankIcon
                    sx={{ color: "white", cursor: "pointer" }}
                  ></CheckBoxOutlineBlankIcon>
                )}
              </>
            ) : (
              <></>
            )}
          </Button>
        </div>
      );
    })
  ) : (
    <div className="favourite-movies-error">
      <h3>Error</h3>
    </div>
  );
  console.log("renderMovies", renderMovies);

  const handleSelectToDelete = () => {
    if (!checkbox) {
      setCheckBox(true);
      setSelectButtonText("Cancel Deletion");
    } else {
      setCheckBox(false);
      setSelectButtonText("Select to Delete");
      dispatch(removeAllFromTempFavourites());
    }
  };

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <div>
          <Snackbar
            anchorOrigin={{
              horizontal: "left",
              vertical: "bottom",
            }}
            autoHideDuration={600}
            open={value}
            onClose={() => setValue(false)}
          >
            <Alert severity="error">Select a movie to Delete</Alert>
          </Snackbar>
          <Box display="flex" gap={135}>
            {renderMovies.length?(<><h2>Favourites</h2></>):(<></>)}
            {values.favourites.length ? (
              <>
                  {tempIds.length ? (
                    <>
                      <Button
                        onClick={handleBulkDelete}
                        variant="contained"
                        sx={{
                          ...styleObj,
                          color: "white",
                          backgroundColor: "#45345f",
                          textTransform: "none",
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
              </>
            ) : (
              <></>
            )}
          </Box>
          <div className="movie-container">
            {renderMovies.length ? (
              <>
                <Slider {...SettingsC}>{renderMovies}</Slider>
              </>
            ) : (
              <>
              <Grid container height={500} alignItems="center" justifyContent="center">
                  <img src={empty} style={{width:90,height:90}}></img>
                  <Typography variant="h4" color="white" marginLeft={3} marginTop={2}>
                    No favourites yet!!
                  </Typography>
              </Grid>
                  {/* <Button variant="contained" sx={{height:50,marginBottom:100,color:"white",backgroundColor:"45345f"}}>
                    Explore
                  </Button> */}
              </>
            )}
          </div>
        </div>
      </div>
      {/* <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-container">
          <Slider {...SettingsC}>{renderShows}</Slider>
        </div>
      </div> */}
    </div>
  );
};

export default FavouriteMovieListing;
