const trafficData = {
  labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
  datasets: [{
    data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],

    pointRadius: 6,
    pointBorderWidth: 2,
    pointBorderColor: "#7477bf",
    pointBackgroundColor: "#fff",

    lineTension: 0,
    borderWidth: 1,
    borderColor: "#7477bf",
    backgroundColor: "rgba(116, 119, 191, 0.3)"
  }]
};

const trafficOptions = {
  aspectRatio: 4,
  animation: {
    duration: 0
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  legend: {
    display: false
  }
};

const trafficCanvas = document.getElementById("traffic_canvas");
let trafficChart = new Chart(trafficCanvas, {
  type: "line",
  data: trafficData,
  options: trafficOptions
});

// ===========
// DAILY
// ===========

const dailyData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [{
    label: "# of Hits",
    data: [75, 115, 175, 125, 225, 200, 100],
    backgroundColor: "#7477BF",
    borderWidth: 1
  }]
};

const dailyOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  legend: {
    display: false
  }
};

const dailyCanvas = document.getElementById("daily_canvas");
let dailyChart = new Chart(dailyCanvas, {
  type: "bar",
  data: dailyData,
  options: dailyOptions
});

// ===========
// MOBILE
// ===========

const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [{
    label: "# of Users",
    data: [2000, 550, 500],
    borderWidth: 0,
    backgroundColor: ["#7477BF", "#78CF82", "#51B6C8"]
  }]
};

const mobileOptions = {
  legend: {
    position: "right",
    labels: {
      boxWidth: 20,
      fontStyle: "bold"
    }
  }
};

const mobileCanvas = document.getElementById("mobile_canvas");
let mobileChart = new Chart(mobileCanvas, {
  type: "doughnut",
  data: mobileData,
  options: mobileOptions
});

let myAlert = document.getElementById("alert");
let cross = document.getElementById("cross");
let notice = document.getElementById("notice");

cross.addEventListener("click", function (e) {
  e.preventDefault();
  myAlert.parentNode.removeChild(myAlert);
  notice.parentNode.removeChild(notice);
});

let myForm = document.getElementById("myForm");
let msg = document.getElementById("myForm_msg");
let user = document.getElementById("myForm_user");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!user.value)
    alert("You must enter a user to message.");
  else if (!msg.value)
    alert("You must enter a message for the user.")
  else
    alert("Your message has been sent to " + msg.value + "!");
});