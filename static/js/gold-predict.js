
// Gold price data source: https://www.investing.com/currencies/xau-usd-historical-data

d3.json("/api/gold")
.then(makeChart);
var url = '/api/gold'
d3.json(url).then(function(data) {
   console.log(data)
})
function makeChart(gold) {
   var thirty_day_dateData = gold.date;
   var priceLabels = gold.price;
   var highLabels = gold.high;
   var lowLabels = gold.low;
   var predictLabels = gold.prediction;

   var chart = new Chart('chart30day', {
      type: 'line',
      data: {
         labels: thirty_day_dateData,
         datasets: [
            {
               data: priceLabels,
               label: 'Closing Price',
               backgroundColor: 'rgba(250, 222, 17, 0.5)',
               borderColor: 'rgba(250, 222, 17, 1)',
               pointRadius: 3,
               borderWidth: 2,
               fill: false               
            }, {
               data: predictLabels,
               label: 'Predicted Price',
               backgroundColor: 'rgba(0, 173, 255, 0.5)',
               borderColor: 'rgba(0, 173, 255, 1)',
               pointRadius: 3,
               borderWidth: 2,
               fill: false    
            }, {
               data: highLabels,
               label: 'Daily High',
               backgroundColor: 'rgba(5, 255, 15, 0.5)',
               borderColor: 'rgba(5, 255, 15, 1)',
               pointRadius: 0.5,
               borderWidth: 0.8,
               fill: false               
            }, {
               data: lowLabels,
               label: 'Daily Low',
               backgroundColor: 'rgba(255, 255, 255, 0.15)',
               borderColor: 'rgba(255, 5, 5, 1)',
               pointRadius: 0.5,
               borderWidth: 0.8,
               fill: 2               
            },
         ]
      },
      options: {
         title: {
            display: true,
            fontSize: 24,
            fontColor: 'rgba(64, 224, 208, 1)',
            padding: 15,
            text: "Predicted Gold Prices vs. Actual Gold Prices for Last 30 Days",
         },
         plugins: {
            filler: {
                propagate: true
            }
         },
         elements: {
            line: {
                tension: 0.4
            }
         },
         legend: {
            display: true,
            labels: {
                fontColor: 'rgba(255, 255, 255, 1)',
            }
         },     
         scales: {
            xAxes: [{
               ticks: {
                  fontSize: 12,
                  fontColor: 'rgba(255, 255, 255, 0.8)',
               },
               gridLines: {
                  color: 'rgb(148, 68, 250, 0.6)',
                  borderDash: [2, 5],
               },
               scaleLabel: {
                  display: true,
                  labelString: "Date",
                  fontColor: 'rgba(255, 255, 255, 0.8)',
                  fontSize: 20,
               }
            }],
            yAxes: [{
               ticks: {
                  fontSize: 12,
                  fontColor: 'rgba(255, 255, 255, 0.8)',
               },
               gridLines: {
                  color: 'rgba(148, 68, 250, 0.8)',
                  borderDash: [2, 5],
               },
               scaleLabel: {
                  display: true,
                  labelString: "Price in USD",
                  fontColor: 'rgba(255, 255, 255, 0.8)',
                  fontSize: 20,
               }
            }]      
         }
      }
   });
}