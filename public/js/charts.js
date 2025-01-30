let cpuChart, memChart;
const cpuData = Array(60).fill(0);
const memData = Array(60).fill(0); // Only used memory

function updateCPUChart(cpu) {
    cpuData.push(cpu.currentLoad.toFixed(2));
    cpuData.shift();

    if (cpuChart) {
        cpuChart.data.datasets[0].data = cpuData;
        cpuChart.update('none'); // Update without animation
    } else {
        const ctx = document.getElementById('cpuChart').getContext('2d');
        cpuChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(60).fill(''),
                datasets: [{
                    label: 'CPU Usage (%)',
                    data: cpuData,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0 // Remove dots
                }]
            },
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(200, 200, 200, 0.2)'
                        }
                    },
                    x: {
                        display: false
                    }
                }
            }
        });
    }
}

function updateMemChart(mem) {
    const totalMem = (mem.total / 1073741824).toFixed(2); // Total memory in GB
    memData.push((mem.used / 1073741824).toFixed(2)); // Used memory in GB
    memData.shift();

    if (memChart) {
        memChart.data.datasets[0].data = memData;
        memChart.options.scales.y.max = totalMem; // Set max to total memory
        memChart.update('none'); // Update without animation
    } else {
        const ctx = document.getElementById('memChart').getContext('2d');
        memChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(60).fill(''), // Remove seconds
                datasets: [{
                    label: 'Used Memory (GB)',
                    data: memData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0 // Remove dots
                }]
            },
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: totalMem, // Set max to total memory
                        grid: {
                            color: 'rgba(200, 200, 200, 0.2)'
                        }
                    },
                    x: {
                        display: false // Remove seconds
                    }
                }
            }
        });
    }
}

const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
        duration: 1000,
        easing: 'easeInOutQuad'
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(200, 200, 200, 0.2)'
            }
        },
        x: {
            grid: {
                color: 'rgba(200, 200, 200, 0.2)'
            }
        }
    },
    plugins: {
        legend: {
            display: true,
            labels: {
                color: 'rgba(75, 192, 192, 1)'
            }
        },
        tooltip: {
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 4
        }
    }
};