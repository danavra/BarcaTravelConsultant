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
        .when("/restorePassword", {
            templateUrl: "contents/restorePassword.html",
            controller: "restorePasswordCtrl",
            controllerAs:"controller"
        })
    .otherwise({
        redirectTo: '/'
    });
}]);

app.controller("controller", function($scope, $http, $window){
    
    //logout
    $scope.logOut = function(){
        window.getSelection();
        if(!window.confirm("are you sure you want to logout?")){
            return;
        }
        localStorage.clear();
        $scope.logged_in = false;
        $window.location.href = "index.html"


    }

    //search
    $scope.search = async function(){

        // to do

        alert($scope.query);
    }

    //getpoiinfo
    $scope.getPoiInfo = function($event){
        console.log($event.currentTarget.id);
        localStorage.setItem("currentPoi", $event.currentTarget.id);
        $window.location.href = "#!/pois"

    }
    //get randompois
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
 
    //get pois by user categories    
    if(localStorage.getItem("token")){
        $scope.logged_in = true;
        var t = JSON.parse(localStorage.getItem("token")).token;  
        
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
              console.log("sorry failed to get the 2poisfrom category= "+response.data)
            }
          );
    }
    else{
        $scope.logged_in = false;
    }

    

});
function logOut(){
    localStorage.clear();
}
function get2Pois(){
alert("get2pois")}
