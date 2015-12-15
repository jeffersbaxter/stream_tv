angular.module('VideoCtrls', ['VideoServices'])
.controller('HomeCtrl', ['$scope','$http', function($scope, $http) {
  var API_KEY = process.env.KEY;
  $scope.videos = [];
  $scope.search = '';

  if($scope.search === undefined){
    $scope.search = "Sherlock Holmes";
    fetch();
  }

  var pendingTask;
  $scope.change = function(){
    if(pendingTask){
      clearTimeout(pendingTask);
    }
      pendingTask = setTimeout(fetch, 800);
  };

  function fetch(){

    $http.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        key: API_KEY,
        type: "video",
        maxResults: '10',
        part: 'id,snippet',
        fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
        q: $scope.search
      }
    })
    .success(function(data){
      // $scope.results = data;
      console.log(data);

    })
    .error(function(data){
      console.log(data);
    });

    console.log($scope.search);

  }

}])


.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
  }
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
      $http.post('/api/auth', $scope.user).then(function success(res) {
        Auth.saveToken(res.data.token);
        $location.path('/');
      }, function error(res) {
        console.log(data);
      });
    }, function error(res) {
      console.log(data);
    });
  }
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      $location.path('/');
    }, function error(res) {
      console.log(data);
    });
  }
}]);