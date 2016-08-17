// JavaScript Document
$(document).ready(function(e) {
              var _goods_id=0;
	          var frontURL=Constant.URL+'made/Virtual?code=101';
			  var postData ={};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				  if(data.info){
					 var cardStr='';
					 $(".topList ul").html('');
				     for(var i=0;i<data.info.length;i++){
					  cardStr+='<li isSelect="0" goods_id="'+data.info[i].id+'"><span class="miamzhi">'+data.info[i].money+'</span><span class="danwei">元</span><div class="mengban"><img src="images/xz.png"></div></li>';
					 }
					 $(".topList ul").append(cardStr);
					 $(".topList ul li").unbind('click').click(
					    function(){
							$(this).find(".mengban").show();
							$(this).attr("isSelect",1);
							_goods_id=$(this).attr("goods_id");
							$(this).siblings().find(".mengban").hide();
							$(this).siblings().attr("isSelect",0);
						}
					 );
					 
					 $("#tjBtn").unbind('click').click(
					    function(){
						  var selectNum=0;
						  for(var i=0;i<$(".topList ul li").length;i++){
						     if($(".topList ul li").eq(i).attr("isSelect")==1){
							   selectNum=selectNum+1;
							 }
						  }
						  if(selectNum==0){
						    fnBase.myalert("请选择需要购买的卡");
						    return;
						  }
						  
						  var _uid=fnBase.huoqu("uid");
						   if (_uid == null || _uid == "undefined" || _uid == "") {
							  window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
							   return;
						   }
						  var frontURL=Constant.URL+'made/Virtual?code=102';
						  var postData ={"uid":_uid,"id":_goods_id};
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
						   console.log(data);
						   if(data.status=="1"){
							  var orderMoney=data.info.order_money;
							  var order_number=data.info.order_number;
							  //paySource=1;购买虚拟卡
							  window.location.href="topUp.html?orderMoney="+encodeURIComponent(orderMoney)+"&order_number="+encodeURIComponent(order_number)+"&paySource="+encodeURIComponent("1"); 
							   
						   }else{
							   fnBase.myalert(data.info);
							   
						   }
						  })
						  
						}
					 );
					 
					 
					 
				  }
				  
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
	
	
});