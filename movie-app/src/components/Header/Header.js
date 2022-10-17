import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
// import user from "../../images/user.png";
import "./Header.scss";
import { fetchAsyncMovies } from "../../features/movies/movieSlice";
import { fetchAsyncShows } from "../../features/movies/movieSlice";
import movieIcon from "../../images/movieIcon.png";
import fav from "../../images/fav.png";
import watch from "../../images/watch.png";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import {Box} from "@mui/material";
import { Redirect } from "react-router-dom";
import { gapi } from 'gapi-script';
import { GoogleLogout } from 'react-google-login';
import {Grid} from "@mui/material";
const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useHistory();
  const clientId =
  "939399432671-lvbca7459s546fksaind07cfr91r6vkc.apps.googleusercontent.com";
  const [log,setLog]=useState(localStorage.getItem('key') ? true:false);
  useEffect(() => {
    const initClient = async () => {
        gapi.client.init({
            clientId: clientId,
            scope: ''
        });
    };
    gapi.load('client:auth2', initClient);
});
  const onLogout = () => {
    console.log("navigate", navigate);
    localStorage.clear();
    setLog(localStorage.getItem('key') ? true:false);
   // navigate.goBack(null);
    // window.location.href = "/";
    localStorage.setItem("count",'1');
    navigate.push(`/`, { from: "logout" });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/" state={{ name: "home" }}>
          <Tooltip title={<h2 style={{ color: "white" }}>Home</h2>}>
            <img src={movieIcon} style={{marginBottom:"10px"}}></img>
          </Tooltip>
        </Link>
        <Link
          to={!localStorage.getItem("key") ? "/Login" : "/favourites"}
          state={{ name: "fav" }}
        >
          <Tooltip title={<h2 style={{ color: "white" }}>Favourites</h2>}>
            <img src={fav} style={{marginBottom:"7px"}}></img>
          </Tooltip>
        </Link>
        <Link
          to={!localStorage.getItem("key") ? "/Login" : "/watchlist"}
          state={{ name: "watch" }}
        >
          <Tooltip title={<h2 style={{ color: "white" }}>Watch List</h2>}>
            <img src={watch} style={{width:"50px",height:"40px",marginBottom:"9px"}}></img>
          </Tooltip>
        </Link>
      </div>
      {/* <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies or Shows"
            onChange={(e) => setTerm(e.target.value)}
          ></input>
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div> */}
      <Box sx={{ display: 'flex',marginRight:20 }}>
      <LiveTvOutlinedIcon sx={{fontSize:37,color:"white"}}></LiveTvOutlinedIcon>
      <Typography variant="h4" component="h2" sx={{color:"white",marginRight:10}}>
        Movie App
      </Typography>
      </Box>
      <div className="user-image">
        {log ? (
          // <Link to="/">
          <Tooltip title={<h2 style={{ color: "white" }}>Logout</h2>}>
            {localStorage.getItem("mode")&&localStorage.getItem("mode")==="Google"?(
              <Grid container justifyContent="center" alignItems="center" >
                <Grid item xs="auto" marginRight={4}>
                <GoogleLogout clientId={clientId} buttonText="LOG OUT" onLogoutSuccess={onLogout}/>
                </Grid>
              </Grid>
            ):(<><LogoutIcon
              onClick={onLogout}
              sx={{ fontSize: 50, color: "white", cursor: "pointer" }}
            ></LogoutIcon></>)}
          </Tooltip>
        ) : (
          // </Link>
          <Link to="/Login">
            <Tooltip title={<h2 style={{ color: "white" }}>Login</h2>}>
              <LoginIcon sx={{ fontSize: 50 }}></LoginIcon>
            </Tooltip>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
