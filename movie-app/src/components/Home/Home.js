import React, { useEffect ,useState} from "react";
import { useDispatch } from "react-redux";
import MovieListing from "../MovieListing/MovieListing";
import { fetchAsyncMovies } from "../../features/movies/movieSlice";
import { fetchAsyncShows } from "../../features/movies/movieSlice";
import {useHistory,useLocation} from "react-router-dom";
import { Snackbar } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

const Home = () => {
  const movieText = "Harry";
  const showText = "Friends";
  let text="";
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [val,setVal]=useState(false);
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
    console.log("location",location);
    if(history.location.state && (history.location.state.from==="login" || history.location.state.from==="logout")&&localStorage.getItem("count")==='1'){
      localStorage.setItem("count",'0');
       window.location.reload(false);
       if(history.location.state.from==="login"){
        text="Logged in Successfully";
       }
       else{
        text="Logged out Successfully";
       }
       setVal(true);
    }
  },[dispatch]);
  return (
    <div>
      <div className="banner-img"></div>
      <Snackbar
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        autoHideDuration={500}
        open={val}
        onClose={()=>setVal(false)}
      >
        <Alert severity="info">{text}</Alert>
      </Snackbar>
      <MovieListing></MovieListing>
    </div>
  );
};

export default Home;
