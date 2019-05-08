const { Router } = require('express');
const router = Router();

//Routes
router.get('/', (req, res) => {
    res.render('index');
});

router.post('/upload', (req, res) => {
    console.log(req.file);
    
    res.send('Uploaded!');
});

module.exports = router;