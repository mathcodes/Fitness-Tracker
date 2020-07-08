const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts"); //see line 16
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    return json[json.length - 1];
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];
    // with id for specific workout, the body is a single exercise that should be appended to array of exercises when you make the request
    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    // POST request - creates empty workout with no exercises with current time
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },
  //sends back the 7 most recent workouts, so use the mongoose query methods to figure this out
  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
