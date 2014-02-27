var app = angular.module( 'linkedInApp', ['ngRoute', 'ngSanitize'] ).config(function($sceProvider) {
	// Completely disable SCE.  For demonstration purposes only!
	// Do not use in new projects.
	$sceProvider.enabled(false);
});

app.filter("nl2br", function($filter) {
	return function(data) {
		if (!data) return data;
			return data.replace(/\n\r?/g, '<br />');
	};
});

app.controller( 'MainCtrl', function( $scope, $parse, $compile, $interpolate, $sce ) {
	$scope.linkedInReady = false;
	$scope.me = {
		found: false
	};
	$scope.li = {
		t: 'text/javascript',
		s: "http://platform.linkedin.com/in.js"
	};

	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}

	$scope.startApp = function() {
		$scope.linkedInReady = true;
		$scope.$digest();
	};

	$scope.foundMe = function(me){
		$scope.me = me;
		$scope.me.found = true;
		$scope.$digest();
	};

});

// API Key:
// 77ff85e61ta242
// Secret Key:
// COirFEbDq0YgZMBb
// Don't share this secret with anyone.
// OAuth User Token:
// ef0b1368-8f26-43cc-be98-63e111f3be2b
// OAuth User Secret:
// cf8bea4b-4946-420a-9e66-e0569d1382b2
// Don't share this secret with anyone.


// 2. Runs when the JavaScript framework is loaded
function displayLinkedInLogin() {
	IN.Event.on(IN, "auth", onLinkedInAuth);
	angular.element($("body")).scope().startApp();
}

// 2. Runs when the viewer has authenticated
function onLinkedInAuth() {
	IN.API.Profile("me")
	.fields(["firstName", "lastName", "pictureUrl", "id", "headline", "location", "summary", "positions", "twitter-accounts"])
	.result(displayProfiles);
}

function displayProfiles(profiles) {
	console.log(profiles);
	member = profiles.values[0];
	// console.log(member);
	angular.element($("body")).scope().foundMe(member);
	//document.getElementById("info").innerHTML = "<p id=\"" + member.id + "\">Hello " +  member.firstName + " " + member.lastName + "</p>";
}

$(function(){
	// // panel accordion behaviour
	// $(".accordion.panel-group .panel-heading").on("click", function(){
	// 	e.preventDefault();
	// 	$("a", this).click();
	// });
});









