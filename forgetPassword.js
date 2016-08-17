$(document).ready(
	function(){
	forgetPassword.addEvent();
	
	}
)
var forgetPassword={
   sendCoded:false,
   addEvent:function(){
     $("#f_yzm").click(
	    	function(){
			  if(forgetPassword.sendCoded){
			   return;
			  }
			  var phoneNumber=$("#f_phone_txt").val();
			  if(phoneNumber==""){
					alert("请填写手机号码")
					return;
			  
			  }
			  var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
			  if (!myreg.test(phoneNumber)) {
					alert("手机号码有误！ 请输入11位数字");
					return;
			  } 
			  var frontURL=Constant.URL+'api/util?code=203';
			  var postData ={"phone":phoneNumber,"ide":"forgetPassword"};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				  // alert("短信发送成功");
			   }else{
			       alert(data.info);
			   }
              })
			  forgetPassword.sendCoded=true;
			  forgetPassword.timecount();
		}
	 );
	 $("#forgetpassword_btn").click(
	  function(){
		     var phoneNumber=$("#f_phone_txt").val();
			  if(phoneNumber==""){
					alert("请填写手机号码")
					return;
			  }
			  var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
			  if (!myreg.test(phoneNumber)) {
					alert("手机号码有误！ 请输入11位数字");
					return;
			  } 
		     var f_yzm=$("#f_yzcode").val();
			 if(f_yzm==""){
			   alert("请填写验证码");
			   return;
			 }
			 var _psw=$("#f_pwd").val();
			 
			 if(_psw==""){
			  alert("请输入密码");
			  return;
			 }
			 
			  if(_psw.length<6){
			  alert("密码至少为6位");
			  return;
			 }
			 
			 var _rpsw=$("#re_pwd").val();
			 if(_rpsw==""){
			  alert("请输入确认密码");
			  return;
			 }
			 
			 if(_rpsw.length<6){
			  alert("密码至少为6位");
			  return;
			 }
			 if(_psw!=_rpsw){
			  alert("两次输入密码不一致");
			  return;
			 }
			 var frontURL=Constant.URL+'api/user?code=109';
			  var postData ={"phone":phoneNumber,"verifiy":f_yzm,"pass":_psw,"ide":"forgetPassword"};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				   alert("密码找回成功！");
				   window.location.href="login.html?currentType=3";
			
			   }else{
			       alert(data.info);
			   }
              })
		
	  }
	 );
   },
   timecount:function(){
         var total=60;
	     var mytimecont;
		 $("#f_yzm").text("60秒后重发");
		 clearInterval(mytimecont);
		 mytimecont=setInterval(function(){
			 total=total-1;
			 var str=total+"秒后重发";
			 $("#f_yzm").text(str);
			 if(total<=0){
				clearInterval(mytimecont);
				forgetPassword.sendCoded=false;
				$("#f_yzm").text("短信验证码");
			 }
		 },1000);
   
   }
   
}