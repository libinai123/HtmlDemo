// JavaScript Document
$(document).ready(function(e) {
    var _idlist=decodeURIComponent(fnBase.request("idlist"));
	var _source=decodeURIComponent(fnBase.request("source"));
	var _id=decodeURIComponent(fnBase.request("id"));//收货地址id
	var _goods_id=decodeURIComponent(fnBase.request("sid"));//商品ID，sid
	
	
	var member_total_price=0;
	
	var _volume_id=0;//等于0为非定制商品，否则为定制商品
	
	var _isSelect=window.sessionStorage.getItem("isSelect");
	if(_isSelect==null){
	  _isSelect=0;
	}
	if(_isSelect==0){
	 $(".fpInfo span").text("无需发票");
	}else if(_isSelect==1){
	 $(".fpInfo span").text("个人发票");
	}else if(_isSelect==2){
	 $(".fpInfo span").text("公司发票("+window.sessionStorage.getItem("company_Name")+")");
	}
	
	
	$("#alertArea #closeBtn").click(
	   function(){
	    $("#block40").hide();
		$("#alertArea").hide();
	   }
	);
	
	//发票信息
	$(".fpInfo").click(
	  function(){
	   window.location.href="fapiao.html";
	  }
	);
	
	var _ordermoney=0;
	var _freight=0;
	var _goodsattr='';
	if(_id=="undefined"){
	  _id="";
	}
	var _uid=fnBase.huoqu('uid');
	if (_uid == null || _uid == "undefined" || _uid == "") {
		window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
		return;
	}
	var frontURL=Constant.URL+'api/order?code=800';
	var postData =new Object();
	if(_source==1){
	  //alert("从购物车过来");
	  postData ={"uid":_uid,"idlist":_idlist,"goodsid":"","shopid":"","id":_id};
	}else{
	  //alert("从直接购买过来");
	   postData ={"uid":_uid,"idlist":"","goodsid":_goods_id,"shopid":"1","id":_id,"state":1};
	}
	$(".addCon").unbind('click').click(
		function(){
		 window.location.href="manageAddress.html?select=1"+"&idlist="+decodeURIComponent(_idlist)+"&source="+decodeURIComponent(_source)+"&order_type="+1;
		}
	 );
	postData=JSON.stringify(postData);
	fnBase.commonAjax(frontURL, {'param':postData},function(data){
          console.log(data);
			   if(data.status=="1"){
				   //地址
				   if(data.info.add){
				     $(".addCon .noAdd").hide();
					 $(".addCon .innerCon").show();
					 $(".rightTxtCon .shr span").eq(0).text(data.info.add.name);
					 $(".rightTxtCon .shr span").eq(1).text(data.info.add.phone);
					 $(".rightTxtCon .shdz").text(data.info.add.p+"  "+data.info.add.c+"   "+data.info.add.a+"   "+data.info.add.address);
					 _id=data.info.add.id;
				   }else{
				     $(".addCon .noAdd").show();
					 $(".addCon .innerCon").hide();
					 _id='';
				   }
				   _goodsattr=data.info.goodsattr;
				   _freight=data.info.result.freight;
				   _ordermoney=fnBase.accAdd(data.info.result.outdiscount,_freight);
	
				   //商品
				   $("#proList").html("");
				   var goodStr='';
				   for(var i=0;i<data.info.goods[0].node.length;i++){
				       goodStr+='<div class="ordercontent"><div class="imgCon"><img src="'+data.info.goods[0].node[i].attach[0]+'"></div><div class="txtCon" style="position:relative;width:430px;"><p class="proName">'+data.info.goods[0].node[i].goodsname+'</p><p class="shuxing">'+data.info.goods[0].node[i].uselect_attr+'</p><p class="price"><span class="proPrice">￥'+data.info.goods[0].node[i].shop_price+'</span> <span class="hyPrice">会员价</span> <span class="hyPriceNumber">￥'+data.info.goods[0].node[i].vip_price+'</span> </p><p class="num" style="position:absolute;top:72px;right:30px;"> ×'+data.info.goods[0].node[i].number+'</p></div><div style="clear:both"></div></div>';
					   _volume_id=data.info.goods[0].node[i].volume_id;
				   }
				   $("#proList").append(goodStr);
				   
				   member_total_price=fnBase.accAdd(fnBase.accMul(data.info.goods[0].node[0].vip_price,data.info.goods[0].node[0].number),_freight);
				   centerIntol(member_total_price);
				
				   //合计
				   $("#numTotal").text(data.info.result.goodscount);
				   $("#priceTotal").text(data.info.result.outdiscount);
				   $("#yf").text(_freight);
				   $("#sj").text(_ordermoney);
				   
				   $("#jiesuanBtn").click(
				     function(){
					     var frontURL=Constant.URL+'api/order?code=801';
						 if(_id==''){
						    fnBase.myalert("请选择收货地址！");
							return;
						 }
						 if(_volume_id==0||_volume_id==null){
						  var postData ={"uid":_uid,"freight":_freight,"receipt":_id,"shopid":"1","ordermoney":_ordermoney,"goodsattr":_goodsattr,"state":1};
						  if(_source==1){
							 postData ={"uid":_uid,"freight":_freight,"receipt":_id,"shopid":"1","ordermoney":_ordermoney,"goodsattr":_goodsattr,"state":0};
						  }
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
							console.log(data);
								if(data.status=="1"){
								  //fnBase.myalert("订单提交成功");
								   window.sessionStorage.setItem("payType","product");
							       window.location.href="topUp.html?orderMoney="+encodeURIComponent(_ordermoney)+"&order_number="+encodeURIComponent(data.url)+"&member_total_price="+encodeURIComponent(member_total_price); 
								  //orderPayIOS(data.url,_ordermoney);
								}else{
								  fnBase.myalert(data.info);
								}
							  }
						 ) 
							
						 }else{
						 $("#block40").show();
						 $("#alertArea").show();
	                    }
						/**/
						 
					 }
				   )
				   
				   $("#alertArea ul li").click(
				      function(){
					    if($(this).index()==2){
						  window.location.href="commonSize.html?volume_id="+encodeURIComponent(_volume_id)+"&id="+encodeURIComponent(_id)+"&ordermoney="+encodeURIComponent(_ordermoney)+"&goodsattr="+encodeURIComponent(_goodsattr)+"&freight="+encodeURIComponent(_freight)+"&uid="+encodeURIComponent(_uid)+"&member_total_price="+encodeURIComponent(member_total_price);
						}else if($(this).index()==1){
						  window.location.href="celiang.html?type=1"+"&current="+_volume_id+"&id="+encodeURIComponent(_id)+"&ordermoney="+encodeURIComponent(_ordermoney)+"&goodsattr="+encodeURIComponent(_goodsattr)+"&freight="+encodeURIComponent(_freight)+"&uid="+encodeURIComponent(_uid)+"&member_total_price="+encodeURIComponent(member_total_price);
						}else if($(this).index()==0){
						
						  
						  
						 var frontURL=Constant.URL+'api/order?code=801';
						 if(_id==''){
						    fnBase.myalert("请选择收货地址！");
							$("#block40").hide();
						    $("#alertArea").hide();
							return;
						 }
						  var postData ={"uid":_uid,"freight":_freight,"receipt":_id,"shopid":"1","ordermoney":_ordermoney,"goodsattr":_goodsattr,"state":1,"is_voluem":1};
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
							console.log(data);
								if(data.status=="1"){
								  //alert("订单提交成功");
								  //alert("调用原生预约");
								  yuyue(data.url);
								}else{
								  fnBase.myalert(data.info);
								}
							  }
						  ) 
							
						
						  
						}
					  }
				   );
				   
				   
				   
				   

			   }else{
				   
			     fnBase.myalert(data.info);
			   }
	})
	
	
	
});














function centerIntol(member_total_price){
	sessionStorage.removeItem("sc_order");
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
			if(data.info.rank==0){
			  //非会员
			  $("#mengban").show();
			  $("#memberCon").show();
			  $("#memp").text(member_total_price);
			  $("#mycloseBtn").unbind('click').click(
			     function(){
				  $("#mengban").hide();
			      $("#memberCon").hide();
				 }
			  );
			   $("#haixu").text(data.info.surplus_money);
			  $(".hyBtn").click(
			     function(){
			      sessionStorage.setItem("sc_order",window.location.href);
				  window.location.href="chongzhi.html";
				 }
			  );
			}
			}else{
			 alert(data.info);
			}
								   
	 })

}
