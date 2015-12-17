angular.module('VideoServices', ['ngResource'])

.factory('Auth', ['$window', "$rootScope", function($window) {
  return {
    saveToken: function(token) {
      $window.localStorage['secretvideos-token'] = token;
    },
    getToken: function() {
      return $window.localStorage['secretvideos-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('secretvideos-token');
    },
    isLoggedIn: function() {
      var token = this.getToken();
      return token ? true : false;
    },
    currentUser: function() {
      if (this.isLoggedIn()) {
        var token = this.getToken();
        try {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return payload;
        } catch(err) {
          return false;
        }
      }
    }
  }
}])
.factory('AuthInterceptor', ['Auth', function(Auth) {
  return {
    request: function(config) {
      var token = Auth.getToken();
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
}])
.factory('shareData', [function(){
  var savedData = {}
  function set(data){
    savedData = data;
  }
  function get(){
    return savedData;
  }

  return {
    set: set,
    get: get
  }
}]);