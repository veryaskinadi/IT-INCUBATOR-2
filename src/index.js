"use strict";
const express = require('express');
const app = express();
const port = 5000;
app.get('/', (req, res) => {
    let helloMessage = "Hello friend";
    res.send(helloMessage);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
