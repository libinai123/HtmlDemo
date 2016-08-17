// JavaScript Document
$(document).ready(function(e) {
	
	
	var _uid=fnBase.huoqu("uid");
	if (_uid == null || _uid == "undefined" || _uid == "") {
	   window.location.href = "login.html?historyPage="+encodeURIComponent("center.html");
	   return;
	}
	
	$(".confirmBtn").click(
	   function(){
	    fnBase.shanchu("uid");
	
		window.location.href = "login.html?historyPage="+encodeURIComponent("center.html");
		
	   }
	);
});