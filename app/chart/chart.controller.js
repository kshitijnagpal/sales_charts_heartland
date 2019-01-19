(function(){
  var app = angular.module('myApp.chart', ['ngRoute']);

  var MainController = function ($scope, $http, chartService) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"],
        datasets: [{
          label: 'Sales',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    $scope.totalSales = 0;
    $scope.dateError = false;
    $scope.date = {
      value: new Date()
    };

    //method to validate date input
    $scope.validateDate = () => {
      var date = $scope.date.value;
      var dateDiff = moment(new Date()).diff(moment(date), 'hours')/24;

      if (dateDiff < 0 || dateDiff > 5) {
        $scope.dateError = true;
      } else {
        $scope.dateError = false;
      }
    }

    //method to get chart data
    $scope.getChartData = () => {
      var date = $scope.date.value;
      var dateDiff = moment(new Date()).diff(moment(date), 'days');

      chartService.getData().then((salesData) => {
        var sales = 0;

        myChart.data.datasets.forEach((dataset) => {
          dataset.data = salesData[dateDiff].data;
        });

        myChart.update();

        //update total sales
        salesData[dateDiff].data.forEach((amount) => {
          sales = sales + amount;
        })

        $scope.totalSales = sales;
      });
    };

    //resets charts and sales
    $scope.clearChart = () => {
      myChart.data.datasets.forEach((dataset) => {
        dataset.data = [];
      });

      myChart.update();
      $scope.totalSales = 0;
      $scope.dateError = false;
      $scope.date.value = new Date();
    }
  }


  app.controller('ChartCtrl', ['$scope', '$http', 'chartService',  MainController]);
  app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/chart', {
      templateUrl: 'chart/chart.html',
      controller: 'ChartCtrl'
    });
  }])
}());