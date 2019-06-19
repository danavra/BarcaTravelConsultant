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
        .when("/about", {
            templateUrl: "contents/about.html",
            // controller: "browseController",
            // controllerAs:"controller"
        })
    .otherwise({
        redirectTo: '/'
    });
}]);

app.controller("controller", function($scope, $http, $window,$route){
   

    //is in fav
    $scope.test = function(poi){
        if(!localStorage.getItem("favorites")){
            return false;
        }
        var ans = false;
        // console.log("for me "+ JSON.parse(localStorage.getItem("favorites")))[0]
        JSON.parse(localStorage.getItem("favorites")).forEach(function(info){
            if(poi==info.POIName){
                ans=true;
            }
        });
        return ans;
        
    }

    // go to login
    $scope.goTologin = function(){
        $window.location.href = "#!/login"
    }

    // go to register
    $scope.goToRes = function(){
        $window.location.href = "#!/register"
    }

    $scope.getfavAmount = function(){
        return JSON.parse(Storage.getItem("favorites")).length
    }

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
        // console.log($event.currentTarget.value);
        if($event.currentTarget.value){
            localStorage.setItem("currentPoi", $event.currentTarget.value );
        }
        else{
            localStorage.setItem("currentPoi", $event.currentTarget.name );
        }
        
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
            
            var obj1 = $event.currentTarget.value;
            if(!obj1){
                return;
            }
            var poi = JSON.parse(obj1);

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
                if(location.href.endsWith("/")){
                    location.reload();

                }
               
                // $route.reload();
            
        }
        //should never happen
        else {alert("this is wierd.. favorites not in local storage")
        return;
    }

    }



    ////////////////
    //post review
    $scope.submitRating = async function(message,newRank,POIName){
        
        if(!newRank || newRank > 5 || newRank < 1){
          alert("rank must be 1-5 ")
          return;
        }
        
        // token*, JSON{"POIName": "Camp Nou","content": "very good","rating": 5}

        var req = {
          method: "POST",
          url: "http://localhost:3000/private/users/addpoireview",
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("token")).token
          },
          "data":{
            "POIName": POIName,
            "content": message,
            "rating": newRank

          }
        }
        await $http(req)
        .then(
                function (response) {
                    alert("you rating has been accepted!\n thank you!");
                    // $route.reload();
            },
            function (response) {
                console.log(response);
                alert("error: "+response.data);
                
            }
        );
        
      }


      $scope.clear = function(){
          return "";
      }

      ////////////////////


      $scope.floor = function(number){
        return Math.floor(number*10000)

    }
    


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<hapens every time page loads>>>>>>>>>>>>>>>>>>>>>>>>>>>



    //get randompois
        $http({
        method: "GET",
        url:"http://localhost:3000/poi/getrandomPOI/2"
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
        $scope.userName = JSON.parse(localStorage.getItem("token")).username;
        
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
         $scope.userName = "guest"
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