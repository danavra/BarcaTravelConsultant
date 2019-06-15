app.controller("browseController", function ($scope, $http, $window) {

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

    $scope.getPoiInfo = function($event){
        console.log($event.currentTarget.id);
        localStorage.setItem("currentPoi", $event.currentTarget.id);
        $window.location.href = "#!/pois"

    }

    $scope.floor = function(number){
        return parseInt(number*100)/100

    }

   $scope.getAllPois();
   
   
});

function test(poisToSort){
   
      
}


//pois,'rank'
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
    }

