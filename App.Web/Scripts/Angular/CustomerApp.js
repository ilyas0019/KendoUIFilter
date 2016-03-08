
var app = angular.module('customerApp', ['kendo.directives', 'ngRoute']);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
         .when('/viewCustomer', {
             templateUrl: 'Resources/viewCustomer.html',
             controller: 'customerController'
         })

        .when('/addCustomer', {
            templateUrl: 'Resources/addCustomer.html',
            controller: 'customerController'
        })
         .when('/editCustomer', {
             templateUrl: 'Resources/updateCustomer.html',
             controller: 'customerController'
         })

    .otherwise({
        redirectTo: '/viewCustomer'

    });

}]);