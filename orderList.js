// JavaScript Document
$(document).ready(function(e) {
	                      var _uid=fnBase.huoqu('uid');
						  var _status=0;
						  _status=fnBase.request('current');
						  if(_status==undefined){
						    _status=0;
						  }
			
						  var ztList=new Array();
						  ztList.push("","待付款","待发货","待收货","已完成","已取消","待预约","待量体","退货中","退货已完成");
			              //_uid=51; //测试
						 // getData();
						  function getData(){
								  var frontURL=Constant.URL+'Made/Order?code=101';
								  var postData ={"uid":_uid,"status":_status};
								  postData=JSON.stringify(postData);
								  fnBase.commonAjax(frontURL, {'param':postData},function(data){
								   console.log(data);
								   if(data.status==true){
									  if(!data.data){
									   return;
									  }
									  var _length=data.data.length;
									  var orderStr='';
									  
									  for(var i=0;i<_length;i++){
										var shuxing='';
										if(data.data[i].detail_data){
										   if(data.data[i].detail_data[0].title){
											   shuxing+=data.data[i].detail_data[0].title;
										   }
										   if(data.data[i].detail_data[0].child_title){
											   shuxing+=data.data[i].detail_data[0].child_title;
										   }
										}
										
										
										
										var btnStr='';
										if(data.data[i].status==1){
										  //待付款
										  btnStr='<a href="javascript:void(0)"class="b_color payBtn" ordernumber="'+data.data[i].order_number+'" amount="'+data.data[i].order_money+'">立即付款</a><a href="javascript:void(0)"class="n_color qxBtn" ordernumber="'+data.data[i].order_number+'" >取消订单</a>';
										}else if(data.data[i].status==2){
										  //待发货
										  //btnStr='<a href="javascript:void(0)"class="n_color qxBtn" ordernumber="'+data.data[i].order_number+'">取消订单</a>';
										}else if(data.data[i].status==3){
										  //待收货
										  btnStr='<a href="javascript:void(0)"class="b_color qrshBtn" ordernumber="'+data.data[i].order_number+'">确认收货</a>';
										}else if(data.data[i].status==4){
										  //已收货，完成订单
										   btnStr='<a href="javascript:void(0)"class="b_color thBtn" ordernumber="'+data.data[i].order_number+'">退货</a>';
										}else if(data.data[i].status==5){
										  //订单已取消
										  btnStr='';
										}else if(data.data[i].status==6){
										  //订单待预约
										   btnStr='<a href="javascript:void(0)"class="b_color yuyueBtn" ordernumber="'+data.data[i].order_number+'" >预约量体</a>';
										}else if(data.data[i].status==7){
										  //订单待量体
										  if(data.data[i].goods_data){
										   btnStr='<a href="javascript:void(0)"class="b_color liangtiBtn" ordernumber="'+data.data[i].order_number+'" _volume_id="'+data.data[i].goods_data[0].volume_id+'">量体</a>';
										  }else{
											     btnStr='<a href="javascript:void(0)"class="b_color liangtiBtn" ordernumber="'+data.data[i].order_number+'" _volume_id="1">量体</a>';
										  }
										 
										}else if(data.data[i].status==8){
										  //退货中
										  btnStr='';
										}else if(data.data[i].status==9){
										  //退货中
										  btnStr='';
										}
										
										var _title="";
										if(data.data[i].style_info){
											_title=data.data[i].style_info.title;
										}else{
										    _title="";
										}
										var _is_made=data.data[i].is_made;
									
										if(_is_made==0){
										 // alert(data.data[i].goods_data[0].vip_price+":"+data.data[i].goods_data[0].number);
									 	 var vp=parseFloat(data.data[i].goods_data[0].vip_price);
										 var nm=parseInt(data.data[i].goods_data[0].number);
										 var viptotalPrice=fnBase.accAdd(fnBase.accMul(vp,nm),data.data[i].freight);
										
										  orderStr+='<li viptotalPrice="'+viptotalPrice+'">';
										  
										  for(var j=0;j<data.data[i].goods_data.length;j++){
										  orderStr+='<div class="jiange"></div><div class="ordercontent"><p style="font-size:25px;margin-bottom:10px;color:#000">订单号：'+data.data[i].order_number+'</p><p style="font-size:25px;margin-bottom:20px;color:#000";">下单时间：'+data.data[i].format_time+'</p><div class="selectCon" style="display:none"></div><div class="imgCon"><a href="goodDetail.html?sid='+data.data[i].goods_data[j].goods_id+'"><img src="'+data.data[i].goods_data[j].attach_ids[0]+'"/></a></div><div class="txtCon"><p class="proName">'+data.data[i].goods_data[j].goods_name+'</p><p class="shuxing">'+data.data[i].goods_data[j].uselect_attr+'</p><p class="price"><span>￥'+data.data[i].goods_data[j].unit_price+'</span><span class="hyPrice" style="display:none">会员价</span><span class="hyPriceNumber"></span><span class="num">×'+data.data[i].goods_data[j].number+'</span></p></div><div style="clear:both"></div></div>';
										  }
										  
										  orderStr+='<p class="hj">共<span>'+data.data[i].goods_data[0].number+'</span>件商品 合计<span>￥'+data.data[i].order_money+'</span></p><div style="clear:both"></div><div class="btnArea"><span class="zt">'+ztList[data.data[i].status]+'</span><div class="rightBtnArea">'+btnStr+'</div></div>';
										}else{
											
										 var vp=parseFloat(data.data[i].vip_goods_price);
										 var nm=parseInt(1);
										 var viptotalPrice=fnBase.accAdd(fnBase.accMul(vp,nm),data.data[i].freight);
											
											 orderStr+='<li viptotalPrice="'+viptotalPrice+'"><div class="jiange"></div><div class="ordercontent"><p style="font-size:25px;margin-bottom:10px;color:#000">订单号：'+data.data[i].order_number+'</p><p style="font-size:25px;color:#000;">下单时间：'+data.data[i].format_time+'</p><div class="selectCon" style="display:none;"></div><div class="imgCon"><img src="'+data.data[i].made_img_path+'"/></div><div class="txtCon"><p class="proName">'+_title+'</p><p class="shuxing">'+shuxing+'</p><p class="price"><span>￥'+data.data[i].order_money+'</span><span class="hyPrice" style="display:none;">会员价</span><span class="hyPriceNumber"></span><span class="num">×1</span></p></div><div style="clear:both;"></div></div><p class="hj">共<span>1</span>件商品  合计<span>￥'+data.data[i].order_money+'</span></p><div style="clear:both;"></div><div class="btnArea"><span class="zt">'+ztList[data.data[i].status]+'</span><div class="rightBtnArea">'+btnStr+'</div></div></li>';
											
										}
									   
									  }
									  
									  $("#orderList").append(orderStr);
									  $(".qxBtn").unbind('click').click(
									    function(){
											//alert("取消订单");
											var order_number=$(this).attr("ordernumber");
											cancel_order(order_number);
										}
									  );
									  
									  $(".qrshBtn").unbind('click').click(
									     function(){
											
											 var order_number=$(this).attr("ordernumber");
											 confirm_order(order_number);
										 }
									  );
									  
									  //
									  
									  $(".payBtn").unbind('click').click(
									     function(){
										  
										    var order_number=$(this).attr("ordernumber");
										    var _amount=$(this).attr("amount");
										    window.sessionStorage.setItem("payType","product");
											var member_total_price=$(this).parent().parent().parent().attr("viptotalprice");
							                window.location.href="topUp.html?orderMoney="+encodeURIComponent(_amount)+"&order_number="+encodeURIComponent(order_number)+"&member_total_price="+encodeURIComponent(member_total_price); 
										   
										 //  orderPayIOS(order_number,_amount);
										 }
									  );
									  
									  //预约
									  $(".yuyueBtn").unbind('click').click(
									     function(){
										    var order_number=$(this).attr("ordernumber");
											yuyue(order_number);
										 }
									  );
									  //量体
									  
									 $(".liangtiBtn").unbind('click').click(
									     function(){
										    var order_number=$(this).attr("ordernumber");
											//yuyue(order_number);
											var _volume_id=$(this).attr("_volume_id");
											window.location.href="formList.html?current="+_volume_id+"&oderPush="+1+"&orderNumber="+order_number;//表示从订单列表进来，修改量体状态
											
										 }
									  );
									  
									  //退货
									  $(".thBtn").unbind('click').click(
									     function(){
											  var order_number=$(this).attr("ordernumber");
										  th(order_number);
										 }
									  );
									  
									  
									  
									  
								   }else{
									  fnBase.myalert(data.err_info.err_msg);
								   }
								   
								  })
							  
						  }
						  
						  $(".menu li").unbind('click').click(
						     function(){
							    $(this).addClass("active").siblings().removeClass("active");
								_status=$(this).index();
								$("#orderList").html("");
								getData();
							 }
						  );
						  
						  $(".menu li").eq(_status).click();
						  
						  


function cancel_order(order_number){
    _status = 5;
    var frontURL=Constant.URL+'Made/Order?code=203';
    // status 订单状态，1待付款，2为已付款待发货，3已发货待收货，4已收货完成订单，5订单已取消
    var postData ={"uid":_uid,"status": _status,"order_number":order_number};
    postData=JSON.stringify(postData);
    console.log(postData);

    // return;
    fnBase.commonAjax(frontURL, {'param':postData},function(res){
        // console.log(res);
        if (res && res.status == true && res.data && res.data.success == true) {
            fnBase.myalert('订单 已取消。');
			window.location.href=window.location.href;
        }
        
    });
}

// 确认收货
function confirm_order(order_number){
    _status = 4;
    var frontURL=Constant.URL+'Made/Order?code=203';
    // status 订单状态，1待付款，2为已付款待发货，3已发货待收货，4已收货完成订单，5订单已取消
    var postData ={"uid":_uid,"status": _status,"order_number":order_number};
    postData=JSON.stringify(postData);

    fnBase.commonAjax(frontURL, {'param':postData},function(res){
        console.log(res);
        //
        if (res && res.status == true && res.data && res.data.success == true) {
            fnBase.myalert('订单 已确认收货。');
			window.location.href=window.location.href;
        }
       
    });
}



//退货
function th(order_number){
   // _status = 4;
    var frontURL=Constant.URL+'api/Order?code=804';
    // status 订单状态，1待付款，2为已付款待发货，3已发货待收货，4已收货完成订单，5订单已取消
    var postData ={"return_goods":1,"order_number":order_number};
    postData=JSON.stringify(postData);

    fnBase.commonAjax(frontURL, {'param':postData},function(res){
        console.log(res);
        //
        if (res.status == 1) {
            fnBase.myalert('退货申请已经提交。');
			window.location.href=window.location.href;
        }else{
			fnBase.myalert(data.info);
		}
       
    });
}

						  
						
});



