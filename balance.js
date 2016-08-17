// JavaScript Document
$(document).ready(function(e) {
    var frontURL=Constant.URL+'api/MemberWallet?code=201';
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
            $(".banQ span").text(data.info.my_balance);
			}else{
			 fnBase.myalert(data.info);
			}
								   
	})
	
	getlbData();
});



function getlbData(){
   var frontURL=Constant.URL+'api/MemberWallet?code=209';
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
            //generation_data虚拟卡充值
			var listStr='';
			$(".deList").html("");
			if(data.info.generation_data){
				for(var i=0;i<data.info.generation_data.length;i++){
				  listStr+='<li class="add"><span class="normal">+</span><span class="normal">'+data.info.generation_data[i].money+'元</span><span>虚拟卡充值</span><span>'+data.info.generation_data[i].utime+'</span><div style="clear:both"></div></li>';
				}
			}
			if(data.info.order_data){
			   for(var i=0;i<data.info.order_data.length;i++){
				  listStr+='<li class="add"><span class="normal">-</span><span class="normal">'+data.info.order_data[i].order_money+'元</span><span>购买商品</span><span>'+data.info.order_data[i].pay_time+'</span><div style="clear:both"></div></li>';
				}
			}
			if(data.info.virtual_data){
			   for(var i=0;i<data.info.virtual_data.length;i++){
				  listStr+='<li class="add"><span class="normal">+</span><span class="normal">'+data.info.virtual_data[i].order_money+'元</span><span>余额充值</span><span>'+data.info.virtual_data[i].ctime+'</span><div style="clear:both"></div></li>';
				}
			}
			
			
			$(".deList").append(listStr);
			}else if(data.status=="2"){
			  fnBase.myalert("亲你还没有消费记录哦");
			}else{
				 fnBase.myalert(data.info);
			}
								   
	})

}