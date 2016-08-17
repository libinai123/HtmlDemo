// JavaScript Document
$(document).ready(function(e) {
	var _uid=fnBase.huoqu("uid");
	if (_uid == null || _uid == "undefined" || _uid == "") {
	  window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
	   return;
	}
    $("#changePassword_btn").click(
	function(){
		var _originalPassword=$("#originalPassword").val();
		var _newPassword=$("#newPassword").val();
		var _confirmPassword=$("#confirmPassword").val();
		if(_originalPassword==""){
			// fnBase.myalert("请输入原密码");
			fnBase.myalert('请输入原密码');
			return;
		}
		if(_newPassword==""){
			fnBase.myalert("请输入新密码");
			return;
		}
		if(_confirmPassword==""){
		    fnBase.myalert("请输入确认密码");
			return;
		}
		if(_newPassword!=_confirmPassword){
		  fnBase.myalert("两次输入的密码不一致");
		  return;
		}
		var frontURL=Constant.URL+'api/user?code=114';
	    var postData ={"uid":_uid,"pass":_originalPassword,"newpass":_newPassword};
		postData=JSON.stringify(postData);
		fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				  //fnBase.baocun(0,"uid",'');
				   fnBase.myalert("修改密码成功！");
				   fnBase.shanchu("uid");
				   window.location.href = "login.html?historyPage="+encodeURIComponent("center.html");
			   }else{
			       fnBase.myalert(data.info);
			   }
        })
		
	}
);
});
