// JavaScript Document
$(document).ready(function(e) {
	
	var _uid=fnBase.huoqu("uid");
	if (_uid == null || _uid == "undefined" || _uid == "") {
	   window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
	   return;
	}
	
	var orderMoney=decodeURIComponent(fnBase.request("orderMoney"));
	var order_number=decodeURIComponent(fnBase.request("order_number"));
	var leixing=window.sessionStorage.getItem("payType");
	var wallet_money=0;
    var payType=0;
	$(".styleList li").click(
	   function(){
	    $(this).find(".myli").addClass("select").removeClass("unselect");
		$(this).siblings().find(".myli").addClass("unselect").removeClass("select");
		$(".yueCon").find(".myli").addClass("unselect").removeClass("select");
		$(".yueCon").attr("isSelect",0);
		payType=$(this).index();
	   }
	);
	
	$(".settleBtn").click(
	  function(){
		  if(leixing=="product"){
		     if($(".yueCon").attr("isSelect")==1){
			   //alert("钱包支付");
			  if(orderMoney>parseFloat($("#yeNumber").text()))
			  {
				fnBase.myalert("您的余额不足，请选择其他支付方式");
				return;
			  }
			
			  var frontURL=Constant.URL+'api/order?code=811';
			  var postData ={"onumber":order_number,"uid":_uid,"state":'y'};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				   fnBase.myalert("支付成功");
				   window.location.href="paySuccess.html";
				 
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
			 }else{
			   orderPayIOS(order_number,orderMoney, window.sessionStorage.getItem("payType"),payType);//支付宝给类型传0,微信支付1 
			 }
			 
		  }else{
		     orderPayIOS(order_number,orderMoney, window.sessionStorage.getItem("payType"),payType);//支付宝给类型传0,微信支付1
		  }
	  }
	);
	
	if(leixing=="product"){
	   $(".yueCon").show();
	   centerIntol();
	   $(".yueCon").click(
		  function(){
			 $(this).find(".myli").addClass("select").removeClass("unselect");
			 $(".styleList li").find(".myli").addClass("unselect").removeClass("select");
			 $(this).attr("isSelect",1);
		  }
	   );
	   
	}else{
	   $(".yueCon").hide();
	   $(".styleList li").eq(0).click();
	}
	
	
	
	
	
});
function centerIntol(){
	var isMember=888;
	var frontURL=Constant.URL+'api/User?code=103';
	var _uid=fnBase.huoqu("uid");
	if (_uid == null || _uid == "undefined" || _uid == "") {
	   window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
	   return;
	}
	var postData ={"uid":_uid};
	postData=JSON.stringify(postData);
	fnBase.commonAjax(frontURL, {'param':postData},function(data){
		 console.log(data);
		if(data.status=="1"){
			   //window.location.href="index.html";
			$("#yeNumber").text(data.info.my_balance);
            isMember=data.info.rank;
			$("#haixu").text(data.info.surplus_money);
			
			if(isMember==0){
			  //非会员
			  return;
			  $("#mengban").show();
			  $("#memberCon").show();
			  $("#memp").text(decodeURIComponent(fnBase.request("member_total_price")));
			  $("#closeBtn").unbind('click').click(
			     function(){
				  $("#mengban").hide();
			      $("#memberCon").hide();
				  
				 }
			  );
			  $(".hyBtn").click(
			     function(){
				  window.location.href="chongzhi.html";
				 }
			  );
			  
			}
			}else{
			 alert(data.info);
			}
								   
	 })

}
