const workout = require('../models/workoutModel');
const mongoose = require('mongoose')
const createWorkout = (req, res) => {
    const {title, reps, load} = req.body;
    workout.create(req.body)
    .then(() => {
        res.json(req.body)
    })
    .catch((err) => {
        res.json(err)
    });
};

// GET all workouts
const getWorkouts = (req, res) => {
    workout.find({}).then((response) => {
        res.json(response);
    }).catch((err) => {
        res.json(err);
    });
};

const getWorkout = (req, res) => {
    const {id} = req.params;
    workout.findById(id).then( (response) => {
        res.json(response);
    }).catch((err) => {
        res.json(err);
    })
}
const deleteWorkout = (req, res) => {
    const {id} = req.params;
    workout.findOneAndDelete({"_id": id}).then((response) => {
        res.json({"mssg": "It worked!"})
    }).catch(error => {
        res.json({"mssg": "ur broke asf"});
    });
};
const patchWorkout = (req, res) => {
    const {id} = req.params;
    workout.findOneAndUpdate({"_id": id}, {...req.body}).then((response) => {
        res.json({"mssg": "It worked!"})
    }).catch(error => {
        res.json({error});
        console.log('RIP lil bro');
    });
};

module.exports = {createWorkout, getWorkouts, getWorkout, deleteWorkout, patchWorkout}