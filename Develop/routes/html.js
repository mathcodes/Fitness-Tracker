const router = require("express").Router()
const path = require("path").resolve(__dirname, "..")


router.get("/", function(req, res) {
        res.sendFile(path + "/public/index.html")
    }),
    router.get("/exercise", function(req, res) {
        res.sendFile(path + "/public/exercise.html")
    }),
    router.get('/stats', function(req, res) {
        res.sendFile(path + '/public/stats.html')
    });


module.exports = router;