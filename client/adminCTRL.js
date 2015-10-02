angular.module('irvingchat')

.controller('AdminController', function($scope, AdminsData, $state, DataBase){
	
	// hacky way to make sure its irving.
	console.log(DataBase.ref.getAuth());
	if(DataBase.ref.getAuth()){
		var current = DataBase.ref.getAuth();
		var email = current.password.email;	
	}else{
		var email = "not irving"
	}
	//irving@irving.com
	// hacky way to check auth
  	if(email !== 'irving@irving.com'){
  		console.log(email, "not irving");
  		$state.go('signin');
  	}

	// giving our controllers scope have all messages
	$scope.nameInput = "";
	$scope.messageInput = "";
	$scope.messages = AdminsData.messages;
	console.log($scope.messages);

	$scope.sendMessage = function(userName, message){
		// sending the message
		AdminsData.myDataRef.push({name: userName, text: message});
		$scope.messageInput = "";
		$scope.nameInput = "";
	};

})


.factory('AdminsData', function(){
	var myDataRef = new Firebase('https://irvingchat.firebaseio.com/');
	var messages = [];

	myDataRef.on('child_added', function(snapshot) {

        // saving the message object
        var message = snapshot.val();
        // saving it into our own array
        messages.push(message);
        // keep only ten messages at a time.
		// deleteMessages();
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