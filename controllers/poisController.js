app.controller("poisController", function ($scope, $http, $window, $route) {
  console.log("enterd poi!!!!!")
    // alert(localStorage.getItem("currentPoi"))
    $scope.currentPoi = localStorage.getItem("currentPoi");
    $http({
        method: "GET",
        url: "http://localhost:3000/poi/getpoidetails/" + $scope.currentPoi
    
      }).then(
        function mySuccess(response) {
           
            $scope.POIName = response.data.POIName;
            $scope.imgUrl = response.data.imgUrl;
            $scope.description = response.data.description;
            $scope.rank = (parseInt(response.data.rank *100))/100;
            $scope.fullStar = parseInt(response.data.rank);
            $scope.emptyStar = 5 - $scope.fullStar;
            $scope.postReview = false;
            $scope.rankLabel = "Post a review";
            

        },
        function myError(response) {
          console.log("responce = "+ response);
          alert("sorry failed to get poi info= "+response)
        }
      );


      $scope.showPostReview = function(){
        if($scope.postReview===true){
          $scope.postReview = false;
          $scope.rankLabel = "Post a review";
        }
        else{
          $scope.postReview = true;
          $scope.rankLabel = "Show description";

        }
      }

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
            "conent": $scope.message,
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


      $scope.clear = function(){
        $scope.message = "";

      }




       




});












