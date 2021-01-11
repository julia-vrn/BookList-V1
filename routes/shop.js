//what the user sees
const express = require('express');
const path = require('path');
const rootDir = require('../utilities/path');
const router = express.Router();
//mini express app pluggable to another express app

router.get('/', (req, res)=> {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html')); // ../ go up one directory
    //res.send('hello from home route');
});

module.exports = router;

