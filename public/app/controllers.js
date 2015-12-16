angular.module('VideoCtrls', ['VideoServices'])
.controller('HomeCtrl', ['$scope','$http', function($scope, $http) {

  $scope.videos = [];
  $scope.vidObj = {}
  $scope.vidInfo = [];
  $scope.search = '';
  $scope.videoID = 'aMS0O3kknvk';

  var pendingTask;
  $scope.source = '';

  $scope.fetchFromYouTube = function(){
    $http.get("/results", {
      params: {
        q: $scope.search
      }
    })
    .success(function(data){
      var videoID = data.items[0].id.videoId;

      // iterate through Youtube data to get video info
      for (var i = 0; i < data.items.length; i++){
        var embedLink = "https://www.youtube.com/embed/"+data.items[i].id.videoId;
        var info = data.items[i].snippet;
        $scope.vidInfo.push(info);
        $scope.vidObj = {
          id: data.items[i].id.videoId,
          link: embedLink,
          details: info
        };
        $scope.videos.push($scope.vidObj);
      console.log($scope.vidObj);
      }
    })
    .error(function(data){
      console.log(data.error);
    });
  }

}])
.controller('ShowCtrl', ['$scope','$sce', '$routeParams', function($scope,$sce,$routeParams){
  $scope.video = {};
  console.log($routeParams);
  $scope.video.id = $routeParams.id;
  $scope.video.link = "http://www.youtube.com/embed/"+$scope.video.id;
  console.log($scope.video.link);
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