
$(document).ready(function(e) {
/*  var orderNumber=fnBase.request("orderNumber");
  //loadData(1469530912897)
  if(orderNumber!=undefined){
	  loadData(orderNumber);
  }*/
   getorderIDfunction();
   //loadData(1469930699746565)
   
});
function loadData(orderNumber){
	        
	        var _uid=fnBase.huoqu('uid');
			var isRank=0;
			var order_number = orderNumber;
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
							if(data.info.rank==0){
								isRank=0;
							}else{
								isRank=1;
							}	
							 addData();			
							}else{
							 fnBase.myalert(data.info);
							}
												   
					 })
			
	/*		var order_number = orderNumber;
			if(shebei_type==2){
			   //注意，IOS返回值需要时间，要等待返回值有了以后才能使用返回值，否则调用不到
                 addData();
		     }else {
			     addData();
			 }*/
			 $("#alertArea #closeBtn").click(
			   function(){
				$("#block40").hide();
				$("#alertArea").hide();
			   }
	          );
			 
			 
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
			 
			 //发票信息
			$(".fpInfo").click(
			  function(){
			   window.location.href="fapiao.html";
			  }
			);
			 
			// _uid=50; //测试
			function addData(){

			 var _addressid=decodeURIComponent(fnBase.request("id"));
			 if(_addressid=="undefined"){
			    _addressid='';
			 }
			 var orderMoney=0;
	         var frontURL=Constant.URL+'Made/Order?code=202';
			 var postData ={"uid":_uid,"order_number":order_number,"receipt":_addressid};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status==true){
				   if(data.data.address_info==false){
				      //没有默认地址
					 $(".addCon .noAdd").show();
					 $(".addCon .innerCon").hide();
					 _addressid='';
					  
				   }else{
				     //有默认地址
				     $(".addCon .noAdd").hide();
					 $(".addCon .innerCon").show();
					 $(".rightTxtCon .shr span").eq(0).text(data.data.address_info.name);
					 $(".rightTxtCon .shr span").eq(1).text(data.data.address_info.phone);
					 $(".rightTxtCon .shdz").text(data.data.address_info.p+"  "+data.data.address_info.c+"   "+data.data.address_info.a+"   "+data.data.address_info.address);
					 _addressid=data.data.address_info.id;
				   }
				   var goodM=data.data.goods_money;
				   var vipM=data.data.vip_goods_price;
				   if(isRank==0){
				      $(".price #proPrice").text("￥"+goodM);
					  $(".sp .rPrice").text("￥"+goodM);
					  $("#priceTotal").text(goodM);
					   orderMoney=goodM;
				   }else if(isRank==1){
				      $(".price #proPrice").text("￥"+vipM);
					  $(".sp .rPrice").text("￥"+vipM);
					  $("#priceTotal").text(vipM);
					  orderMoney=vipM;
				   }
				   if(data.data.made_img_path){
				       $(".ordercontent .imgCon img").attr("src",data.data.made_img_path);
				   }
				   $(".txtCon .proName").text(data.data.style_info.title);
				   if(data.data.shape){
				      $(".ordercontent .txtCon .shuxing").eq(0).text("体型："+data.data.shape);
				   }
				   if(data.data.shirt_size){   
				      $(".ordercontent .txtCon .shuxing").eq(1).text("尺寸："+data.data.shirt_size);
				   }
				   var member_total_price=0;
				   if(isRank==0){
				    member_total_price=fnBase.accAdd(fnBase.accMul(goodM,1),data.data.freight);
				   }else if(isRank==1){
				    member_total_price=fnBase.accAdd(fnBase.accMul(vipM,1),data.data.freight);
				   }
				   
				   centerIntol(fnBase.accAdd(fnBase.accMul(vipM,1),data.data.freight),orderNumber);
				   $("#zongjia").text("￥"+member_total_price);
				   $(".addCon").unbind('click').click(
				      function(){
					     window.location.href="manageAddress.html?select=1";
					  }
				   );	   
				   $("#jiesuanBtn").click(
				      function(){
						
						 if(_addressid==''){
						    fnBase.myalert("请选择收货地址！");
							return;
						 }
						 
					
						
						  var frontURL=Constant.URL+'Made/Order?code=203';
						  var postData ={"uid":_uid,"order_number":order_number,"order_money":orderMoney,"receipt":_addressid,"status":0,"back_up":$("#bzCon").val()};
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
						   console.log(data);
						   if(data.status==true){
							  if(data.data.success==true){
								  //fnBase.myalert("提交订单成功"); 
								  $("#block40").show();
						          $("#alertArea").show();
//_________________________________________________________________________________________________________________________________________________________________


                                    $("#alertArea ul li").click(
								     function(){
												if($(this).index()==0){
													  var frontURL=Constant.URL+'api/Order?code=804';
													  var postData ={"order_number":order_number,"is_voluem":1};
													  postData=JSON.stringify(postData);
													  fnBase.commonAjax(frontURL, {'param':postData},function(data){
													   console.log(data);
													   if(data.status=="1"){
														   //alert(currentType);
														   //调用原生的
														   yuyue(order_number);    
													   }else{
														   fnBase.myalert(data.info);
													   }
													  })
													
												  
												}else if($(this).index()==1){
													
												  window.location.href="celiang.html?type=1&current=1&app=1&order_number="+order_number+"&member_total_price="+encodeURIComponent(member_total_price);;
												 
												}else if($(this).index()==2){
						                          window.location.href="commonSize.html?volume_id=1&app=1&order_number="+order_number+"&member_total_price="+encodeURIComponent(member_total_price);;
												}
										  }
				                       );
									   
									   
//_______________________________________________________________________________________________________________________________________________________________________________								   
									   
									   
									   

                                         
          




								  
		     					 /* if(shebei_type==2){
									   orderPayIOS(order_number,orderMoney,"shangpin")
								  
			                      }else if(shebei_type==1){
									   jsCall.goPayPage();
								  }*/
							  }
						   }else{
							  fnBase.myalert(data.err_info.err_msg);
						   }
						  })
						 
					  }
				   );
				   
				   
			   }else{
			       fnBase.myalert(data.err_info.err_msg);
			   }
              })
			  
			  
			}
	

}






function centerIntol(member_total_price,orderNumber){
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
			   $("#haixu").text(data.info.surplus_money);
			  $("#mycloseBtn").unbind('click').click(
			     function(){
				  $("#mengban").hide();
			      $("#memberCon").hide();
				 }
			  );
			  $(".hyBtn").click(
			     function(){
				  var linkURL=window.location.href+"?orderNumber="+orderNumber;
			      sessionStorage.setItem("sc_order",linkURL);
				  window.location.href="chongzhi.html";
				 }
			  );
			}
			}else{
			 fnBase.alert(data.info);
			}
								   
	 })

}


