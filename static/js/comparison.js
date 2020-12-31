// Gold price data source: https://www.investing.com/currencies/xau-usd-historical-data

d3.json("/api/compare")
.then(makeChart);
var url = '/api/compare'
d3.json(url).then(function(data) {
   console.log(data)
})
function makeChart(gold) {
   var ten_yr_dateData = gold.date;
   var priceLabels = gold.price;
   var btcLabels = gold.BTC_Price;
   var spLabels = gold.SP_Price;

   var chart = new Chart('chart10yr', {
      type: 'line',
      data: {
         labels: ten_yr_dateData,
         datasets: [
            {
               data: priceLabels,
               label: 'Gold Closing Price',
               backgroundColor: 'rgba(250, 222, 17, 0.2)',
               borderColor: 'rgba(250, 222, 17, 1)',
               pointRadius: 0.1,
               borderWidth: 0.5,
               fill: true               
            }, {
               data: btcLabels,
               label: 'Bitcoin Price',
               backgroundColor: 'rgba(252, 18, 18, 0.2)',
               borderColor: 'rgba(252, 18, 18, 1)',
               pointRadius: 0.1,
               borderWidth: 0.5,
               fill: true               
            }, {
               data: spLabels,
               label: 'S&P 500 Price',
               backgroundColor: 'rgba(54, 162, 235, 0.2)',
               borderColor: 'rgba(54, 162, 235, 1)',
               pointRadius: 0.1,
               borderWidth: 0.5,
               fill: true               
            },
         ]
      },
      options: {
         title: {
            display: true,
            fontSize: 24,
            fontColor: 'rgba(64, 224, 208, 1)',
            padding: 15,
            text: "10 Year Look at Gold, Bitcoin, and the S&P 500 Index Prices",
         },
         legend: {
            display: true,
            labels: {
                fontColor: 'rgba(255, 255, 255, 1)',
            }
         },         
         elements: {
            line: {
               tension: 0.8         
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
