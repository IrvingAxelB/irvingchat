angular.module('irvingchat')

.controller('SigninController', function($scope, DataBase){

	$scope.signin = function(email, password){
		console.log(email, password);
		DataBase.signin(email, password);
	};

});