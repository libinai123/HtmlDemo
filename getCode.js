// JavaScript Document
$(document).ready(function(e) {
	var sendCoded=false;
	var pn=fnBase.request("pn");//电话号码
	var _id=fnBase.request("id");//返回的id

	$("#phone_number_iput").val(pn);
    $("#yzm").click(
	   function(){
		      if(sendCoded){
			   return;
			  }
	          
			 
			  var phoneNumber=$("#phone_number_iput").val();
			  var frontURL=Constant.URL+'made/Virtual?code=106';
			  var postData ={"phone":phoneNumber};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   
			   if(data.status=="1"){
				   alert("验证码已发送");
				   //window.location.href="index.html";
				  
			   }else{
			       alert(data.info);
			   }
			   sendCoded=true;
			   timecount();
              })
			    
			  
	   }
	);
	
	
	$("#submitBtn").click(
	  function(){
	          var phoneNumber=$("#phone_number_iput").val();
			  if(phoneNumber==""){
					alert("请填写手机号码")
					return;
			  }
			  var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
			  if (!myreg.test(phoneNumber)) {
					alert("手机号码有误！ 请输入11位数字");
					return;
			  } 
			  var _code=$("#yzcode").val();
			  if(_code==""){
			   alert("请输入验证码");
			   return;
			  }
			  
			  var frontURL=Constant.URL+'made/Virtual?code=107';
			  var postData ={"phone":phoneNumber,"code":_code,"id":_id};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				   alert("提交成功");
				   //window.location.href="index.html";
				  var code=data.info.code;
				  window.location.href="getcardSuccess.html?code="+code;
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
	  }
	);
	
	function timecount(){
	     var total=60;
	     var mytimecont;
		 $("#yzm").text("60秒后重发");
		 clearInterval(mytimecont);
		 mytimecont=setInterval(function(){
			 total=total-1;
			 var str=total+"秒后重发";
			 $("#yzm").text(str);
			 if(total<=0){
				clearInterval(mytimecont);
				sendCoded=false;
				$("#yzm").text("短信验证码");
			 }
		 },1000);
	}
	
	
});