// define angular app
var app = angular.module( 'linkedInApp', ['ngRoute', 'ngSanitize'] ).config(function($sceProvider) {
	$sceProvider.enabled(false);
});

// Main controller
app.controller( 'MainCtrl', function( $scope, $parse, $compile, $interpolate, $sce ) {
	
	// linkedIn not ready by default
	$scope.linkedInReady = false;

	// no information on myself returned by LinkedIn API yet
	$scope.me = {
		found: false
	};

	$scope.startApp = function() {
		
		// linkedIn API is now ready, show login button
		$scope.linkedInReady = true;
		$scope.$digest();
	};

	$scope.foundMe = function(me){
		
		// logged in, returned my information
		$scope.me = me;
		$scope.me.found = true;

		// digest
		$scope.$digest();
	};
});


// runs when the JavaScript framework is loaded
function displayLinkedInLogin() {
	IN.Event.on(IN, "auth", onLinkedInAuth);
	angular.element($("body")).scope().startApp();
}

// runs when the viewer has authenticated
function onLinkedInAuth() {
	IN.API.Profile("me")
	.fields(["firstName", "lastName", "pictureUrl", "id", "headline", "location", "summary", "positions", "twitter-accounts"])
	.result(displayProfiles);
}

// fire off with linkedin profile information of the user
function displayProfiles(profiles) {
	member = profiles.values[0];
	angular.element($("body")).scope().foundMe(member);
}

$(function(){
	// append linkedin script with api key (../config.js)
	$('<script type="text/javascript" src="http://platform.linkedin.com/in.js">\n api_key: ' + config.apiKey + ' \n onLoad: displayLinkedInLogin \n authorize: true  \n </script>').appendTo('body');
});









