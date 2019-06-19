app.controller("registerController", function($scope, $http, $window){
    $scope.categories = ["Museums", "Shopping", "Attractions", "Food"];
   
    // get all countries
    $http({
        method: "GET",
        url:"http://localhost:3000/getpossiblecountriesforregistration"
    }).then(function(responce){
        $scope.allPossibleCountries = [];
        for(i = 0 ; i < responce.data.length; i++){
            $scope.allPossibleCountries.push(responce.data[i].name)
        }

        
    },function(err){    
        alert("error retrieving name of possible countries.."+ err.data)
    })
   
   
   
   
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

        if(!$scope.register_categories){
            alert("must select at least two categories")
            return;
        }
        for(let i=0; i<$scope.register_categories.length; i++){
            new_user.categories.push($scope.register_categories[i]);
        }
       
        if(!new_user.categories || new_user.categories.length < 2){
            alert("must select at least two categories")
            return;
        }
       
        if(!new_user.userName || new_user.userName.length < 3 || new_user.userName.length > 8 ){
            alert("user name must be between 3-8 charectors")
            return;
        }
       
        if(!isLegalUserName(new_user.userName)){
            alert("user name must onely contaion letters!")
            return;
        }
        if(!isLegalPassword(new_user.password)){
            return;
        }

        if(!new_user.firstName || !new_user.lastName || !new_user.city || !new_user.Email || !new_user.Q1 || !new_user.Q2 || !new_user.A1 || !new_user.A2 || !new_user.country ){
            alert("all fields are required!")
            return;
        }
        

      
        $http.post("http://localhost:3000/users/addUser", new_user).then(
            function(response){
                $scope.token = {
                    "token":response.data,
                    "username":new_user.userName
                };
                localStorage.setItem("token", JSON.stringify($scope.token));
                localStorage.setItem("favorites", JSON.stringify([]));
                $scope.logged_user = new_user;
                alert("user has been successfully Registered!")
                $window.location.href = "/index.html";
        }, function(response){
                console.log(response);
                alert("coudn't register");
                $window.location.href = "index.html";
        }
        );
    }
});

function isLegalUserName(name){
    for(i = 0 ; i < name.length; i++){
        if(name[i] < 'A' || name[i] > 'z')
        return false;
    }
    return true;

}

function isLegalPassword(pass){
    if(!pass || pass.length < 5 || pass.length > 10){
        alert("password must be 5-10 charecters long")
    return false;
    
    }

    hasletter = false;
    for(i = 0 ; i < pass.length; i++){
        if(pass[i] >= 'A' && pass[i] <= 'z')
        hasletter =  true;
    }

    hasNumber = false;
    for(i = 0 ; i < pass.length; i++){
        if(pass[i] >= '0' && pass[i] <='9')
        hasNumber =  true;
    }
    return hasNumber && hasletter;
    
    


}