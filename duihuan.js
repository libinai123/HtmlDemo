// JavaScript Document
$(document).ready(function(e) {
    $("#changePassword_btn").click(
	   function(){
	     var _code=$("#originalPassword").val();
		 if(_code==""){
		   fnBase.myalert("请输入虚拟卡卡号");
		   return;
		 }
		 var _uid=fnBase.huoqu("uid");
		 if (_uid == null || _uid == "undefined" || _uid == "") {
			window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
			return;
		 }
		 var frontURL=Constant.URL+'made/Virtual?code=105';
		 var postData ={"uid":_uid,"code":_code};
		 postData=JSON.stringify(postData);
		 fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="6"){
			     fnBase.myalert("恭喜你成为会员");
				 window.location.href="center.html";
			   }else{
			    window.location.href="balance.html";
			   }
         })
	   }
	);
	
});


