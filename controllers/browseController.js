app.controller("browseController", function ($scope, $http, $window,$route) {

    $scope.pageInfo= "here are all the points of interests in our site:"
    $scope.poisToShow = new Array(0);
    $scope.categories = ["Museums", "Shopping", "Attractions", "Food"];
    $scope.showCatMuseum = false;
    $scope.showCatShopping = false;
    $scope.showCatAttractions = false;
    $scope.showCatFood = false;
    $scope.showAllPois2 = true;
    $scope.showingMsg = "categories view"

    $scope.changeViewToAll = function(){
    $scope.showCatMuseum = false;
    $scope.showCatShopping = false;
    $scope.showCatAttractions = false;
    $scope.showCatFood = false;
    $scope.showAllPois2 = true;
    $scope.showingMsg = "categories view"
    

    }
    

    $scope.changeview = function(){
        if($scope.showingMsg==="show all!"){
            $scope.showingMsg="categories view"
        }
        else{
            $scope.showingMsg="show all!"
        }

        $scope.poisToShow =  $scope.poisToShowPerminent

        $scope.showCatMuseum = !$scope.showCatMuseum
        $scope.showCatShopping = !$scope.showCatShopping
        $scope.showCatAttractions = !$scope.showCatAttractions
        $scope.showCatFood = !$scope.showCatFood
        $scope.showAllPois2 = !$scope.showAllPois2
    }
    $scope.getAllPois = function(){
        $scope.changeview()
    }

    $scope.loadAllPois = function(){
        var req = 
        {
            method: "GET",
            url: "http://localhost:3000/poi/getallpoi"
            
        }
        
        $http(req)
        .then(
            function(response){
                $scope.poisToShow = response.data;
                $scope.poisToShowPerminent = response.data;

                
            }
            ,function(response){
                alert("could not get all pois\n"+ response.data)
            }

        )
    }
    // this is for new showing by cat
    $scope.getPoisByCat2 = function(){

        //museum
        var req = 
        {
            method: "GET",
            url: "http://localhost:3000/poi/getallpoibycategory/" + "Museums",
        }
        
        $http(req)
        .then(
            function(response){
                $scope.MuseumsPois = response.data;
               
            }
            ,function(response){
                alert("could not get pois for category"+"Museums");
            }

        )

        //shopiong
        var req = 
        {
            method: "GET",
            url: "http://localhost:3000/poi/getallpoibycategory/" + "Shopping",
        }
        
        $http(req)
        .then(
            function(response){
                $scope.ShoppingPois = response.data;
               
            }
            ,function(response){
                alert("could not get pois for category"+"Shopping");
            }

        )

        // Attractions
        var req = 
        {
            method: "GET",
            url: "http://localhost:3000/poi/getallpoibycategory/" + "Attractions",
        }
        
        $http(req)
        .then(
            function(response){
                $scope.AttractionsPois = response.data;
               
            }
            ,function(response){
                alert("could not get pois for category"+"Attractions");
            }

        )


        var req = 
        {
            method: "GET",
            url: "http://localhost:3000/poi/getallpoibycategory/" + "Food",
        }

        // Food
        $http(req)
        .then(
            function(response){
                $scope.FoodPois = response.data;
               
            }
            ,function(response){
                alert("could not get pois for category"+Food);
            }

        )

        

    }
    //gett pois by cat
    $scope.loadAllPois();
    $scope.getPoisByCat2();



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
                $scope.changeViewToAll();
                $scope.poisToShow = response.data;
               
            }
            ,function(response){
                alert("could not get pois for category"+ $scope.cat);
            }

        )

    }

    $scope.sortByRank = function(){
        $scope.poisToShow = sortByKey($scope.poisToShow,'rank')
        $scope.changeViewToAll();
        
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
                $scope.changeViewToAll();
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

      
   
   
});

//pois,'rank'
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
    }

