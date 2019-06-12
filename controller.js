var main = angular.module("main", ["ngRoute"]);
main.config(['$routeProvider', function ($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "contents/home.html",
        controller: "controller",
        controllerAs:"controller"
    })
        .when("/profile", {
        templateUrl: "contents/profile.html",
        controller: "controllers/profileController",
        controllerAs:"controller"
    })
        .when("/login", {
            templateUrl: "contents/login.html",
            controller: "controllers/loginController",
            controllerAs:"controller"
        })
        .when("/pois", {
            templateUrl: "contents/pois.html",
            controller: "controllers/poisController",
            controllerAs:"controller"
        })
        .when("/register", {
            templateUrl: "contents/register.html",
            controller: "controllers/registersController",
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