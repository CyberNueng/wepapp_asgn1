var socket = io();

//http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

//start code fron one ui
var chatAddMessage = function($chatId, $chatMsg, $chatMsgLevel, $chatInput) {
	// Get chat window
	var $chatWindow = jQuery('.js-chat-talk[data-chat-id="' + $chatId + '"]');

	// If message and chat window exists
	if ($chatMsg && $chatWindow.length) {
		var $chatBlockClasses = 'animated fadeIn push-50-r';
		var $chatMsgClasses   = 'bg-gray-lighter';
		var $lr = 'align="left"'

		// Post it to its related window (if message level is 'self', make it stand out)
		if ($chatMsgLevel === 'self') {
			$chatBlockClasses   = 'animated fadeInUp push-50-l';
			$chatMsgClasses     = 'bg-gray-light';
			var $lr = 'align="right"'
		}
		var splitmsg = $chatMsg.split("//");
		$chatWindow.append('<div class="block block-rounded block-transparent push-15 ' + $chatBlockClasses + '"'+$lr+'>'
				+ jQuery('<div />').text(splitmsg[1]).html()
				+ '<div class="block-content block-content-full block-content-mini ' + $chatMsgClasses + '"'+$lr+'>'
				+ jQuery('<div />').text(splitmsg[0]).html()
				+ '</div>'
				+ '</div>');

		// Scroll the message list to the bottom
		$chatWindow.animate({ scrollTop: $chatWindow[0].scrollHeight }, 150);

		// If input is set, reset it
		if ($chatInput) {
			$chatInput.val('');
		}
	}
};
//end code fron one ui

socket.on('chat', function(message) {
	var spmsg = message.split(": "); //split username
	if(spmsg[0]==getUrlParameter('user[name]'))
		chatAddMessage(1,message,'self',false);
	else
		chatAddMessage(1,message,'no',false);
});

$('#chat-form').submit(function() {
	if($('#chat-text').val()==''){
		return false;
	}
	var chatmsg = $('#chat-text').val();
	socket.emit('chat', getUrlParameter('user[name]')+': '+chatmsg);
	$('#chat-text').val('');
	return false;
});
//
document.getElementById("username").innerHTML = 'User: '+getUrlParameter('user[name]');