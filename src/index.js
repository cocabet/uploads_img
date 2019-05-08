const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

//Inicializacion
const app = express();

//========== Settings ==========
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//========== Middleware ==========
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

app.use(multer({
    storage,
    dest: path.join(__dirname,'public/uploads'),
    limits: {fileSize: 2000000}
}).single('image'));

//Routes
app.use(require('./routes/routes'));

//Star the server
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
})