const express = require('express');
const ejs = require('ejs');
const path = require('path');
const multer = require('multer');

//Inicializacion
const app = express();

//========== Settings ==========
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//========== Middleware ==========
app.use(multer({
    dest: path.join(__dirname,'public/uploads')
}).single('image'));

//Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', (req, res) => {
    console.log(req.file);
    
    res.send('Uploaded!');
});

//Star the server
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
})