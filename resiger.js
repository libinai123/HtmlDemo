$(document).ready(function(e) {
	var currentType=fnBase.request("currentType");
	if(shebei_type==0){
		$("#closeBtn").hide();
	}
	$("#closeBtn").click(
	   function(){
		   if(currentType==0){  
			 history.go(-1);
		   }else{
					   if(shebei_type==0){
						   history.go(-1);
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
	   }
	);
   
   resiger.addEvent();
});
var resiger={
   sendCoded:false,
   inputList:new Array(),
   btnList:new Array(),
   addEvent:function(){
	 resiger.inputList=[];
	 resiger.btnList=[];
	 resiger.inputList.push($("#phone_txt"),$("#yzcode"),$("#psw_input"));
	 resiger.btnList.push($("#yzm"),$("#submitBtn"));
     resiger.btnList[0].click(
	    function(){
			  if(resiger.sendCoded){
			   return;
			  }
			  var phoneNumber=resiger.inputList[0].val();
			  if(phoneNumber==""){
					//fnBase.myalert("请填写手机号码");
					fnBase.myalert("请填写手机号码");
					return;
			  }
			  var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
			  if (!myreg.test(phoneNumber)) {
					fnBase.myalert("手机号码有误！ 请输入11位数字");
					return;
			  } 
			  var frontURL=Constant.URL+'api/util?code=203';
			  var postData ={"phone":phoneNumber,"ide":"resiger"};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				   fnBase.myalert("短信发送成功");
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
			  resiger.sendCoded=true;
			  resiger.timecount();
		}
	 );
	 resiger.btnList[1].click(
	  function(){
		     var nickName=$('#nickInput').val();
			 if(nickName==""){
			    fnBase.myalert("请输入用户名");
				return;
			 }
		      var phoneNumber=resiger.inputList[0].val();
			  if(phoneNumber==""){
					fnBase.myalert("请填写手机号码")
					return;
			  
			  }
			  var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
			  if (!myreg.test(phoneNumber)) {
					fnBase.myalert("手机号码有误！ 请输入11位数字");
					return;
			  } 
		     var _yzm=resiger.inputList[1].val();
			 if(_yzm==""){
			   fnBase.myalert("请填写验证码");
			 }
			 var _psw=resiger.inputList[2].val();
			 if(_psw==""){
			   fnBase.myalert("请输入密码");
			 }
			  var frontURL=Constant.URL+'api/user?code=102';
			  var _invita=decodeURIComponent(fnBase.request("invita"));
			  if(_invita=="undefined"||_invita==undefined){
			     _invita='';
			  }
			  var postData ={"u":nickName,"p":_psw,"m":phoneNumber,"c":_yzm,"ide":"resiger","invita":_invita};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				    fnBase.myalert("恭喜您注册成功，请重新登录！");
				   //fnBase.shanchu("uid");
				   //fnBase.baocun("uid",data.info);
				    if(_invita!=""){
						$("#maskCon").show();
						$("#ererma").show();
						var yuan=data.info.money;
						fnBase.myalert("恭喜亲获得拇指衣橱赠送的"+yuan+"元新人红包已存入您的账户");
						return;
					}
				   window.location.href = "login.html";
				   //window.location.href="center.html";
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
			 
		
	  }
	 );
   },
   timecount:function(){
         var total=60;
	     var mytimecont;
		 resiger.btnList[0].text("60秒后重发");
		 clearInterval(mytimecont);
		 mytimecont=setInterval(function(){
			 total=total-1;
			 var str=total+"秒后重发";
			 resiger.btnList[0].text(str);
			 if(total<=0){
				clearInterval(mytimecont);
				resiger.sendCoded=false;
				resiger.btnList[0].text("短信验证码");
			 }
		 },1000);
   
   }
   
}