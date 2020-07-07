const mongoose = require('mongoose');


const Schema = mongoose.Schema;

let WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            required: "Exercise requires type"
        },
        name: {
            type: String,
            required: "Name is needed!",
            trim: true
        },
        duration: {
            type: Number,
            required: "Please set the duration"
        },
        distance: {
            type: Number
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        }

    }]


});

const Workout = mongoose.model("workout", WorkoutSchema);
module.exports = Workout;