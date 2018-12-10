const express = require("express");
const app = express();
const mongoose = require("mongoose");
const YAML = require("yamljs");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');


const PORT = 3001;

//GLobals
global.lastQuestionID= mongoose.Schema.Types.ObjectId;


// CORS Middleware
app.use(cors());

// Set Static Folder
//app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Index Route
app.get('/', (req, res) => {
    res.send('Heartbeat');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// routing done right
const $routes = YAML.parseFile("./src/config/routing.yml").routes;
for (let route in $routes) {
    route = $routes[route];
    const controllerInfo = route.controller.split(":");
    const Action = require(`./src/controller/${controllerInfo[0]}`)[`${controllerInfo[1]}`];

    (route.methods || ["GET"]).forEach(method => {console.log(method);app[(method || "GET").toLowerCase()](route.path, Action)});
}


const config = require('./src/config/database');
// initialize database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database)
    .then(() => console.log("Mongo connected..."))
    .catch(err => console.log(err));

try {
    app.listen(PORT, () => console.log("Listening on port " + PORT + "!"));
}catch(E){
    console.log("Fatal error avoided: " + E.toString());
}