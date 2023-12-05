const express = require('express');
const workout = require('../models/workoutModel');
const {createWorkout, 
    getWorkouts, getWorkout, 
    deleteWorkout, patchWorkout} = require('../controllers/workoutController')
const router = express.Router();

// GET all workouts
router.get('/', getWorkouts);

router.get('/:id', getWorkout);


router.post('/', createWorkout);


router.delete('/:id', deleteWorkout);


router.patch('/:id', patchWorkout);
module.exports = router;