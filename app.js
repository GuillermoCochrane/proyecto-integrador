//Require Dependecies and modules
const express = require("express");
const path = require("path");
const methodOverride =  require('method-override'); // Required for use methods PUT and DELETE

//Routers dependencies
const mainRoutes = require("./src/routes/mainRouter")
const userRoutes = require("./src/routes/userRouter")
const productsRoutes = require("./src/routes/productsRouter")

//Settings
const app = express();
const port = process.env.PORT || 3003;

app.use(express.static('public'));// Set Static Resources folder
app.use(express.urlencoded({ extended: false })); // Required for processing POST method information
app.use(express.json()); // Required for processing POST method information
app.use(methodOverride('_method')); // For overriding method="POST" in forms, with PUT and DELETE

//Set Template Engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'))

//Setting Routes

app.use('/', mainRoutes);
app.use("/users", userRoutes);
app.use("/products", productsRoutes);

//Server Up! 

app.listen(port, ()=>{console.log("\n------------------------------------\nLevantando servidor en puerto " + port +  ": \nhttp://localhost:" + port + "\n------------------------------------\n")
});
