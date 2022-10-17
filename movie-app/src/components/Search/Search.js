import React, { useState } from "react";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { fetchAsyncMovies } from "../../features/movies/movieSlice";
import { fetchAsyncShows } from "../../features/movies/movieSlice";
import { useDispatch } from "react-redux";
import "./Search.scss";
import { Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
const Search = () => {
  const [term, setTerm] = useState("");
  const [value, setValue] = useState(false);
  const dispatch = useDispatch();
  const handleAlert = () => {
    if (term === "") {
      setValue(true);
    } else {
      setValue(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // if(term === ""){
    //   return alert("Please enter search value");
    // }
    if (term !== "") {
      dispatch(fetchAsyncMovies(term));
      dispatch(fetchAsyncShows(term));
    }
    //setTerm("");
  };
  return (
    <div className="search-bar">
      <Snackbar
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        autoHideDuration={500}
        open={value}
        onClose={() => setValue(false)}
      >
        <Alert severity="error">Invalid Search Value</Alert>
      </Snackbar>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={term}
          placeholder="Search Movies or Shows"
          onChange={(e) => setTerm(e.target.value)}
        ></input>
        <button type="submit" onClick={handleAlert}>
          <i className="fa fa-search"></i>
        </button>
      </form>
      {/* <form> */}
          {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-search"
            onChange={(e)=>setTerm(e.target.value)}
            endAdornment={<InputAdornment position="end"><CloseIcon></CloseIcon></InputAdornment>}
            inputProps={{
              'aria-label': 'weight',
            }}
            placeholder="Search Movies or Shows"
            sx={{backgroundColor:"white"}}
          />
        </FormControl> */}
        {/* <IconButton type="submit" aria-label="search" onClick={submitHandler}>
          <SearchIcon style={{ fill: "white" }} />
        </IconButton>
      </form> */}
    </div>
  );
};

export default Search;
