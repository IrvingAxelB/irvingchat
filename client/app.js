angular.module('irvingchat', [])

.controller('UserController',['$scope', 'IrvingsData' function($scope, IrvingsData){
	$scope.message = '';

	$scope.sendMessage = function(){

	};

}]);

.factory('IrvingsData', function(){
	var myDataRef = new Firebase('https://ndtufcx866p.firebaseio-demo.com/');

	// sending the data
	myDataRef.push({name: name, text: text});

	// saving updated data
	myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
    });
})