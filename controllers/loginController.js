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
                        $scope.token  = JSON.stringify({
                            token: response.data["token"],
                            username: $scope.login_username
                        });
                        localStorage.setItem("token", $scope.token);
                        $window.location.href = "/index.html";
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
});