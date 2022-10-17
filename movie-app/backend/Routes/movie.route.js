let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
  
// Student Model
let movieSchema = require("../models/favData");
  
// CREATE Fav Movie
router.post("/create-fav", (req, res, next) => {
    movieSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

//READ Fav Movie
router.get('/',(req,res)=>{
    movieSchema.find((error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    })
});

module.exports = router;