import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import "./App.scss";
import MovieListing from "./components/MovieListing/MovieListing";
import WatchListing from "./components/WatchListing/WatchListing";
import FavouriteMovieListing from "./components/FavouritesListing/FavouriteMovieListing";
import Login from "./components/Login/Login";
import Protected from "./common/Protected";

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movie/:imdbID" component={MovieDetail} />
            <Protected path="/favourites" component={FavouriteMovieListing} />
            <Protected path="/watchlist" component={WatchListing} />
            <Route path="/Login" component={Login} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
