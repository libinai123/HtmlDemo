// JavaScript Document
$(document).ready(function(e) {
	$("#myorderCon").click(
	  function(){
	   window.location.href="orderList.html?current=0";
	  }
	);
	
    $("#orderMenu li").click(
	   function(){
	     window.location.href="orderList.html?current="+$(this).index();
	   }
	);
	$("#sizegl").click(
	  function(){
	    //openSizeCon();
		window.location.href="celiang.html?type="+0;
	  }
	);
	
	
	$("#collectPage").click(
	  function(){
	    window.location.href="collect.html";
	  }
	);
	
	$("#cartBtn").click(
	  function(){
	     window.location.href="cart.html";
	  }
	);
	
	$("#qianbaoBtn").click(
	  function(){
	    window.location.href="balance.html";
	  }
	);
	
	$("#setBtn").click(
	  function(){
	   window.location.href="set.html";
	  }
	);
	$("#xunjika").click(
	  function(){
	   window.location.href="mycard.html";
	  }
	);
	
	$("#kachongzhi").click(
	  function(){
		window.location.href="duihuan.html";
	  }
	);
	
	$("#hongbaoBtn").click(
	  function(){
	   window.location.href="hongbao.html";
	  }
	);
	
	$("#shoucangBtn").click(
	 function(){
	  window.location.href="collect.html";
	 }
	);
    centerIntol();
});


function centerIntol(){
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
			$("#userPackage").text("账户余额￥"+data.info.my_balance);
            $("#userName .name").text(data.info.nickname);
		    if(data.info.rank==0){
				$("#userName img").hide();
			}else{
				$("#userName img").show();
			}
			$("#headCon img").attr("src",data.info.avatar.a130);
			}else{
			 fnBase.myalert(data.info);
			}
								   
	 })

}
