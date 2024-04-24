//Require Dependecies and modules
const express = require("express");
const path = require("path");
const methodOverride =  require('method-override'); // Required for use methods PUT and DELETE
var cookieParser = require('cookie-parser');
const session = require('express-session');
const userloggedMDW = require("./middlewares/userLoggedMDW");
const loggedMDW = require("./middlewares/loggedMDW");
const adminMDW = require("./middlewares/adminMDW");

//Routers dependencies
const mainAPIRoutes = require("./routes/API/mainApiRouter");
const userAPIRoutes = require("./routes/API/usersApiRouter")
const mainRoutes = require("./routes/mainRouter");
const userRoutes = require("./routes/userRouter");
const productsRoutes = require("./routes/productsRouter");
const cartRoutes = require("./routes/cartRouter");
const dashboardRoutes = require("./routes/dashboardRouter");

//Settings
const app = express();
const port = process.env.PORT || 3003;
app.use(express.static('public'));// Set Static Resources folder
app.use(express.urlencoded({ extended: false })); // Required for processing POST method information
app.use(express.json()); // Required for processing POST method information
app.use(methodOverride('_method')); // For overriding method="POST" in forms, with PUT and DELETE
app.use(cookieParser()); // Required for cookies creation
app.use(session({secret: "You know nothing", resave: false, saveUninitialized: false})); // Session Require for login process
app.use(userloggedMDW); // Middleware that set configurations in locals, whether user is logged or not

//Set Template Engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

//Setting Routes

app.use('/', mainRoutes);
app.use("/users", userRoutes);
app.use("/products", productsRoutes);
app.use("/cart", loggedMDW, cartRoutes);
app.use("/dashboard", /* adminMDW, */  dashboardRoutes);
app.use('/api', mainAPIRoutes);
app.use('/api/users', userAPIRoutes);

//error 404
app.use((req,res,next) =>{
    res.status(404).render('allProducts',{
        title: "Pagina no encontrada",
        products: [],
        label: "Error 404 - Pagina no encontrada",
    })
})

//Server Up!
app.listen(port, ()=>{console.log("\n------------------------------------\nLevantando servidor en puerto " + port +  ": \nhttp://localhost:" + port + "\n------------------------------------\n")
});