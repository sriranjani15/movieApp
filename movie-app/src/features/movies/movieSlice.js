import { StarTwoTone } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
import movieApi from "../../common/apis/movieApi";
import { ApiKey } from "../../common/apis/movieApiKey";

 export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies',async (term) => {
    const response = await movieApi.get(`?apikey=${ApiKey}&s=${term}&type=movie`);
    return response.data;
});

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows',async (term) => {
    const response = await movieApi.get(`?apikey=${ApiKey}&s=${term}&type=series`);
    return response.data;
});

export const fetchAsyncMovieOrshowDetail = createAsyncThunk('movies/fetchAsyncMovieOrshowDetail',async (id) => {
    const response = await movieApi.get(`?apikey=${ApiKey}&i=${id}&Plot=full`);
    return response.data;
});



const initialState = {
  movies: {},
  shows : {},
  selectedMovieOrShow : {},
  favourites:[],
  favouritesData:[],
  watchlistData:[],
  watchlists:[],
  isLoading : false,
  tempFav:[],
  tempWat:[],
  recentlyViewed:[]
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow : (state) => {
        state.selectedMovieOrShow = {};
    },
    addToFavourites : (state,id)=>{
        console.log(id);
        state.favourites.push(id.payload[0]);
        // state.movies.Search.forEach((obj)=>{
        //     if(obj.imdbID===id.payload){
        //         state.favouritesData.push(obj);
        //     }
        // });
        // state.shows.Search.forEach((obj)=>{
        //     if(obj.imdbID===id.payload){
        //         state.favouritesData.push(obj);
        //     }
        // });
        if(Object.keys(state.selectedMovieOrShow).length === 0){
            state.favouritesData.push(id.payload[1]);
        }
        else{
            state.favouritesData.push(state.selectedMovieOrShow);
        }
    },
    removeFromFavourites:(state,id)=>{
        const index=state.favourites.indexOf(id.payload);
        console.log("index splice",index);
        console.log("id",id);
        const temp=[];
        state.favouritesData.forEach((obj)=>{
            if(obj.imdbID!==id.payload){
                temp.push(obj);
            }
        });
        state.favouritesData=[];
        if(temp.length){
            state.favouritesData=temp;
        }
 
        if(index>-1){
            state.favourites.splice(index,1);
            console.log("array after splice",state.favourites);
        }
    },
    addToWatchlist : (state,id)=>{
        state.watchlists.push(id.payload[0]);
        // state.movies.Search.forEach((obj)=>{
        //     if(obj.imdbID===id.payload){
        //         state.watchlistData.push(obj);
        //     }
        // });
        // state.shows.Search.forEach((obj)=>{
        //     if(obj.imdbID===id.payload){
        //         state.watchlistData.push(obj);
        //     }
        // });
        if(Object.keys(state.selectedMovieOrShow).length === 0){
            state.watchlistData.push(id.payload[1]);
        }
        else{
            state.watchlistData.push(state.selectedMovieOrShow);
        }
    },
    removeFromWatchlist:(state,id)=>{
        const index=state.watchlists.indexOf(id.payload);
        console.log("index splice",index);
        console.log("id",id);
        const temp=[];
        state.watchlistData.forEach((obj)=>{
            if(obj.imdbID!==id.payload){
                temp.push(obj);
            }
        });
        state.watchlistData=[];
        if(temp.length){
            state.watchlistData=temp;
        }
 
        if(index>-1){
            state.watchlists.splice(index,1);
            console.log("array after splice",state.watchlists);
        }
    },
    addToTempFavourites : (state,id)=>{
        console.log(id);
        state.tempFav.push(id.payload);
    },
    removeFromTempFavourites: (state,id)=>{
        state.tempFav.splice(state.tempFav.indexOf(id.payload),1);
    },
    removeAllFromTempFavourites: (state)=>{
        state.tempFav=[];
    },
    bulkDeleteFromFavourites : (state)=>{
        state.tempFav.forEach((id)=>{
            const index=state.favourites.indexOf(id);
            const temp=[];
            state.favouritesData.forEach((obj)=>{
                if(obj.imdbID!==id){
                    temp.push(obj);
                }
            });
            state.favouritesData=[];
            if(temp.length){
                state.favouritesData=temp;
            }
     
            if(index>-1){
                state.favourites.splice(index,1);
                console.log("array after splice",state.favourites);
            }
        });
        state.tempFav=[];
    },
    addToTempWatchlist : (state,id)=>{
        console.log(id);
        state.tempWat.push(id.payload);
    },
    removeFromTempWatchlist: (state,id)=>{
        state.tempWat.splice(state.tempWat.indexOf(id.payload),1);
    },
    removeAllFromTempWatchlist: (state)=>{
        state.tempWat=[];
    },
    bulkDeleteFromWatchlist : (state)=>{
        state.tempWat.forEach((id)=>{
            const index=state.watchlists.indexOf(id);
            const temp=[];
            state.watchlistData.forEach((obj)=>{
                if(obj.imdbID!==id){
                    temp.push(obj);
                }
            });
            state.watchlistData=[];
            if(temp.length){
                state.watchlistData=temp;
            }
     
            if(index>-1){
                state.watchlists.splice(index,1);
                console.log("array after splice",state.watchlists);
            }
        });
        state.tempWat=[];
    },
    removeRecentlyViewed : (state)=>{
        state.recentlyViewed=[];
    }
},
  extraReducers : {
    [fetchAsyncMovies.pending] : (state) =>{
        state.isLoading = true;
        console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled] : (state,{ payload }) =>{
        console.log("Fetched Successfully");
        return {...state,movies : payload,isLoading : false};
    },
    [fetchAsyncMovies.rejected] : (state,{ payload }) =>{
        console.log("Rejected");
    },
    [fetchAsyncShows.fulfilled] : (state,{ payload }) =>{
        console.log("Fetched Successfully");
        return {...state,shows : payload,isLoading : false};
    },
    [fetchAsyncMovieOrshowDetail.fulfilled] : (state,{ payload }) =>{
        console.log("Fetched Successfully");
        for (var i=0; i<state.recentlyViewed.length; i++) { 
            if (JSON.stringify(state.recentlyViewed[i]) === JSON.stringify(payload) ) {
                return {...state,selectedMovieOrShow : payload};
             }
       }
        return {...state,selectedMovieOrShow : payload,recentlyViewed:[...state.recentlyViewed,payload]};
    },
  }
});

export const {removeSelectedMovieOrShow,addToFavourites,removeFromFavourites,removeFromWatchlist,addToWatchlist,addToTempFavourites,removeFromTempFavourites,
    bulkDeleteFromFavourites,addToTempWatchlist,bulkDeleteFromWatchlist,removeFromTempWatchlist,removeRecentlyViewed,removeAllFromTempFavourites,removeAllFromTempWatchlist} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;