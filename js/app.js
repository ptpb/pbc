var app = angular.module('pbc', ['editor', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:id', {
        controller: 'navController',
        templateUrl: 'partials/test.html'
    }).otherwise({
        controller: 'navController',
        templateUrl: 'partials/test.html'
    });
}]);
