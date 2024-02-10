// Código JavaScript para generar el gráfico utilizando la API de QuickChart.io
document.addEventListener("DOMContentLoaded", function() {
    // Función para validar la entrada
    function validarEntrada() {
        var labelsInput = document.getElementById('data-labels').value;
        var valuesInput = document.getElementById('data-values').value;
        var chartColor = document.getElementById('chart-color').value;

        if (!labelsInput || !valuesInput || !chartColor.match(/^#([0-9a-f]{3}){1,2}$/i)) {
            alert("Por favor, ingresa datos válidos en los campos de entrada.");
            return false;
        }
        return true;
    }

    // Función para actualizar el gráfico con validación de entrada
    function updateChart() {
        if (!validarEntrada()) {
            return;
        }

        var chartType = document.getElementById('chart-type').value;
        var chartTitle = document.getElementById('chart-title').value;
        var axisTitleX = document.getElementById('axis-title-x').value;
        var axisTitleY = document.getElementById('axis-title-y').value;
        var legendPosition = document.getElementById('legend-position').value;
        var fontSize = document.getElementById('font-size').value;
        var labelsInput = document.getElementById('data-labels').value;
        var valuesInput = document.getElementById('data-values').value;
        var chartColor = document.getElementById('chart-color').value;

        var labels = labelsInput.split(',');
        var values = valuesInput.split(',').map(Number);

        var chartData = {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: chartTitle,
                    data: values,
                    backgroundColor: chartColor
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: axisTitleX
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: axisTitleY
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: legendPosition
                    },
                    title: {
                        display: true,
                        text: chartTitle,
                        font: {
                            size: fontSize
                        }
                    }
                }
            }
        };

        var chartDataJson = JSON.stringify(chartData);
        var apiUrl = 'https://quickchart.io/chart?c=' + encodeURIComponent(chartDataJson);

        var chartImg = document.createElement('img');
        chartImg.src = apiUrl;

        var chartContainer = document.getElementById('chart-container');
        chartContainer.innerHTML = '';
        chartContainer.appendChild(chartImg);
    }

    // Agregar un evento al botón para actualizar el gráfico cuando se hace clic
    document.getElementById('update-chart').addEventListener('click', updateChart);

    // Agregar un evento al botón para descargar el gráfico cuando se hace clic
    document.getElementById('download-chart').addEventListener('click', function() {
        var chartContainer = document.getElementById('chart-container');
        var chartImg = chartContainer.querySelector('img');
        var link = document.createElement('a');
        link.href = chartImg.src;
        link.download = 'chart.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
