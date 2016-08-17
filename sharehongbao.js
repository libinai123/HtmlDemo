// JavaScript Document
$(document).ready(function(e) {
      var _invita=decodeURIComponent(fnBase.request("invita"));
	  var url="http://bingxu.intplus.com/Wap/shirt/resiger.html";
	  url+="?invita="+encodeURIComponent(_invita);
	  $(".resigerBtn").click(
	    function(){
		 window.location.href=url;
		}
	  );
});