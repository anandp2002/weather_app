const express=require("express");
const app=express();
const bodyParser=require("body-parser")

app.set("view engine", "ejs");

const https=require("https");

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index2.html")
})

app.use(express.static("public"))
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/js'));



app.post("/",function(req,res){
    const query=req.body.cityName
    const apikey="06e94be735aee01e7a0b2fce0bdad878"
    const unit="metric"
    url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit
    https.get(url,function(response){
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const weatherDescription=weatherData.weather[0].description
        const id=weatherData.weather[0].icon
        const imageurl="https://openweathermap.org/img/wn/"+id+"@2x.png"
        
        res.render("weather" , {query:query,temp:temp,weatherDescription:weatherDescription,imageurl:imageurl})

    })
})
})
const PORT=process.env.PORT || 5000

app.listen(PORT,function(){
    console.log("server is running on port 3000");
})