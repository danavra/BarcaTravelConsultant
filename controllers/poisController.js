app.controller("poisController", function ($scope, $http, $window) {
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
            $scope.rank = response.data.rank;
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





        $scope.rankPoiForm = function(){
            
        }

        $scope.register_submit = function(){
            
        }




});
app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});












