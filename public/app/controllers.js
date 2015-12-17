angular.module('VideoCtrls', ['VideoServices'])
.controller('HomeCtrl', ['$scope','$http', 'shareData', function($scope, $http, shareData) {

  $scope.videos = [];
  $scope.vidObj = {}
  $scope.vidInfo = [];
  $scope.search = '';


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
        shareData.set($scope.videos);
      }
    })
    .error(function(data){
      console.log(data.error);
    });
  }

  $scope.reset = function(){

    $scope.search = "";

    $scope.$watch('videos', function(newValue, oldValue){
      $scope.videos = [];
    });
  };

}])
.controller('ShowCtrl', ['$scope','$sce', '$routeParams', 'shareData', function($scope,$sce,$routeParams,shareData){
  $scope.video = {};
  $scope.video.id = $routeParams.id;
  $scope.video.details = $routeParams.details;
  $scope.video.link = "http://www.youtube.com/embed/"+$scope.video.id;
  $scope.shared = shareData.get();
  console.log($scope.video.details);

}])

.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.logout = function() {
    Auth.removeToken();
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