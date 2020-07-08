// get all workout data from back-end

fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });


API.getWorkoutsInRange()

  function generatePalette() {
    const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
  }
function populateChart(workouts) {
  let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let workoutDayNames = workouts.map((workout) => dayNames[new Date(workout.day).getDay()])
  let totalTimeByExercise = getTotalTimeByExercise(workouts)
  let totalWeightByExercise = getTotalWeightByExercise(workouts)
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: workoutDayNames,
      datasets: [
        {
          label: "Time (minutes)",
          backgroundColor: "red",
          borderColor: "red",
          data: workouts.map((workout) => workout.totalDuration),
          fill: false,
          lineTension: 0 
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        text: "Time (minutes)",
        display: true
      },
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
           label: (tooltipItem) => tooltipItem.yLabel
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: workoutDayNames,
      datasets: [
        {
          label: "Pounds",
          data: workouts.map((workout) =>
            workout.exercises.reduce((acc, exercise) => acc + exerciseTotalWeight(exercise), 0)),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Weight (lbs)"
      },
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
           label: (tooltipItem) => tooltipItem.yLabel
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: Object.keys(totalTimeByExercise),
      datasets: [
        {
          label: "Total Time by Exercise (minutes)",
          backgroundColor: colors,
          data: Object.values(totalTimeByExercise)
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Total Time by Exercise (minutes)"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: Object.keys(totalWeightByExercise),
      datasets: [
        {
          label: "Total Weight by Exercise (lbs)",
          backgroundColor: colors,
          data: Object.values(totalWeightByExercise)
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Total Weight by Exercise (lbs)"
      }
    }
  });
}

function getTotalTimeByExercise(workouts) {
  let totalTimeByExercise = {}

  workouts.forEach(workout => {
    workout.exercises.forEach(exercise => {
      totalTimeByExercise[exercise.name] = exercise.duration + (totalTimeByExercise[exercise.name] || 0)
    });
  });

  return totalTimeByExercise
}

function getTotalWeightByExercise(workouts) {
  let totalWeightByExercise = {}

  workouts.forEach(workout => {
    workout.exercises
      .filter((exercise) => exercise.type === 'resistance')
      .forEach(exercise => {
        totalWeightByExercise[exercise.name] = exerciseTotalWeight(exercise) + (totalWeightByExercise[exercise.name] || 0)
      });
  });

  return totalWeightByExercise
}

function exerciseTotalWeight(exercise) {
  return (exercise.weight * exercise.reps * exercise.sets) || 0
}