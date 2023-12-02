const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to database"))

app.use(express.json())

const coursesRouter = require('./routes/courses')
app.use('/courses', coursesRouter)

app.listen(port, () => {
    console.log(`Server körs med port ${port}`);
});

