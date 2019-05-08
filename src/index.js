const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4')

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
        cb(null, uuid()+ path.extname(file.originalname)
        .toLocaleLowerCase());
    }
});

app.use(multer({
    storage,
    dest: path.join(__dirname,'public/uploads'),
    limits: {fileSize: 2000000}, 
    fileFilter: (req, file, cb) => {
        const  filetypes = /jpg|jpeg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));

        if(mimetype && extname){
            return cb(null, true)
        }
        cb("Error: Archivo debe ser una imagen valida");
    }
}).single('image'));

//Routes
app.use(require('./routes/routes'));

//Static files
app.use(express.static(path.join(__dirname,'public')));

//Star the server
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
})