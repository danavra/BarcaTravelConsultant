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

    $scope.search = async function(){

        

        alert($scope.query);
    }
 

    if(localStorage.getItem("token")){
        
        // console.log("<"   +JSON.parse(localStorage.getItem("token")).token+"   >")
        $scope.logged_in = true;
        var t = JSON.parse(localStorage.getItem("token")).token;
        console.log("test:\nlength="+t.length);
        console.log(t);
        var req1 = {
             method: "GET",
             url: "http://localhost:3000/private/users/get2popularpoi",
             headers: { "x-auth-token": t }
          }
          console.log("wwwtttffff"+ req1.headers['x-auth-token']);
        $http({
            method: "GET",
            url: "http://localhost:3000/private/users/get2popularpoi",
            headers: { "x-auth-token": t }
          }).then(
            function mySuccess(response) {
              $scope.pois2cat = response.data;
            },
            function myError(response) {
              // $scope.twoPopularPOIS = response.statusText;
              console.log("responce = "+ response);
              alert("sorry failed to get the 2poisfrom category= "+response.data)
            }
          );


    }
    else{
        $scope.logged_in = false;
    }
    $http({
        method: "GET",
        url:"http://localhost:3000/poi/getrandomPOI/0"
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
function get2Pois(){
alert("get2pois")}
