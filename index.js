import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import json from "json";

const app = express();
const port = 3000;
const API_URL = "https://api.magicthegathering.io/v1/cards";

let items;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { result: items } || {result : {name : "no data"}});
    
});

app.post("/query", async (req,res)=>{
    //try catch stuff maybe here?
    const data = { type : req.body.filter, colour : req.body.colour};
    items =  (await (axios.get(API_URL + `?subtypes=${data.type}`))).data;
    res.redirect("/");
});


app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
}); 