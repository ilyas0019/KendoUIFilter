app.service("customerService", ["$http", function ($http) {
    var self = this;
    var urlBase = '/api/customer';
    var data;
    this.getCustomers = function () {
        return $http(getRequest);
      
    }

    this.getCustomer = function (id) {
        urlBase = urlBase + "/" + id;
        return $http(getRequest);

    }
    this.postCustomer = function (customer) {
        data = customer;
        return $http(postRequest);

    }
    var getRequest = {
        method: 'GET',
        url: urlBase,
        headers: {
            'Content-Type': 'application/json'
        },

    }
    var postRequest = {
        method: 'POST',
        url: urlBase,
        data:data,
        headers: {
            'Content-Type': 'application/json'
        },

    }

}]);