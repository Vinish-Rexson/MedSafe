const sugarData = {
    labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4'],
    PPBS: [80, 99, 135, 150], // Example values
    FBS: [75, 90, 110, 125] // Example values
};

const sugarMessages = {
    PPBS: value => {
        if (value < 140) return 'Normal. Continue the good.';
        if (value >= 140 && value <= 199) return 'Pre Diabetes. Monitor closely.';
        return 'Diabetes. Consult your doctor.';
    },
    FBS: value => {
        if (value >= 70 && value <= 99) return 'Normal. Continue the good.';
        if (value >= 100 && value <= 126) return 'Pre Diabetes. Monitor closely.';
        return 'Diabetes. Consult your doctor.';
    }
};

let sugarChart;

function updateSugarGraph() {
    const ctx = document.getElementById('sugarChart').getContext('2d');
    
    if (sugarChart) {
        sugarChart.destroy();
    }

    sugarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sugarData.labels,
            datasets: [
                {
                    label: 'PPBS',
                    data: sugarData.PPBS,
                    backgroundColor: 'blue', // Color for PPBS
                    borderColor: 'black',
                    borderWidth: 1,
                    hidden: false // Show PPBS dataset
                },
                {
                    label: 'FBS',
                    data: sugarData.FBS,
                    backgroundColor: 'orange', // Color for FBS
                    borderColor: 'black',
                    borderWidth: 1,
                    hidden: true // Hide FBS dataset initially
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    stacked: false, // Use false to make grouped bars
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
                    text: 'Blood Sugar Levels (PPBS and FBS)',
                    font: {
                        size: 24
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const message = sugarMessages[context.dataset.label](value);
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
                    onClick: (e, legendItem, legend) => {
                        const index = legendItem.datasetIndex;
                        const meta = legend.chart.getDatasetMeta(index);

                        // Toggle the visibility of the clicked dataset
                        meta.hidden = meta.hidden === null ? !legend.chart.data.datasets[index].hidden : null;
                        legend.chart.update();
                    },
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
                        const message = sugarMessages[context.dataset.label](value);
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
                    barPercentage: .8,
                    categoryPercentage: 0.8
                }
            },
            onClick: (e, elements) => {
                if (elements.length > 0) {
                    const elementIndex = elements[0].index;
                    const value = sugarData[elements[0].dataset.label][elementIndex];
                    alert(`${elements[0].dataset.label}: ${value}`);
                }
            }
        }
    });
}

// Initialize with the updated blood sugar graph
updateSugarGraph();
