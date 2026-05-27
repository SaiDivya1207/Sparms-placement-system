const ctx = document.getElementById('placementChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['CSE', 'ECE', 'EEE', 'MECH'],
        datasets: [{
            label: 'Placed Students',
            data: [90, 75, 55, 40],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});