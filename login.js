$(document).ready(function(e) {
	var historyPage=decodeURIComponent(fnBase.request("historyPage"));
    if(shebei_type==0){
	  $("#closeBtn").hide();
	}
    login.addEvent(historyPage);
	$("#closeBtn").click(
	   function(){
				  if(shebei_type==0){
					  window.location.href=historyPage;
				   }
				   else if(shebei_type==1){
					  jsCall.closePage();
				   }else if(shebei_type==2){
						connectWebViewJavascriptBridge(function(bridge) {
							 bridge.callHandler('closePage', {}, function (response) {
								log('JS got response', response)
							 })
						})
				   }
				   
		   
		   }
	   
	);
	
	
});
var login={
	addEvent:function(historyPage){
		$("#submitBtn").click(
			function(){
			  var phoneNumber=$("#phone_number_iput").val();
			  if(phoneNumber==""){
					fnBase.myalert("请填写手机号码")
					return;
			  }
			  var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
			  if (!myreg.test(phoneNumber)) {
					fnBase.myalert("手机号码有误！ 请输入11位数字");
					return;
			  } 
			  var psw_txt=$("#psw_input").val();
			  if(psw_txt==""){
			  	fnBase.myalert("请输入密码");
				return;
			  }
			  var frontURL=Constant.URL+'api/user?code=101';
			  var postData ={"u":phoneNumber,"p":psw_txt};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			  // alert("网络请求成功");
			   if(data.status=="1"){
				   //alert(currentType);
				   fnBase.baocun("uid",data.info.uid);
				   fnBase.myalert("登录成功！");
				   if(historyPage==""||historyPage==null||historyPage==undefined){
				     historyPage="center.html";
				   }
				   window.location.href =historyPage;
				   gotomypage();
				   //window.location.href="index.html";
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
			}
		);
	}
}