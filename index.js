//Require Dependecies and modules
const express = require("express");
const path = require("path");
const methodOverride =  require('method-override'); // Required for use methods PUT and DELETE
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userloggedMDW = require("./src/middlewares/userLoggedMDW");
const loggedMDW = require("./src/middlewares/loggedMDW");
const adminMDW = require("./src/middlewares/adminMDW");
const cronJobs = require("./src/functions/cron");
const endpointCron = "https://multihogar.onrender.com/api/up"; 

//Routers dependencies
const mainAPIRoutes = require("./src/routes/API/mainApiRouter");
const userAPIRoutes = require("./src/routes/API/usersApiRouter")
const mainRoutes = require("./src/routes/mainRouter");
const userRoutes = require("./src/routes/userRouter");
const productsRoutes = require("./src/routes/productsRouter");
const cartRoutes = require("./src/routes/cartRouter");
const dashboardRoutes = require("./src/routes/dashboardRouter");

//Settings
const app = express();
const port = process.env.PORT || 3003;
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: false })); // Required for processing POST method information
app.use(express.json()); // Required for processing POST method information
app.use(methodOverride('_method')); // For overriding method="POST" in forms, with PUT and DELETE
app.use(cookieParser()); // Required for cookies creation
app.use(session({secret: "You know nothing", resave: false, saveUninitialized: false})); // Session Require for login process
app.use(userloggedMDW); // Middleware that set configurations in locals, whether user is logged or not

//Set Template Engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

//Setting Routes

app.use('/', mainRoutes);
app.use("/users", userRoutes);
app.use("/products", productsRoutes);
app.use("/cart", loggedMDW, cartRoutes);
app.use("/dashboard", adminMDW,  dashboardRoutes);
app.use('/api', mainAPIRoutes);
app.use('/api/users', userAPIRoutes);

//error 404
app.use((req,res,next) =>{
    res.status(404).render("products/allProducts",{
        title: "Página no encontrada",
        products: [],
        label: "Error 404 - Página no encontrada",
    })
})

cronJobs(endpointCron);

//Server Up!
app.listen(port, ()=>{console.log("\n------------------------------------\nLevantando servidor en puerto " + port +  ": \nhttp://localhost:" + port + "\n------------------------------------\n")
});