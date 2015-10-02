angular.module('irvingchat')

.controller('SignupController', function($scope, DataBase){

	$scope.signup = function(email, password){
		console.log(email, password);
		DataBase.createUser(email, password);
	};	

})
