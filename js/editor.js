var app = angular.module('editor', []);

app.service('$pb', ['$http', function($http) {
    this.r = function(content) {
        return $http({
            method: 'POST',
            url: 'https://ptpb.pw/r',
            data: {'c': content}
        });
    }

    this.get = function(id) {
        return $http({
            method: 'GET',
            url: 'https://ptpb.pw/' + id,
        });
    }

    this.post = function(content) {
        return $http({
            method: 'POST',
            url: 'https://ptpb.pw/',
            data: {'c': content}
        });
    }
}]);

app.controller('navController', function($scope, $rootScope, $sce, $routeParams, $pb, $location, $http) {
    this.tab = 'render';
    $scope.url = '';

    this.is = function(tab) {
        return this.tab == tab;
    };

    this.set = function(tab) {
        this.tab = tab;
    }

    this.post = function() {
        $pb.post($scope.content).success(function(data) {
            $scope.url = data.url;
            $location.url('/' + data.short);
        });
    }

    this.get = function() {
        console.log($scope.url);
        $http.get($scope.url).success(function(data) {
            $rootScope.content = data;
        });
    }

    if ('id' in $routeParams) {
        $pb.get($routeParams.id)
            .success(function(data) {
                $rootScope.content = data;
            });
    }

    $scope.$watch('content', function() {
        $pb.r($scope.content).success(function(data) {
            $scope.rendered = $sce.trustAsHtml(data);
        });
    });
});

app.directive("editor", function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/editor.html',
    };
});

app.directive("preview", function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/preview.html',
    };
});

app.directive("navs", function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/navs.html',
    };
});
