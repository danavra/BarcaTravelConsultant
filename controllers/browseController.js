app.controller("browseController", function ($scope, $http, $window,$route) {

    $scope.pageInfo= "here are all the points of interests in our site:"
    $scope.poisToShow = new Array(0);
    $scope.categories = ["Museums", "Shopping", "Attractions", "Food"];

    
    $scope.getAllPois = function(){
        
        var req = 
        {
            method: "GET",
            url: "http://localhost:3000/poi/getallpoi"
            
        }
        
        $http(req)
        .then(
            function(response){
                $scope.poisToShow = response.data;
                
            }
            ,function(response){
                alert("could not get all pois\n"+ response.data)
            }

        )

    }

    $scope.getPoisByCat = function(){
        if(!$scope.cat){
            alert("you must choose a category");
            return;
        }

        $scope.pageInfo= "here are all the points of interests in category "+ $scope.cat;
        var req = 
        {
            method: "GET",
            url: "http://localhost:3000/poi/getallpoibycategory/" + $scope.cat,
        }
        
        $http(req)
        .then(
            function(response){
                $scope.poisToShow = response.data;
               
            }
            ,function(response){
                alert("could not get pois for category"+ $scope.cat);
            }

        )

    }

    $scope.sortByRank = function(){
        $scope.poisToShow = sortByKey($scope.poisToShow,'rank')
    }

    $scope.searchByName = function(){       
        if(!$scope.toSearch){
            alert("you must insert a query first");
            return;
        }
        var req = 
        {
            method: "GET",
            url: "http://localhost:3000/poi/getsearchresultsbypoiname/"+$scope.toSearch,
        }
        
        $http(req)
        .then(
            function(response){
                $scope.poisToShow = response.data;
            }
            ,function(response){
                alert("could not find "+ $scope.toSearch);
            }

        )
    }

    $scope.floor = function(number){
        return parseInt(number*100)/100

    }

    ////////////////
    //post review
    $scope.submitRating = async function(message,newRank,POIName){
        
        if(!newRank){
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

   $scope.getAllPois();
   
   
});

//pois,'rank'
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
    }

