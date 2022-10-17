import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import "./WatchListing.scss";
import Slider from "react-slick";
import { SettingsC } from "../../common/settingsC";
import { useLocation } from "react-router-dom";
import empty from "../../images/empty.png";
import {
  addToTempWatchlist,
  bulkDeleteFromWatchlist,
  removeFromTempWatchlist,
  removeAllFromTempWatchlist,
} from "../../features/movies/movieSlice";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Button, Box } from "@mui/material";
import { Alert,Grid } from "@mui/material";
import { Snackbar } from "@mui/material";
import { Tooltip } from "@mui/material";
import {Typography} from "@mui/material";

const WatchListing = () => {
  const values = useSelector((state) => state.movies);
  const shows = useSelector((state) => state.movies.shows);
  const [value, setValue] = useState(false);
  const loc = useLocation();
  let a = false;
  const ids = values.watchlistData;
  const dispatch = useDispatch();
  const tempIds = useSelector((state) => state.movies.tempWat);
  const [checkbox,setCheckBox]=useState(false);
  const [selectButtonText,setSelectButtonText]=useState("Select to Delete");
  useEffect(()=>{
    dispatch(removeAllFromTempWatchlist());
  },[]);
  const styleObj = {
    "&:hover": {
      backgroundColor: "white",
      color:"#45345f"
    },
  };
  // console.log(loc);
  console.log("watchlistData", values.watchlistData);
  let renderMovies = "";
  let renderShows = "";
  const handleClick = (e, data, key) => {
    // console.log(data);
    if (tempIds.indexOf(e.currentTarget.value) !== -1) {
      dispatch(removeFromTempWatchlist(e.currentTarget.value));
      // tempIds.splice(tempIds.indexOf(data.imdbID));
    } else {
      dispatch(addToTempWatchlist(e.currentTarget.value));
    }
    console.log(tempIds);
  };
  const handleBulkDelete = () => {
    if (tempIds.length === 0) {
      setValue(true);
    }
    if (tempIds.length !== 0) {
      dispatch(bulkDeleteFromWatchlist());
    }
  };
  const handleSelectToDelete=()=>{
    if(!checkbox){
      setCheckBox(true);
      setSelectButtonText("Cancel Deletion");
    }
    else{
      setCheckBox(false);
      setSelectButtonText("Select to Delete");
      dispatch(removeAllFromTempWatchlist());
    }
  };
  renderMovies = values.watchlistData.length ? (
    values.watchlistData.map((movie, index) => {
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
            onClick={(event) => handleClick(event, movie,index)}
          >
            {checkbox?(<>{a ? (
              <CheckBoxIcon
                sx={{ color: "white", cursor: "pointer" }}
              ></CheckBoxIcon>
            ) : (
              <CheckBoxOutlineBlankIcon
                sx={{ color: "white", cursor: "pointer" }}
              ></CheckBoxOutlineBlankIcon>
            )}</>):(<></>)}
          </Button>
        </div>
      );
    })
  ) : (
    <div className="watchlist-movies-error">
      <h3>Error</h3>
    </div>
  );
  console.log("renderMovies", renderMovies);

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
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
        {renderMovies.length?(<><h2>WatchList</h2></>):(<></>)}
          {values.watchlists.length?(<>
            {tempIds.length?(<><Button
              onClick={handleBulkDelete}
              variant="contained"
              sx={{...styleObj,color: "white", backgroundColor: "#45345f",textTransform: "none"}}
            >
              Delete
            </Button></>):(<></>)}
           </>):(<></>)}
        </Box>
        <div className="movie-container">
          <div>
          {renderMovies.length ? (
              <>
                <Slider {...SettingsC}>{renderMovies}</Slider>
              </>
            ) : (
              <>
                <Grid container height={500} alignItems="center" justifyContent="center">
                  <img src={empty} style={{width:90,height:90}}></img>
                  <Typography variant="h4" color="white" marginLeft={3} marginTop={2}>
                    Your watchlist is empty
                  </Typography>
                </Grid>
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

export default WatchListing;
