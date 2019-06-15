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
        .when("/browse", {
            templateUrl: "contents/browse.html",
            controller: "browseController",
            controllerAs:"controller"
        })
    .otherwise({
        redirectTo: '/'
    });
}]);

app.controller("controller", function($scope, $http, $window){
    
    $scope.yaniv = "dan"

    if(localStorage.getItem("favorites")){
        $scope.favAmount = JSON.parse(localStorage.getItem("favorites")).length;
    }
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


    //getpoiinfo
    $scope.getPoiInfo = function($event){
        console.log($event.currentTarget.id);
        localStorage.setItem("currentPoi", $event.currentTarget.id);
        $window.location.href = "#!/pois"

    }

    //add or removes to local favorites
    $scope.addToFav = function($event){

        //not loged in and pressed favorits
        if(!localStorage.getItem("token")){
            alert(" please log in to add favorites!");
            return;
        }
        
        if(localStorage.getItem("favorites")){
            
            var poi = JSON.parse($event.currentTarget.value);

            //remove
            if(isInFav(poi.POIName)){
                var favorites = JSON.parse(localStorage.getItem("favorites"));
                var newFav = new Array();
                favorites.forEach(function(p) {
                    if(p.POIName===poi.POIName){
                       console.log(poi.POIName + " deleted from local fav")
                    }
                    else{
                    newFav.push(p);
                    }
                  });
                  localStorage.setItem("favorites", JSON.stringify(newFav) );
            }
            //add
            else{
                var favorites = JSON.parse(localStorage.getItem("favorites"));
                favorites.push(poi);
                console.log(poi.POIName + "was added to local favorites")
                localStorage.setItem("favorites", JSON.stringify(favorites) );
        }
                $scope.favAmount = JSON.parse(localStorage.getItem("favorites")).length
                
            
            
              
            
        }
        //should never happen
        else {alert("this is wierd.. favorites not in local storage")
        return;
    }

    }


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<hapens every time page loads>>>>>>>>>>>>>>>>>>>>>>>>>>>



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
        var token = JSON.parse(localStorage.getItem("token")).token;  
        
        //get poi by users categories
        $http({
            method: "GET",
            url: "http://localhost:3000/private/users/get2popularpoi",
            headers: { "x-auth-token": token }
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

           //get last 2 user saved pois
           $scope.haseLast2=false;
           $http({
            method: "GET",
            url: "http://localhost:3000/private/users/getuserlast2savedpoi",
            headers: { "x-auth-token": token }
          }).then(
            function mySuccess(response) {
                $scope.haseLast2=true;
                $scope.lastSavedPois = response.data;
                $scope.last2fav_msg = "here are the last 2 points of interes  you have added to you favorites";
            },
            function myError(response) {
                $scope.haseLast2=false;
                $scope.last2fav_msg = "favorites is empty";
                $scope.lastSavedPois = new Array(0);
              console.log("this error is ok if no favorites in db else could not get 2 last pois");
              
            }
          );
    }
    else{
        $scope.logged_in = false;
    }

    

});

function isInFav(poi){
  
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    var ans = false;
    favorites.forEach(function(p) {
        if(p.POIName==poi){
           ans = true;
        }
      });
      return ans;

}