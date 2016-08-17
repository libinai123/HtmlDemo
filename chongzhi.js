// JavaScript Document
$(document).ready(function(e) {
    var _uid=fnBase.huoqu('uid');
	if (_uid == null || _uid == "undefined" || _uid == "") {
		window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
		return;
	}
   selectPayType(_uid);
   getCardValue();                       
});


function selectPayType(_uid){
   var payType=0;
	$(".styleList li").click(
	   function(){
	    $(this).find(".myli").addClass("select").removeClass("unselect");
		$(this).siblings().find(".myli").addClass("unselect").removeClass("select");
		payType=$(this).index();
	   }
	);
	
	$(".settleBtn").click(
	  function(){
	  
		   var _money=$("#moneyTxt").val();
		   if(_money==""){
		    fnBase.myalert("请输入正确金额或者选择面值");
			return;
		   }
		   
		   if(isNaN(_money)==false){
              
		   }else{
		     fnBase.myalert("请输入正确金额或者选择面值");
			 return;
		   }
		   
		   
		   
		   var frontURL=Constant.URL+'made/Virtual?code=111';
						  var postData ={"uid":_uid,"money":_money};
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
						   console.log(data);
						   if(data.status=="1"){
							     window.sessionStorage.setItem("payType","chongzhi");
		                         orderPayIOS(data.info.order_number,data.info.order_money, window.sessionStorage.getItem("payType"),payType);
						   }else{
								
							 fnBase.myalert(data.info);
							}
						  })
		   
			
			
		  
		}
	 
	);
}
function getCardValue(){
                          var frontURL=Constant.URL+'made/Virtual?code=110';
						  var postData ={};
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
						   console.log(data);
						   if(data.status=="1"){
							 $("#moneyValue ul").html("");
							 var moneyStr='';
							 if(data.info){
							    for(var i=0;i<data.info.length;i++){
							   /*   if(data.info[i].money==9800){
									  moneyStr+='<li style="position:relative" myv="'+data.info[i].money+'"><span>'+data.info[i].money+'</span>元<p style="position:absolute;top:-28px;left:40px;color:red;font-size:20px;">VIP</p></li>';
								  }else{
								  moneyStr+='<li myv="'+data.info[i].money+'"><span>'+data.info[i].money+'</span>元</li>';
								  }*/
								   moneyStr+='<li myv="'+data.info[i].money+'"><span>'+data.info[i].money+'</span>元</li>';
								  
								}
							 }
							 $("#moneyValue ul").append(moneyStr);
							 $("#moneyValue ul li").click(
							   function(){
								  $(this).addClass("active").siblings().removeClass("active");
							      $("#moneyTxt").val($(this).attr("myv"));
							   }
							 );
							   
						   }else{
							   fnBase.myalert(data.info);
							   
						   }
						  })

}