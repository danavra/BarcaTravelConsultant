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
    $scope.logOut = function(){
        window.getSelection();
        if(!window.confirm("are you sure you want to logout?")){
            return;
        }
        localStorage.clear();
        $scope.logged_in = false;
        $window.location.href = "index.html"

        alert("you have loged out!");
    }

    if(localStorage.getItem("token")){
        // alert("has token")
        $scope.logged_in = true;
        let usertest = JSON.parse(localStorage.getItem("token")).username;
        console.log("11111")

    }
    else{
        $scope.logged_in = false;
        console.log("222222")
    }
    $http({
        method: "GET",
        url:"http://localhost:3000/poi/getrandomPOI/3"
    }).then(
        function (response){
            $scope.random_pois = response.data;
        },
        function (response){
            console.log(response)
            $scope.random_pois = [{"POIName": "Couldnt connect to server", "imgUrl": "https://safetymanagementgroup.com/wp-content/uploads/2017/07/Oopsbutton.jpg"}];
        }
    )
});
function logOut(){
    localStorage.clear();
}