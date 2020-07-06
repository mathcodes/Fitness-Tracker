const router = require('express').Router();
const Workout = require('../models/workout');

//`GET /api/workouts` sends an array of all workouts.
router.get('/api/workouts', function(req, res) {
    Workout.find({}).then(function(workouts) {
        res.json(workouts);
    })
});
//* `PUT /api/workouts/:id`appends the request body to the`exercises` array of the identified workout, then sends the updated workout.
router.put('/api/workouts/:id', function(req, res) {
    Workout.findOne({ _id: req.params.id }).then(function(workout) {
        workout.exercises.push(req.body);

        Workout.findOneAndUpdate({ _id: req.params.id }, { exercises: workout.exercises }, (err, doc, op) => {
            if (err) throw new err;
        });
        res.json(workout);
    })
});

// * `POST /api/workouts/` adds a new workout and sends it. New workouts have no exercises, and their `day` field is set to the current time.
router.post('/api/workouts', function(req, res) {
    Workout.create({}, function(err, newWorkout) {
        if (err) throw new err;
        res.json(newWorkout)
    })
});

//* `GET /api/workouts/range` sends an array of the 7 most recent workouts.
router.get('/api/workouts/range', function(req, res) {
    Workout.find({}).then(function(workouts) {
        res.json(workouts);
    })
});
//* `GET /exercise/` and`GET /stats/` serve`public/exercise.html` and`public/stats.html`, respectively.(And`public` as a whole is served as the static file directory.)


module.exports = router;