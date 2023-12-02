const express = require('express');
const router = express.Router();
const Course = require('../models/course');


//GET all
router.get('/', async (req, res) => {
try {
    const courses = await Course.find()
    res.json(courses)
} catch (error){
    res.status(500).json({ message: error.message})
}
})

//GET one
router.get('/:id', getCourse, (req, res) => {
   res.json(res.course)
   
})

//POST one
router.post('/', async (req, res) => {
    const course = new Course({
        kurskod: req.body.kurskod,
        kursnamn: req.body.kursnamn,
        kursplan: req.body.kursplan,
        progression: req.body.progression,
        termin: req.body.termin,
    }) 
    try{
        const newCourse = await course.save()
        res.status(201).json(newCourse)

    } catch (error){
        res.status(400).json({message: error.message})

    }
})

//DELETE one
router.delete('/:id', getCourse, async (req, res) => {
    try {
        await res.course.deleteOne(); 
        res.json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Function for getting ID
async function getCourse(req, res, next) {
    let course;
    try {
        course = await Course.findById(req.params.id);
        if (course === null) {
            return res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.course = course;
    next();
}


module.exports = router