app.controller("loginController", function ($scope, $http, $window) {
    $scope.submit = async function () {
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
        await $http.post("http://localhost:3000/users/login", $scope.credentials)
            .then(
                function (response) {
                    if(response.data){
                        console.log(response.data);
                    }
                    else{
                        console.log("no data returned")
                    }
                },
                function (response) {
                    console.log(response);
                    alert("shit!");
                }
            );
    };
});