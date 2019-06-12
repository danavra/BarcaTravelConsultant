var main = angular.module("main", ["ngRoute"]);
main.config(['$routeProvider', function ($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "contents/home.html",
        controller: "controller",
        controllerAs:"controller"
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
main.controller("controller", ($scope, $http, $window) =>{
    $scope.logged_in = false;
    $scope.user_name = 'guest'
    $http({
        method: 'GET',
        url: 'http://localhost:3000/poi/getrandomPOI/3'
    }).then((response) => $scope.random_pois=response.data, (err) =>console.log(err));
});