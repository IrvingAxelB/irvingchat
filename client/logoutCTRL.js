angular.module('irvingchat')

.controller('LogoutController', function($scope, DataBase, $state){

	$scope.logout = function(){
		DataBase.ref.unauth();
		// DataBase.userData = null;
		$state.go('signin');
	}

})
