const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    kurskod: { type: String, required: true },
    kursnamn: { type: String, required: true },
    kursplan: { type: String, required: true },
    progression: { type: String, required: true },
    termin: { type: String, required: true },
}, { timestamps: true });

courseSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;  
        delete ret._id;
        delete ret.__v;
    },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
