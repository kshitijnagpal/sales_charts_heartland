(function(){
    var chartService = ($http) => {
        var getData = () => {
            return $http.get('data/sample.json')
                .then((response) => {
                    return response.data;
                })
        };

        return {
            getData: getData,
        };
    }

    var app = angular.module('myApp.chart');
    app.factory('chartService', chartService);
}());