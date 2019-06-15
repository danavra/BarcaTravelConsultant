app.controller("profileController", function ($scope, $http, $window, $route) {

    
    $scope.myFavs = JSON.parse(localStorage.getItem("favorites"));
    
    $scope.addToFav2 = function($event){
        $scope.addToFav($event);
        $route.reload();

    } 

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

    // }
    $scope.saveFavToDB = async function(){
        await deleteOldFav();
        // await addAllFavToDB();

        
    }











    var addAllFavToDB = async function(){
        console.log("start adding");
        var poisToadd = JSON.parse(localStorage.getItem("favorites"));
        poisToadd.forEach(function(p){
            var req2 = {
                method: "POST",
                url: "http://localhost:3000/private/users/adduserfavouritepoi",
                headers: { "x-auth-token": JSON.parse(localStorage.getItem("token")).token, "Content-Type": "application/json" },
                "data":{"POIName": p.POIName }
              };
              $http(req2).then(
                function mySuccess(response) {
               console.log(p.POIName + "has been been added to favorites DB")
                },
                function myError(response) {
                   alert("could not add" +p.POIName + "from DB: "+ response.data)
                }
              );
        })
        console.log("finished adding");
    } 



    var deleteOldFav = async function(){

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
                 



                await processArray($scope.oldDBFav,$http).then(function(response){console.log("now it all has finished!"+response); addAllFavToDB();},function(err){console.log("error: "+err)})


                
        //        await $scope.oldDBFav.forEach(await async function(poi) {
        //              console.log("trying to delete <"+poi.POIName+">")
        //              var toSend= poi.POIName;
        //              var req = {
        //                 method: "DELETE",
        //                 url: "http://localhost:3000/private/users/removeuserfavouritepoi",
        //                 headers: { "x-auth-token": JSON.parse(localStorage.getItem("token")).token, "Content-Type": "application/json" },
        //                 "data":{"POIName": toSend }
        //               };
        //               //delete drom db
        //          await   $http(req).then(
        //                 function mySuccess(response) {
        //                      console.log(poi.POIName + "has been deleted from favorites")


                            
            
                           
        //                 },
        //                 function myError(response) {
        //                    alert("could not delete" +poi.POIName + "from DB: "+ response.data)
        //                 }
        //               );
        //   }
        //   );

               
            },
            function myError(response) {
               alert("could not load favorites="+response.data)
            }
          );
          console.log("finished deleting");
    }

  


    
});

async function processArray(array, $http) {
    for (const poi of array) {
      await delayedLog(poi,$http);
    }
    console.log('finished deleting allDone!');
    return new Promise((res,err) => {res("yes!")})
  }


  function delay() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
  

  async function delayedLog(poi, $http) {
    // notice that we can await a function
    // that returns a promise
    console.log("trying to delete <"+poi.POIName+">")
    var toSend= poi.POIName;
    var req = {
       method: "DELETE",
       url: "http://localhost:3000/private/users/removeuserfavouritepoi",
       headers: { "x-auth-token": JSON.parse(localStorage.getItem("token")).token, "Content-Type": "application/json" },
       "data":{"POIName": toSend }
     };
     //delete drom db
await   $http(req).then(
       function mySuccess(response) {
            console.log(poi.POIName + "has been deleted from favorites")
       },
       function myError(response) {
          alert("could not delete" +poi.POIName + "from DB: "+ response.data)
       }
     );
    
    await delay();
    console.log("delayed finished");
   
  }