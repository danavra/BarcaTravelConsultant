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
        
        },
        function myError(response) {
          console.log("responce = "+ response);
          alert("sorry failed to get poi info= "+response)
        }
      );
});












