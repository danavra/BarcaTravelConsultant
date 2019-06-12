var app = angular.module("myapp", ["ngRoute"]);
app.config(['$routeProvider', function ($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "contents/home.html",
        controller: "controller",
        controllerAs:"controller"
    })
        .when("/profile", {
        templateUrl: "contents/profile.html",
        controller: "profileController",
        controllerAs:"controller"
    })
        .when("/login", {
            templateUrl: "contents/login.html",
            controller: "loginController",
            controllerAs:"controller"
        })
        .when("/pois", {
            templateUrl: "contents/pois.html",
            controller: "poisController",
            controllerAs:"controller"
        })
        .when("/register", {
            templateUrl: "contents/register.html",
            controller: "registerController",
            controllerAs:"controller"
        })
    .otherwise({
        redirectTo: '/'
    });
}]);

app.controller("controller", function($scope, $http, $window){
    $scope.logged_in = false;
    $http({
        method: "GET",
        url:"http://localhost:3000/poi/getrandomPOI/3"
    }).then(
        function (response){
            $scope.random_pois = response.data;
        },
        function (response){
            console.log(response)
        }
    )
});