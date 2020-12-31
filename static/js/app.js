
apiKey =  '_66tvRgY5_szTgfB7aeB'

var url =`https://www.quandl.com/api/v3/datasets/bitstamp/usd.json?&api_key=${apiKey}`;



d3.json(url).then(function(data) {
    console.log(data.dataset.data[1][0]);

    function unpack(rows, index) {
        return rows.map(function(row) {
          return row[index];
        });
      }
      
    var x = []
    var y = []

    for (i = 0; i < 14 ; i++) {
        x.push(data.dataset.data[i][0])
        y.push(data.dataset.data[i][3])
      }
    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: 'AAPL High',
        x: x,
        y: y,
        line: {color: '#17BECF'}
      }
    var data = [trace1];

    var layout = {
            title: 'Bitcoin end prices over the last 14 days',
        };
Plotly.newPlot('plot', data, layout);
})

    // Grab values from the data json object to build the plots
    // var name = data.dataset.name;
    // var stock = data.dataset.dataset_code;
    // var startDate = data.dataset.start_date;
    // var endDate = data.dataset.end_date;
    // var dates = unpack(data.dataset.data, 0);
    // var closingPrices = unpack(data.dataset.data, 4);
