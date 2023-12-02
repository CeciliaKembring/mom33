const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
   kurskod: String,
  kursnamn: String,
  kursplan: String,
  progression: String,
  termin: String,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;

