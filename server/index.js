const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Flight Schedule is live on port ${port}`));

app.use(express.static('public'));