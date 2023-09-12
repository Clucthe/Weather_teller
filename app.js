const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();;
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    const query=req.body.cityname;
    const apikey="11d20180bbb4a07227a4e880ce265da2";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit+"";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const weatherdesc=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(weatherdesc);
            res.write("<h1>the temperature in "+query+" is " + temp + " degrees</h1>" );
            res.write("<img src="+imgurl+">");
            res.send();
        })
    })
})

app.get("/",function(req,res){
   

    
})

app.listen(3000,function(){
    console.log("server started on port 3000");
})