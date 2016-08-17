// JavaScript Document
$(document).ready(function(e) {
		  if($(".chakanBtn").attr("paysucc")==0){
			  
		  }
	      else{
				 if(window.sessionStorage.getItem("payType")=="card"){
					$(".chakanBtn").text("查看我购买的卡");
				   
				  }else if(window.sessionStorage.getItem("payType")=="chongzhi"){
					$(".chakanBtn").text("查看我的钱包");
					$("#hb").hide();
					$(".myorder").show();
					var sc_order=sessionStorage.getItem("sc_order");

					if(sc_order==null){
					  $(".myorder").text("我的订单");
					}else{
					  $(".myorder").text("返回确认订单");
					}
					
					$(".myorder").click(
					  function(){
						if(sc_order==null){
						   window.location.href="orderList.html";  
						}else{
						   window.location.href=sc_order; 
						}
					
					  }
					);
				   
				  }else{
					$(".chakanBtn").text("我的订单");
				   
				  }
		  }
	
    $(".chakanBtn").click(
	  function (){
	
		if($(this).attr("paysucc")==0){
		 history.go(-1)
		}else{
		 // alert(window.sessionStorage.getItem("payType"));
		  if(window.sessionStorage.getItem("payType")=="card"){
		     window.location.href="mycard.html?current="+1;  
		  }else if(window.sessionStorage.getItem("payType")=="chongzhi"){
		     window.location.href="balance.html";
		  }
		  else{
		     window.location.href="orderList.html";  
		  }
		  
		}
	  }
	);
});