angular.module('irvingchat')
  .controller('UserController',['$scope', 'IrvingsData', 'DataBase', '$state', function($scope, IrvingsData, DataBase, $state){

  	// hacky way to check auth
  	if(!DataBase.ref.getAuth()){
  		console.log("Get outta here BRUH");
  		$state.go('signin');
  	}

	// giving our controllers scope have all messages
	$scope.nameInput = "";
	$scope.messageInput = "";
	$scope.messages = IrvingsData.messages;
	console.log($scope.messages);

	$scope.sendMessage = function(userName, message){
		// sending the message
		IrvingsData.myDataRef.push({name: userName, text: message});
		$scope.messageInput = "";
		$scope.nameInput = "";
	};


}])


.factory('IrvingsData', function(){
	var myDataRef = new Firebase('https://irvingchat.firebaseio.com/');
	var messages = [];

	myDataRef.on('child_added', function(snapshot) {

        // saving the message object
        var message = snapshot.val();
        // saving it into our own array
        messages.push(message);
        // keep only ten messages at a time.
		deleteMessages();
    });

    deleteMessages = function(){
		var tooMany = true;
		while(tooMany){
			if(messages.length > 10){
				messages.shift();
			}else{
				tooMany = false;
			}
		}
	};

    return {
    	myDataRef: myDataRef,
    	messages: messages
    };
})