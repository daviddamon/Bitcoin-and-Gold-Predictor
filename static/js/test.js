
apiKey =  '_66tvRgY5_szTgfB7aeB'

var url =`https://www.quandl.com/api/v3/datasets/bitstamp/usd.json?&api_key=${apiKey}`;



d3.json(url).then(function(data) {
    console.log(data.dataset);

      
    var x = []
    var y = []

    for (i = 0; i < 14 ; i++) {
        x.push(data.dataset.data[i][0])
        y.push(data.dataset.data[i][3])
    }
      
      var y = y.reverse()
      var x = x.reverse()
    
      var c1 = 'red'

      if (y[0] < y[y.length - 1]) {
        var c1 = 'green'
      } 


      


      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x,
            datasets: [{
                label: 'Closing price of Bitcoin',
                data: y,
                borderColor: c1,
                
                
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

    var x2 = []
    var y2 = []

    for (i = 0; i < 30 ; i++) {
        x2.push(data.dataset.data[i][0])
        y2.push(data.dataset.data[i][3])
    }
      
      var y2 = y2.reverse()
      var x2 = x2.reverse()


      var c2 = 'red'

      if (y2[0] < y2[y2.length - 1]) {
        var c2 = 'green'
      } 



      var ctx2 = document.getElementById('myChart2').getContext('2d');
      var myChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: x2,
            datasets: [{
                label: 'Closing price of Bitcoin',
                data: y2,
                borderColor: c2,
                
                
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

    var x3 = []
    var y3 = []

    for (i = 0; i < 90 ; i++) {
        x3.push(data.dataset.data[i][0])
        y3.push(data.dataset.data[i][3])
    }
      
      var y3 = y3.reverse()
      var x3 = x3.reverse()

      var c3 = 'red'

      if (y3[0] < y3[y3.length - 1]) {
        var c3 = 'green'
      } 


      var ctx2 = document.getElementById('myChart3').getContext('2d');
      var myChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: x3,
            datasets: [{
                label: 'Closing price of Bitcoin',
                data: y3,
                borderColor: c3,
                
                
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
    var pre = d3.selectAll("#prediction")
    // var pre = pre.text()
    
    var y4 = y.reverse();
    var yesterday =y4[0];
    console.log(parseFloat(pre.text()))
    if (parseFloat(pre.text()) < yesterday) {
        pre.style('color', 'red')
      } else {
        pre.style('color', 'green');
      }
    
})

