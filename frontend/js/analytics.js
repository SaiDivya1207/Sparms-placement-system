async function fetchAnalytics() {

    try {

        const response = await fetch("http://127.0.0.1:5000/analytics");

        const data = await response.json();

        document.getElementById("totalStudents").innerText =
        data.total_students;

        document.getElementById("selectedStudents").innerText =
        data.selected_students;

        document.getElementById("totalCompanies").innerText =
        data.total_companies;

        document.getElementById("placementPercentage").innerText =
        data.placement_percentage + "%";

    }

    catch(error) {

        console.log("Analytics Error:", error);

    }

}

fetchAnalytics();


// CHART 1

const placementChart = document.getElementById('placementChart');

new Chart(placementChart, {

    type: 'bar',

    data: {

        labels: ['CSE', 'ECE', 'EEE', 'MECH'],

        datasets: [{

            label: 'Placements',

            data: [120, 80, 50, 30],

            borderWidth: 1

        }]

    }

});


// CHART 2

const hiringChart = document.getElementById('hiringChart');

new Chart(hiringChart, {

    type: 'line',

    data: {

        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],

        datasets: [{

            label: 'Hiring Trend',

            data: [5, 10, 7, 15, 20],

            borderWidth: 2

        }]

    }

});