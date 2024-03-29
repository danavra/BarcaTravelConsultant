app.controller("profileController", function ($scope, $http, $window, $route) {

    // so that the html will show all favorites in local storage
    $scope.myFavs = JSON.parse(localStorage.getItem("favorites"));



    
    // so that after click on favorite, add/removes and refreshes the page
    $scope.addToFav2 = function($event){
        $scope.addToFav($event);
        alert(JSON.parse(localStorage.getItem("favorites")))
        $route.reload();
        

    } 



    // changes the position of the poi
    $scope.moveToTop = function($event){
    var poi = JSON.parse($event.currentTarget.value);
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    var newFav = new Array();
    newFav.push(poi);
    favorites.forEach(function(p) {
        if(p.POIName!==poi.POIName){
            newFav.push(p);
        }
        });
        localStorage.setItem("favorites", JSON.stringify(newFav) );
        
        
        $route.reload();
    }

    //floor
    $scope.floor = function(number){
      return parseInt(number*100)/100

  }

    // on click, removes all pois and adds all the current favorites
    $scope.saveFavToDB = async function(){
        await beginModdifyFavInDB();
        
    }
    // sort fav by rank
    $scope.sortByRank = function(){
      $scope.myFavs = sortByKey($scope.myFavs,'rank')
      localStorage.setItem("favorites", JSON.stringify($scope.myFavs) );
      
  }

    
    var beginModdifyFavInDB = async function(){
      

        console.log("start deleting");
        //get
        $http({
            method: "GET",
            url: "http://localhost:3000/private/users/getuserfavouritepoi",
            headers: { "x-auth-token": JSON.parse(localStorage.getItem("token")).token  }
          }).then(
            
            async function mySuccess(response) {
                if(response.data==="Not Found"){
                    console.log("currently db favorites is empty")
                    $scope.oldDBFav= new Array(0)
                }
                else{$scope.oldDBFav = response.data;}

                // deletes all favorites from db
                await processArray($scope.oldDBFav,$http,1)
                    .then(function(response)
                    {
                        console.log(response);
                        console.log("start adding to DB")
                        // adds all favorites to DB();
                        processArray(JSON.parse(localStorage.getItem("favorites")),$http,2)
                        .then(function(response)
                        {
                            console.log("finisshed adding to faverites");
                            // change the order in DB
                            var dataToSend = getSequence(JSON.parse(localStorage.getItem("favorites")));
                            
                            var req = {
                                method: "PUT",
                                url: "http://localhost:3000/private/users/setuserfavouritepoi",
                                headers: { "x-auth-token": JSON.parse(localStorage.getItem("token")).token, "Content-Type": "application/json" },
                                "data": dataToSend
                              };
                              $http(req).
                              then(function(response)
                              {
                                console.log("order has been changed!: "+response.data)
                                alert("your favorites have been updated")
                              },function(err)
                              {
                                    alert("error in order changing:" + err);
                              })

                        },function(err){console.log("error: "+err)})
                    },function(err){console.log("error: "+err)})
 
            },
            function myError(response) {
               alert("could not load favorites="+response.data)
            }
          );
          
    } 
});

// async loop for adding and deleting
async function processArray(array, $http, httpType) {
    for (const poi of array) {
      await delayedLog(poi,$http, httpType);
    }
    return new Promise((res,err) => {res('finished deleting allDone!')})
  }


  function delay() {
    return new Promise(resolve => setTimeout(resolve, 0.0001));
  }
  
// what the loop does
  async function delayedLog(poi, $http, httpType) {
    var toSend= poi.POIName;

    // delete request
    if(httpType===1){
        var message1 = " has been deleted from favorites"
        var message2 = "could not delete "

    var req = {
       method: "DELETE",
       url: "http://localhost:3000/private/users/removeuserfavouritepoi",
       headers: { "x-auth-token": JSON.parse(localStorage.getItem("token")).token, "Content-Type": "application/json" },
       "data":{"POIName": toSend }
     };

     //add request
    }else{
        var message1 = " has been added to favorites"
        var message2 = "could not add  "

        var req = {
            method: "POST",
            url: "http://localhost:3000/private/users/adduserfavouritepoi",
            headers: { "x-auth-token": JSON.parse(localStorage.getItem("token")).token, "Content-Type": "application/json" },
            "data":{"POIName": toSend }
          };

    }
     //process the request
await   $http(req).then(
       function mySuccess(response) {
            console.log(poi.POIName + message1)
       },
       function myError(response) {
          alert(message2+poi.POIName + "from DB: "+ response.data)
       }
     );
    
    await delay();
    console.log("delayed finished");
   
  }

  // return and array of objects for re-ordering
  function getSequence(pois){
    var ans = new Array();
    for(i = 0 ; i < pois.length ; i++){
        var entry = { "POIName" : pois[i].POIName , "place" : i+1 }
        ans.push(entry);
    }
    return ans;
  }

  //pois,'rank'
function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
  }