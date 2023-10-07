//modulos y configuraciones 
const express = require("express");
const path = require("path");
const app = express();
const mainRoutes = require("./src/routes/mainRouter")
const userRoutes = require("./src/routes/userRouter")
const productsRoutes = require("./src/routes/productsRouter")

const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname, "./public")

// seteamos la carpeta de recursos estáticos

app.use(express.static('public'));

//Setemos el template engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'))

// seteamos rutas

app.use('/', mainRoutes);
app.use("/users", userRoutes);
app.use("/products", productsRoutes);

//levantamos el server 

app.listen(port, ()=>{console.log("\n------------------------------------\nLevantando servidor en puerto " + port +  ": \nhttp://localhost:" + port + "\n------------------------------------\n")
});
