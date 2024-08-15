const vitaminData = {
    labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4'],
    B12: [200, 50, 90, 110],
    D3: [85, 100, 155, 65]
};

const vitaminMessages = {
    'Vitamin B12': value => {
        if (value >= 160 && value <= 1000) return 'Normal. Keep it up.';
        if (value >= 100 && value < 160) return 'Borderline/Mild deficiency. Consider supplementing.';
        return 'Severe deficiency. Consult your doctor.';
    },
    'Vitamin D3': value => {
        if (value < 30) return 'Deficient. Consider supplementing.';
        if (value >= 30 && value <= 50) return 'Insufficient. Monitor and supplement if necessary.';
        return 'Optimal. Maintain your levels.';
    }
};


let vitaminChart;

function updateVitaminGraph() {
    const ctx = document.getElementById('vitaminChart').getContext('2d');

    if (vitaminChart) {
        vitaminChart.destroy();
    }

    vitaminChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: vitaminData.labels,
            datasets: [
                {
                    label: 'Vitamin B12',
                    data: vitaminData.B12,
                    backgroundColor: 'green',
                    borderColor: 'black',
                    borderWidth: 1,
                    hidden: false
                },
                {
                    label: 'Vitamin D3',
                    data: vitaminData.D3,
                    backgroundColor: 'yellow',
                    borderColor: 'black',
                    borderWidth: 1,
                    hidden: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    stacked: false,
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
                        text: 'Reference Range',
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
                    text: 'Vitamin Levels (B12 and D3)',
                    font: {
                        size: 24
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const message = vitaminMessages[context.dataset.label](value);
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
                        const message = vitaminMessages[context.dataset.label](value);
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
                    const value = vitaminData[elements[0].dataset.label][elementIndex];
                    alert(`${elements[0].dataset.label}: ${value}`);
                }
            }
        }
    });
}

updateVitaminGraph();
