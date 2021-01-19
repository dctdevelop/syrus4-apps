const express = require('express');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

// Import Route
const tempRoute = require('./routes/temp');

// Use View Engine
app.set('view engine', 'ejs');

// Middleware route
app.use('/', tempRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));