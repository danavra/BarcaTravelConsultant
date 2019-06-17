app.controller("poisController", function ($scope, $http, $window, $route) {
  console.log("enterd poi!!!!!")
    // alert(localStorage.getItem("currentPoi"))
    $scope.currentPoi = localStorage.getItem("currentPoi");
    $http({
        method: "GET",
        url: "http://localhost:3000/poi/getpoidetails/" + $scope.currentPoi
    
      }).then(
        function mySuccess(response) {
           
            $scope.poiMeta = response.data;
            $scope.POIName = response.data.POIName;
            $scope.imgUrl = response.data.imgUrl;
            $scope.description = response.data.description;
            $scope.rank = response.data.rank;
            $scope.fullStar = parseInt(response.data.rank);
            $scope.emptyStar = 5 - $scope.fullStar;
            $scope.views = response.data.views;
            $scope.postReview = false;
            $scope.rankLabel = "Post a review";

            // get the last reviews
            $http({method: "GET" , url: "http://localhost:3000/poi/getallpoireviews/" + $scope.POIName})
            .then(function(response){

              getLast2Rev(response.data,$scope);
              },function(err){
          console.log("could not get reviews for poi: " +response.data)
          $scope.revToShow = new Array(0);
        })
  

        },
        function myError(response) {
          console.log("responce = "+ response);
          alert("sorry failed to get poi info= "+response)
        }
      );


      $scope.submitRating = async function(){
        
        if(!$scope.newRank){
          alert("rank musty be 1-5 ")
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
            "POIName":$scope.POIName,
            "content": $scope.message,
            "rating": $scope.newRank

          }
        }
        await $http(req)
        .then(
                function (response) {
                    alert("you rating has been accepted!\n thank you!");
                    $route.reload();
            },
            function (response) {
                console.log(response);
                alert("error: "+response.data);
                
            }
        );
        
      }

      $scope.floor = function(number){
        return parseInt(number*100)/100

    }

      $scope.translateDate = function(oldDate){
        
          var x = new Date(oldDate);
          
          var y = x.getFullYear().toString();
          var m = (x.getMonth() + 1).toString();
          var d = x.getDate().toString();
          var h = x.getHours().toString();
          var min = x.getMinutes().toString();
          (d.length == 1) && (d = '0' + d);
          (m.length == 1) && (m = '0' + m);
          var yyyymmdd = d +"."+ m +"."+ d+"   time: "+h+":"+min;
          return yyyymmdd;
      }


});

function getLast2Rev(reviews,$scope){
  var ans = new Array(0);
  if(!reviews || reviews.length < 1 ){
    $scope.revToShow = ans;
    return;
  }
  if(reviews.length < 2){
    $scope.revToShow = reviews;
    return;
  }
  // there are more tHAN 2.. NEED TO SORT
    reviews.sort(function (a, b) {
    return a.date.localeCompare(b.date);
});
  
    ans.push(reviews[reviews.length -1])
    ans.push(reviews[reviews.length -2])
    $scope.revToShow = ans;
  return;
}










