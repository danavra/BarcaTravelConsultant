app.controller("registerController", function($scope, $http, $window){
    $scope.categories = ["Museums", "Shopping", "Attractions", "Food"];
    $scope.register_submit = function() {
        let new_user = {
            "userName": $scope.register_username,
            "password": $scope.register_password,
            "firstName": $scope.register_fname,
            "lastName": $scope.register_lname,
            "city": $scope.register_city,
            "country": $scope.register_country,
            "Email": $scope.register_email,
            "Q1": $scope.register_q1,
            "A1": $scope.register_a1,
            "Q2": $scope.register_q2,
            "A2": $scope.register_a2,
            "categories": []
        };
        for(let i=0; i<$scope.register_categories.length; i++){
            new_user.categories.push($scope.register_categories[i]);
        }
        $http.post("http://localhost:3000/users/addUser", new_user).then(function(response){
            localStorage.setItem("token", response.data);
            $window.location.href = "/index.html";
        }, function(response){
            console.log(response);
            alert("coudn't register");
            $window.location.href = "index.html";
        }
        );
    }
});