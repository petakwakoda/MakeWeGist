// Created my own pusher account @ www.pusher.com

const express = require("express")
const bodyParser = require('body-parser');
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: 'my_app_id'; // App ID
  key: 'my_app_key'; // App Key
  secret: 'my_app_secret'; // App Secret
  cluster: "eu",
  useTLS: true
});

const app = express()

const path = require("path");

app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname,"views","index.html"));}
)

app.post('/updateChat', function(req, res) {
  const object = req.body;
	res.json(object);
	pusher.trigger("my-channel", "my-event", object)
    
	 
})

app.use((req, res)=>{
  res.sendFile(path.join(__dirname,"views","404.html"));
});

module.exports = app
