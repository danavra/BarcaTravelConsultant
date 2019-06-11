var main = angular.module("main", ["ngRoute"]);
main.config(($provide) => {
    $provide.when("/", {
        templateUrl: "contents/home.html",
        controller: "controller",
        controllerAs:"controller"
    })
});