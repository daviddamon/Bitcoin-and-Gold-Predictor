var url = '/api/v1'
d3.json(url).then(function(data) {
    console.log(data.predcitions)
    var labels = data.labels;
    var predictions = data.predcitions;
    var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Actual Bitcoin price',
                data: labels,
                borderColor: 'blue',
                fill: true     
            },{
                label: 'Our predictions',
                data: predictions,
                borderColor: 'red',
                fill: true    
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
})
