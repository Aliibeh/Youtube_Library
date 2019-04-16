(function(window, angular, undefined) {
    var app = angular.module('libApp');

    app.controller("libraryCtrl", function($scope, $http, $sce) {
        $scope.viewUrl = "app/views/mylib.view.html";

        var string = window.location.search;
        string = string.split("=");
        string = (string.length > 1) ? string[1] : false;

        if(string) {
        	$http.get('app/' + string.toLowerCase() + '.lib').then(function(data) {
        		$scope.library = data.data;
        	});
        }

        $scope.playVideo = function(video) {
            if(video.id) {
                $scope.currentVideoTitle = video.title;
                $scope.currentVideo = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + video.id);
                $scope.videoPlaying = true;
            }
        }

        $scope.deleteVideo = function(video) {
            $scope.library.videos.forEach(function(v, i) {
                if(video.id && v.id && video.id === v.id) {
                    $scope.library.videos.splice(i, 1);
                }
            });

            $http.post("youtubelib.php?delete", {data: $scope.library}).then(function(data) {
                console.log(data);
            });
        }

        $scope.searchNew = function(model) {
            $http.get("https://www.googleapis.com/youtube/v3/search?", {
                params: {key: "AIzaSyCR4tP-3_V4dL9lJd_tNhJKuviEg0Ru53A", part: "snippet", q: model}
            }).then(function(data) {
                $scope.items = data.data.items;
            });
        }

        $scope.addVideo = function(video) {
            console.log(video.snippet.title);
            $scope.library.videos.push({"title":video.snippet.title});
        }

    });
})(window, window.angular);