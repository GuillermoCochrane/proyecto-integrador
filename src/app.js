//modulos y configuraciones 
const express = require("express");
const path = require("path");
const app = express();
const mainRoutes = require("./routes/mainRouter")
const userRoutes = require("./routes/userRouter")

const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname, "../")

// seteamos la carpeta de recursos estáticos

app.use(express.static('public'));

//Setemos el template engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

// seteamos rutas

app.use('/', mainRoutes);
app.use("/users", userRoutes);

//levantamos el server 

app.listen(port, ()=>{console.log("Levantando servidor en puerto " + port +  ": \nhttp://localhost:" + port)
});
