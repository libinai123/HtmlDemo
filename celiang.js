// JavaScript Document
$(document).ready(function(e) {
	var _type=fnBase.request("type");
	var current=0;
	var _uid=fnBase.huoqu('uid');
	current=fnBase.request('current');
	if(current==undefined){
	 current=0;
	}else{
	 current=current-1;
	}
	if (_uid == null || _uid == "undefined" || _uid == "") {
		window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
		return;
	}
	$("#topClass li").click(
	  function(){
	    $(this).addClass("active").siblings().removeClass("active");
		current=$(this).index();
		getListData(_type,_uid,parseInt(current+1));
	  }
	);
	if(_type==0){
		//从个人中心进入
		$("#addDataBtn").show();
		$("#nextStepBtn").hide();
		$("#yuyueliangti").hide();
		$("#submitorderBtn").hide();
		$("#addDataBtn").css("width","594px");
		$("#addDataBtn").click(
		   function(){
			   var _mycurrent=parseInt(current+1);
		       window.location.href="formList.html?current="+_mycurrent;
		   }
		);
		$("#topClass li").eq(current).click();
		//getListData(_type,_uid,parseInt(current+1));
		$("#topClass").show();
		$("#contentCon").css("top","90px");
	}else if(_type==1){
		//从历史数据进入
		$("#addDataBtn").hide();
		$("#nextStepBtn").hide();
		$("#yuyueliangti").show();
		$("#submitorderBtn").show();
	    $("#topClass li").eq(current).click();
		$("#topClass").hide();
		$("#contentCon").css("top",0);
	}
});


function getListData(_type,_uid,_status){
	          var s_id='';
	          $("#contentCon ul").html("");
			  var mystr='';
              var frontURL=Constant.URL+'made/Volume?code=104';
			  var postData ={"uid":_uid,"status":_status};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				   //fnBase.myalert(currentType);
				   if(data.info){
				     for(var i=0;i<data.info.length;i++){
					   mystr+='<li _id="'+data.info[i].id+'"><div class="innerDiv"><div class="operationCon unselect"></div><div class="titleTxt">'+data.info[i].name+'</div></div></li>';
					 }
				   }
				   $("#contentCon ul").append(mystr);
				   if(_type==0){
				     $("#contentCon ul li .operationCon").hide();
				   }
				   $("#contentCon ul li").click(
					  function(){
					     var _id=$(this).attr("_id");
						 window.location.href="formList.html?id="+_id+"&current="+_status;
					  }
					);
					
				  if(_type==1){
					   //历史数据
					   $("#yuyueliangti").show();
					   $("#yuyueliangti").css("width","296px");
					   $("#submitorderBtn").show();
					   $("#contentCon ul li .operationCon").click(
						  function(){
							 $(this).addClass("select").removeClass("unselect");
							 $(this).parent().parent().siblings().find(".operationCon").addClass("unselect").removeClass("select");
							 s_id= $(this).parent().parent().siblings().attr("_id");
						
							 return false;  
						  }
						);
						
						
				       $("#submitorderBtn").click(
					      function(){
							 if(s_id==""){
							   fnBase.myalert("请需选择历史数据");
							   return;
							 }
							 
							  var _app=fnBase.request("app");//来源于原生
							  if(_app==1){
								    //来源于APP
									 var _order_number=fnBase.request("order_number");
									 var frontURL=Constant.URL+'api/order?code=804';
									 var postData ={"order_number":_order_number,"state":"1","volume_id":s_id,"is_voluem":2};
									  postData=JSON.stringify(postData);
									  fnBase.commonAjax(frontURL, {'param':postData},function(data){
										console.log(data);
											if(data.status=="1"){
											  fnBase.myalert("订单提交成功");
											  window.location.href="orderList.html";
											}else{
											  fnBase.myalert(data.info);
											}
										  }
									 ) 
								  
								  
							    
							   
							  }else{
							     var _id=decodeURIComponent(fnBase.request("id"));//收货地址id
								 var _ordermoney=decodeURIComponent(fnBase.request("ordermoney"));//订单金额
								 var _goodsattr=decodeURIComponent(fnBase.request("goodsattr"));
								 var _freight=decodeURIComponent(fnBase.request("freight"));//运费
								 var _uid=decodeURIComponent(fnBase.request("uid"));//用户uid
								 var _volume_id=s_id;
								 submitDzOrder(_uid,_freight,_id,_ordermoney,_goodsattr,_volume_id);
							  
							  }
							  
							 
						    
						  }
					   );
					   
					   
					   
					
					   
					   
						
				   
				   }
				   
				  
			   }else if(data.status=="2"){
				   fnBase.myalert("亲您还没有历史数据哦，选择预约量体马上收集您的身体数据吧!");
				   if(_type==1){
					   //历史数据
					   $("#yuyueliangti").show();
					   $("#yuyueliangti").css("width","594px");
					   $("#submitorderBtn").hide();
				   }
				   
				  
			   }else{
			       //alert(data.info);
			   }
			   
			   
			   
			   
			      $("#yuyueliangti").click(
					      function(){
						      var _app=fnBase.request("app");//来源于原生
							  if(_app==1){
							       //来源于APP
								    var _order_number=fnBase.request("order_number");
								    yuyue(_order_number);
								   
								      
							  }else{
								   
										 var _id=decodeURIComponent(fnBase.request("id"));//收货地址id
										 var _ordermoney=decodeURIComponent(fnBase.request("ordermoney"));//订单金额
										 var _goodsattr=decodeURIComponent(fnBase.request("goodsattr"));
										
										 var _freight=decodeURIComponent(fnBase.request("freight"));//运费
										 var _uid=decodeURIComponent(fnBase.request("uid"));//用户uid
										  var frontURL=Constant.URL+'api/order?code=801';
										 
										  var postData ={"uid":_uid,"freight":_freight,"receipt":_id,"shopid":"1","ordermoney":_ordermoney,"goodsattr":_goodsattr,"state":1,"is_voluem":1};
										  postData=JSON.stringify(postData);
										  fnBase.commonAjax(frontURL, {'param':postData},function(data){
											console.log(data);
												if(data.status=="1"){
												  //alert("订单提交成功");
												 // alert("调用原生预约");
												  yuyue(data.url);
												}else{
												  fnBase.myalert(data.info);
												}
											  }
										  ) 
							  }
							 
							  
						  }
					   );
			   
			   
			   
			   
			   
              })
}


function submitDzOrder(_uid,_freight,_id,_ordermoney,_goodsattr,_volume_id){
var frontURL=Constant.URL+'api/order?code=801';
var postData ={"uid":_uid,"freight":_freight,"receipt":_id,"shopid":"1","ordermoney":_ordermoney,"goodsattr":_goodsattr,"state":"1","volume_id":_volume_id};
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
							console.log(data);
								if(data.status=="1"){
								   //orderPayIOS(data.url,_ordermoney);
								   
								    window.sessionStorage.setItem("payType","product");
									var member_total_price=decodeURIComponent(fnBase.request("member_total_price"));
							        window.location.href="topUp.html?orderMoney="+encodeURIComponent(_ordermoney)+"&order_number="+encodeURIComponent(data.url)+"&member_total_price="+encodeURIComponent(member_total_price); 
								   
								  fnBase.myalert("订单提交成功");
								}else{
								  fnBase.myalert(data.info);
								}
							  }
						 ) 
}