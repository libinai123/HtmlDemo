// JavaScript Document
$(document).ready(function(e) {
	
    var _volume_id=decodeURIComponent(fnBase.request("volume_id"));//定制分类
	var _id=decodeURIComponent(fnBase.request("id"));//收货地址id
	var _ordermoney=decodeURIComponent(fnBase.request("ordermoney"));//订单金额
	var _goodsattr=decodeURIComponent(fnBase.request("goodsattr"));
	var member_total_price=decodeURIComponent(fnBase.request("member_total_price"));

	var _freight=decodeURIComponent(fnBase.request("freight"));//运费
	var _uid=decodeURIComponent(fnBase.request("uid"));//用户uid
    var _app=fnBase.request("app");//来源于原生
	getSizeData(_app,_volume_id,_id,_ordermoney,_goodsattr,_freight,_uid,member_total_price);
	
	
});
//获取尺寸的数据
function getSizeData(_app,_pid,_id,_ordermoney,_goodsattr,_freight,_uid,member_total_price){
	          //alert(_pid);
	          var sizeSelect='';
	          var tixingSelect='';
              var frontURL=Constant.URL+'made/size?code=104';
			  var postData ={"pid":_pid};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				  $(".sizeCon").html("");
				  $("#commonSize .title").eq(0).text("请选择"+data.info[0].field_name);
				  var str=' <span style="float:right;background:#000;color:white;font-size:20px;padding:10px;" id="bzcm">标准尺码参照表</span>';
				  $("#commonSize .title").eq(0).append(str);
				  $("#bzcm").click(
				  function(){
				   
				   var url="";
				   if(_pid==3){
				    //裤子
					url="kz_biaozhunchima.html";
				   }else if(_pid==1){
				     //衬衣
					url="biaozhunchima.html";
				   }else if(_pid==2){
				     //西装
					url="xz_biaozhunchima.html";
				   }else if(_pid==4){
				     //套装
					url="tz_biaozhunchima.html";
				   }
				   window.location.href=url;
				  }
				);
				  var sizeStr='';
				  for(var i=0;i<data.info[0].item.length;i++){
				     sizeStr+='<p>'+data.info[0].item[i]+'</p>';
				  }
				  
				  $(".sizeCon").append(sizeStr);
				  //点击选择尺寸
				  $(".sizeCon p").unbind('click').click(
				     function(){
					    $(this).addClass('active').siblings().removeClass('active');
						sizeSelect=$(this).text();
					 } 
				  );
				  //点击选择体型
				  $(".txCon li").unbind('click').click(
				    function(){
					    $(this).addClass('active').siblings().removeClass('active');
						tixingSelect=$(this).find('p').text();
						
					}
				  );
				  
				  $("#backIndexBtn").click(
				    function(){
					  //window.location.href="index.html";
					  if(_app==1){
					   goIndex();
					  }else{
					   window.location.href="index.html";
					  }
					}
				  );
				  
				  
				  $("#submitOrder").unbind('click').click(
				      function(){
					     if(sizeSelect==''){
						   fnBase.myalert("请选择尺寸");
						   return;
						 }
						 if(tixingSelect==''){
						   fnBase.myalert("请选择体型");
						   return;
						 }
						 if(_app==1){
						   //来源于APP
						     var _order_number=fnBase.request("order_number");
						   	 var frontURL=Constant.URL+'api/order?code=804';
							 var postData ={"order_number":_order_number,"state":"1","shirt_size":sizeSelect,"shape":tixingSelect};
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
							 var frontURL=Constant.URL+'api/order?code=801';
							 var postData ={"uid":_uid,"freight":_freight,"receipt":_id,"shopid":"1","ordermoney":_ordermoney,"goodsattr":_goodsattr,"state":"1","shirt_size":sizeSelect,"shape":tixingSelect};
							  postData=JSON.stringify(postData);
							  fnBase.commonAjax(frontURL, {'param':postData},function(data){
								console.log(data);
									if(data.status=="1"){
									  //orderPayIOS(data.url,_ordermoney);
									   window.sessionStorage.setItem("payType","product");
							           window.location.href="topUp.html?orderMoney="+encodeURIComponent(_ordermoney)+"&order_number="+encodeURIComponent(data.url)+"&member_total_price="+encodeURIComponent(member_total_price); 
									  
									  fnBase.myalert("订单提交成功");
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
}