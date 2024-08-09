var express = require("express")
const {createServer} = require("http");
const {Server} = require("socket.io")

var app = express();
var server = createServer(app);
const io = new Server(server);

app.use(express.static(__dirname+"/public"))

var balls = {
    ball: 0,
    balls: 0,
    ballscount: [],
}

io.on("connection",(socket)=>{
    console.log("new socket connection established",socket.id)
    io.emit("message","jiiiii")
})


app.get("/ball/:score",(req,res)=>{
    var score = +req.params.score
     balls.balls = balls.balls+1;
     if(balls.balls===7){
      balls.balls = 1;
      balls.ballscount = [];
     }
     if(isNaN(score)){
        balls.ballscount.push('W');
     }
     else{
        balls.ballscount.push(score);
     }
     var ballcount = balls.ballscount;
    //  console.log(score,balls.balls,ballcount)
    //  console.log(balls)
   if(typeof(score)=='number'){
        balls.ball = score;
        io.emit("message",balls)
        console.log("if",balls)
    }
    if(isNaN(score)){
        balls.ball = "wicket"
        console.log("else",balls)
        io.emit("message",balls)
    }
})


server.listen(4000,()=>{
    console.log("server is running on port 4000")
})