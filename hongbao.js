// JavaScript Document
$(document).ready(function(e) {
    $(".shareBtn").click(
	  function(){
		var _uid=fnBase.huoqu("uid");
	    var url=Constant.webURL+"sharehongbao.html";
		url+="?invita="+encodeURIComponent(_uid);
		var img=Constant.webURL+"images/hongbao.jpg";
		var title="拇指衣橱——新人有礼";
		shareProduct(url,img,title);
	  }
	);
	
	$("#hbjlBtn").click(
	   function(){
	    window.location.href="integral.html";
	   }
	);
	
});