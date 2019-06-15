app.controller("loginController", function ($scope, $http, $window) {
    $scope.submit =  function () {
        $scope.credentials = {
            "username": $scope.login_username,
            "password": $scope.login_password
        };
        console.log($scope.credentials)
        // var req = {
        //     method: "POST",
        //     url: "http://localhost:3000/users/login",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: $scope.credentials
        // };
         $http.post("http://localhost:3000/users/login", $scope.credentials)
            .then(
                    function (response) {
                    if(response.data){
                        console.log(response.data);
                        $scope.token  = JSON.stringify({
                            "token": response.data,
                            username: $scope.login_username
                        });
                        localStorage.setItem("token", $scope.token);
                        getuserfavpois();
                        
                    }
                    else{
                        console.log("something went wrong!");
                        alert("something went wrong");
                    }
                
                },
                function (response) {
                    console.log(response);
                    alert(response.data);
                }
            );

            
    };


    var getuserfavpois = function(){
        $http({
            method: "GET",
            url: "http://localhost:3000/private/users/getuserfavouritepoi",
            headers: { "x-auth-token": JSON.parse(localStorage.getItem("token")).token  }
          }).then(
            function mySuccess(response) {
                localStorage.setItem("favorites", JSON.stringify(response.data));
                console.log("favorites loded succesully")
                $window.location.href = "/index.html";
            },
            function myError(response) {
               alert("could not load favorites="+response.data)
            }
          );
        
    }
});