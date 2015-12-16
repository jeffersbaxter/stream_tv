angular.module('VideoCtrls', ['VideoServices'])
.controller('HomeCtrl', ['$scope','$http', function($scope, $http) {
  // var API_KEY = process.env.KEY;
  $scope.videos = [];
  $scope.search = '';
  $scope.videoID = 'aMS0O3kknvk';

  var pendingTask;
  $scope.source = '';
  // $scope.watch(function() {
  //   return $scope.source;
  // }, function() {
  //   //create iframe
  //   //assign ng-src to $scope.source
  //   //append iframe where you want it
  // });
  $scope.fetchFromYouTube = function(){
    $http.get("/results", {
      params: {
        q: $scope.search
      }
    })
    .success(function(data){
      var videoID = data.items[0].id.videoId;
      // $scope.source = "https://www.youtube.com/embed/"+videoID;
      // console.log($scope.source);
      for (var i = 0; i < data.items.length; i++){
        var embedLink = "https://www.youtube.com/embed/"+data.items[i].id.videoId;
        $scope.videos.push(embedLink);
      }

      console.log($scope.videos);
    })
    .error(function(data){
      console.log(data.error);
    });


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