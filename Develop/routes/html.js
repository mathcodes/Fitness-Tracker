const router = require("express").Router()
const path = require("path").resolve(__dirname, "..")


//And`public` as a whole is served as the static file directory.
router.get("/", function(req, res) {
        res.sendFile(path + "/public/index.html")
    }),
    //* `GET /exercise/` and`GET /stats/` serve`public/exercise.html` and`public/stats.html`, respectively.
    router.get("/exercise", function(req, res) {
        res.sendFile(path + "/public/exercise.html")
    }),
    router.get('/stats', function(req, res) {
        res.sendFile(path + '/public/stats.html')
    });


module.exports = router;