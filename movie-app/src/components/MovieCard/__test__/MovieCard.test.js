import React from "react";
import ReactDOM from "react-dom/client";
import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import MovieCard from "../MovieCard";
import { Provider } from 'react-redux';
import { store } from "../../../features/Store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { IconButton } from "@mui/material";

test('renders movie card',async()=>{
    render(
    <Provider store={store}>
        <Router>
        <MovieCard key={0} data={{
          Title: 'Harry Potter and the Deathly Hallows: Part 2',
          Year: '2011',
          imdbID: 'tt1201607',
          Type: 'movie',
          Poster: 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg'
        }}></MovieCard>
        </Router>
    </Provider>);
    const watchButton = screen.getByRole('IconButton', {
        name: /watch/i
      })
    expect(watchButton.contains(<BookmarkOutlinedIcon></BookmarkOutlinedIcon>));
    const favButton = screen.getByRole('IconButton', {
        name: /favourites/i
      })

});