const data = {
    labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4'],
    HDL: [70, 58, 34, 40], // Example values
    LDL: [80, 120, 150, 180], // Example values
    cholesterol: [214, 198, 200, 240] // Example values
};

const riskColors = {
    HDL: value => {
        if (value >= 55) return 'green'; // No risk
        if (value >= 35 && value < 55) return 'yellow'; // Moderate risk
        return 'red'; // High risk
    },
    LDL: value => {
        if (value < 130) return 'green'; // Optimal
        if (value >= 130 && value <= 159) return 'yellow'; // Borderline
        return 'red'; // High risk
    },
    cholesterol: value => {
        if (value < 200) return 'green'; // Desirable
        if (value >= 200 && value <= 239) return 'yellow'; // Borderline high
        return 'red'; // High risk
    }
};

const uniqueColors = {
    HDL: 'lightyellow',
    LDL: 'orange',
    cholesterol: 'lightgreen'
};

const messages = {
    HDL: value => {
        if (value >= 55) return 'No risk. Good HDL level.';
        if (value >= 35 && value < 55) return 'Moderate risk. Maintain healthy lifestyle.';
        return 'High risk. Consult your doctor.';
    },
    LDL: value => {
        if (value < 130) return 'Optimal LDL level.';
        if (value >= 130 && value <= 159) return 'Borderline LDL level. Monitor your diet.';
        return 'High risk. Consult your doctor immediately.';
    },
    cholesterol: value => {
        if (value < 200) return 'Desirable cholesterol level.';
        if (value >= 200 && value <= 239) return 'Borderline high cholesterol. Monitor closely.';
        return 'High risk. Consult your doctor immediately.';
    }
};

let chart;

function updateGraph() {
    const ctx = document.getElementById('barChart').getContext('2d');
    
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: ['HDL', 'LDL', 'cholesterol'].map(datasetLabel => ({
                label: datasetLabel,
                data: data[datasetLabel],
                backgroundColor: data[datasetLabel].map(value => riskColors[datasetLabel](value)),
                borderColor: 'black',
                borderWidth: 1,
                hidden: datasetLabel !== 'HDL' // Hide all datasets except HDL
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    stacked: false, // Set to false to have bars side by side
                    ticks: {
                        padding: 5,
                        font: {
                            size: 22
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Reference Range (mg/dL)',
                        font: {
                            size: 16,
                            weight: 'bold',
                            color: '#000'
                        }
                    },
                    ticks: {
                        padding: 5,
                        font: {
                            size: 22
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Lipid Levels',
                    font: {
                        size: 24
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const message = messages[context.dataset.label](value);
                            return `Value: ${value}\n${message}`;
                        }
                    },
                    backgroundColor: '#333',
                    titleFont: { size: 20, weight: 'bold' },
                    bodyFont: { size: 18 },
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    displayColors: false,
                    padding: 10,
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                    borderWidth: 1
                },
                legend: {
                    display: true,
                    position: 'top', // Position the legend at the top
                    labels: {
                        font: {
                            size: 18
                        }
                    }
                },
                datalabels: {
                    color: '#000',
                    anchor: 'end',
                    align: 'top',
                    formatter: (value, context) => {
                        const message = messages[context.dataset.label](value);
                        return `${value}\n${message}`;
                    },
                    font: {
                        size: 14
                    },
                    padding: {
                        bottom: 10
                    }
                }
            },
            elements: {
                bar: {
                    borderWidth: 5,
                    borderRadius: 8,
                    maxBarThickness: 100,
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                }
            },
            datasets: {
                bar: {
                    barPercentage: 0.8,
                    categoryPercentage: 0.8
                }
            },
            onClick: (e, elements) => {
                if (elements.length > 0) {
                    const elementIndex = elements[0].index;
                    const value = data[elements[0].dataset.label][elementIndex];
                    alert(`${elements[0].dataset.label}: ${value}`);
                }
            }
        }
    });
}

// Initialize with HDL graph
updateGraph();