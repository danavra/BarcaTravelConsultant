
app.controller("restorePasswordCtrl", function ($scope, $http, $window) {

    $scope.showQuestions = false;
    $scope.getSecurityQ = function(){
        var req = 
        {
            method: "GET",
            url: "http://localhost:3000/users/getuserauthquestion/"+ $scope.userName ,
            
        }
        
        $http(req)
        .then(
            function(response){
                $scope.questions = response.data;
                $scope.showQuestions = true;
            }
            ,function(response){
                alert("user does not exist!\n"+ response.data)
                $scope.showQuestions = false;
            }

        )
    }
    $scope.getPassword = function(){
        // alert("get password pressed" +$scope.userName+"\n"+ $scope.selecetedQ+"\n"+$scope.answer)
        var req2 = 
        {
            method: "POST",
            url: "http://localhost:3000/users/restorePassword" ,
            "data":{"username": $scope.userName,"question": $scope.selecetedQ,"answer":$scope.answer}
        }
        $http(req2)
        .then(
            function(response){
                if(response.data==="Not Found"){
                    alert("wrong answer!")
                }
                else{
                alert("your password is:\n"+response.data)
                $window.location.href = "#!/login";
                }
            }
            ,function(response){
                alert("wrong answer!!\n"+ response.data)
                
            }

        )
    }

});