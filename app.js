//modulos y configuraciones 
const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname, "./public")

// seteamos la carpeta de recursos estáticos

app.use(express.static(publicPath));

//rutas
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,"./views/home.html"))
});

app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname,"./views/login.html"))
});

app.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname,"./views/register.html"))
});

app.post('/', (req,res) => {
    res.sendFile(path.join(__dirname,"./views/home.html"))
});

app.post('/register', (req,res) => {
    res.sendFile(path.join(__dirname,"./views/home.html"))
});



//levantamos el server 

app.listen(port, ()=>{console.log("Levantando servidor en puerto " + port + ": http://localhost:" + port)
});
