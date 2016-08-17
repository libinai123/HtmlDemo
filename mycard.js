// JavaScript Document
var phoneNumber=$("#phoneInput").val();
var _uid=fnBase.huoqu("uid");
$(document).ready(function(e) {
	
	var currentItem=fnBase.request("current")
	if(currentItem==undefined){
	  currentItem=0;
	}	
	$("#menu li").click(
	  function(){
	    currentItem=$(this).index();
		visiblef();
		
	  }
	);
	    
		
function visiblef(){
	$("#menu li").eq(currentItem).addClass("active").siblings().removeClass("active");
	   if(currentItem==0){
		  $("#xunika").hide();
		  $("#mycardCon").show();
		  $("#jilu").hide();
		  $("#gm").show();
		  $("#zs").hide();
		}else if(currentItem==1){
		  $("#xunika").show();
		  $("#mycardCon").hide();
		  $("#jilu").hide();
		  $("#gm").hide();
		  $("#zs").show();
		}else if(currentItem==2){
		  $("#xunika").hide();
		  $("#mycardCon").hide();
		  $("#jilu").show();
		  $("#gm").hide();
		  $("#zs").hide();
		}
	}
    visiblef();  
	mycard();
    saleCard();
	zengsong();
});
//赠送成功后成功的回调
function shresu(){
	                      var mygoodid=sessionStorage.getItem("goods_id");
                          var frontURL=Constant.URL+'made/Virtual?code=108';
						  var postData ={"ipone":phoneNumber,"code":mygoodid,"uid":_uid};
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
						   console.log(data);
						   if(data.status=="1"){
							   fnBase.myalert("赠送成功");
							   var url=Constant.webURL+"getCode.html";
							   url+="?pn="+phoneNumber;
							   url+="&id="+data.info;
							   sendShareAddress(url);
							   window.location.href="mycard.html?current=1";
							    
							   
						   }else{
							    fnBase.myalert(data.info);
						   }
						  }) 

}
//赠送后失败的回调
function sharefail(){
 var mygoodid=sessionStorage.getItem("goods_id");
 var frontURL=Constant.URL+'made/Virtual?code=113';
						  var postData ={"code":mygoodid};
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
						   console.log(data);
						   if(data.status=="1"){
							   //window.location.href="index.html";
							   fnBase.myalert("赠送已取消");
							   window.location.href="mycard.html?current=1";
							   
							   
						   }else{
							   fnBase.myalert(data.info);
						   }
						  }) 

}


function mycard(){
             var _uid=fnBase.huoqu("uid");
			 if (_uid == null || _uid == "undefined" || _uid == "") {
				window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
				return;
			 }
			 var frontURL=Constant.URL+'made/Virtual?code=104';
			 var postData ={"uid":_uid};
             var _goods_id=0;
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				  if(data.info){
					 var cardStr='';
					 $("#xunika .topList ul").html('');
				     for(var i=0;i<data.info.length;i++){
						var currentType='';
						var btnStr='';//操作按钮
						//判断是否使用，
						var isUsed=0;
						isUsed=data.info[i].status;
						if(isUsed==1){
						 //未使用
						   if(data.info[i].is_give==1){
						     currentType="未赠送";
							 btnStr='<p class="newzsBtn" goods_id="'+data.info[i].code+'">赠送</p>';
						   }else if(data.info[i].is_give==2){
						     currentType="已赠送";
							  if(data.info[i].is_receive==1){
								  //未领取
								 currentType="对方未领取";
								 btnStr='<p class="qxzsBtn" goods_id="'+data.info[i].code+'">取消赠送</p>'
							  }else if(data.info[i].is_receive==2)
							  {   
							      currentType="对方已领取";
								  btnStr='';
							  }
						   } 	 
						}else if(isUsed==2){
						  currentType="已使用";
						  btnStr='';
						}
						 
					   if(data.info[i].type=="1"){
					    cardStr+='<li  style="background:url(images/gbkno.png) no-repeat center top;" isSelect="0" goods_id="'+data.info[i].code+'"><span class="miamzhi" style="font-size:20px;line-height:30px;height:30px;position:absolute;bottom:120px;right:5px;">'+data.info[i].money+'元</span><span class="danwei"></span> <p class="cardNum">卡号：'+data.info[i].code+'<span class="zhuangtai" style="color:#999;float:right;">'+currentType+'</span></p><div class="mengban"><img src="images/xz.png"></div><div class="zsBbtn">'+btnStr+'</div></li>';
					   }else{
					     cardStr+='<li isSelect="0" goods_id="'+data.info[i].code+'"><span class="miamzhi">'+data.info[i].money+'</span><span class="danwei">元</span> <p class="cardNum">卡号：'+data.info[i].code+'<span class="zhuangtai" style="color:#999;float:right;">'+currentType+'</span></p><div class="mengban"><img src="images/xz.png"></div><div class="zsBbtn">'+btnStr+'</li>';
					   }
					 }
					 $("#xunika .topList ul").append(cardStr);
					 
					 $(".newzsBtn").unbind('click').click(
					    function(){
						 
						  sessionStorage.setItem("goods_id",$(this).attr("goods_id"));
						  $("#phoneCon").show();
						}
					 );
					 
					/* $("#xunika .topList ul li").unbind('click').click(
					    function(){
							$(this).find(".mengban").show();
							$(this).attr("isSelect",1);
							_goods_id=$(this).attr("goods_id");
							mygoodid=$(this).attr("goods_id");
							$(this).siblings().find(".mengban").hide();
							$(this).siblings().attr("isSelect",0);
						}
					 );
					 
					 $("#tjBtn").unbind('click').click(
					    function(){
						  var selectNum=0;
						  for(var i=0;i<$("#xunika .topList ul li").length;i++){
						     if($("#xunika .topList ul li").eq(i).attr("isSelect")==1){
							   selectNum=selectNum+1;
							 }
						  }
						  if(selectNum==0){
						    fnBase.myalert("请选择需要购买的卡");
						    return;
						  }
						  $("#phoneCon").show();
						}
					 );*/
					 $("#tjBtn").hide();
					 $(".qxzsBtn").unbind('click').click(
					    function(){
						  var gid=$(this).attr("goods_id");
						  var frontURL=Constant.URL+'made/Virtual?code=113';
						  var postData ={"code":gid};
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
						   console.log(data);
						   if(data.status=="1"){
							   //window.location.href="index.html";
							   fnBase.myalert("赠送已取消");
							   window.location.href="mycard.html?current="+1;
						   }else{
							   fnBase.myalert(data.info);
						   }
						  }) 
						  
						}
					 );
					 
					 
					 $("#closeBtn").unbind("click").click(
					   function(){
						$("#phoneCon").hide();
					   }
					 )
					 
					 $("#sureBtn").unbind("click").click(
					    function(){
					           phoneNumber=$("#phoneInput").val();
							  if(phoneNumber==""){
									fnBase.myalert("请填写手机号码")
									return;
							  }
							  var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
							  if (!myreg.test(phoneNumber)) {
									fnBase.myalert("手机号码有误！ 请输入11位数字");
									return;
							  } 
							  
							   var url=Constant.webURL+"getCode.html";
							   url+="?pn="+phoneNumber;
							   shareCard(url);
							   $("#phoneCon").hide();
							  
						 
						}
					 );
				  }
				  
			   }else{
			       //fnBase.myalert(data.info);
			   }
              })
}

function saleCard(){
	         var _uid=fnBase.huoqu("uid");
			 if (_uid == null || _uid == "undefined" || _uid == "") {
				window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
				return;
			 }
	
              var _goods_id=0;
	          var frontURL=Constant.URL+'made/Virtual?code=101';
			  var postData ={};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				  if(data.info){
					 var cardStr='';
					 $("#mycardCon .topList ul").html('');
				     for(var i=0;i<data.info.length;i++){
					  if(data.info[i].type==1){
						  cardStr+='<li isSelect="0"  style="background:url(images/hyscale.png) no-repeat center center;" goods_id="'+data.info[i].id+'"><span class="miamzhi" style="font-size:20px;line-height:30px;height:30px;position:absolute;bottom:5px;right:5px;">'+data.info[i].money+'元</span><span class="danwei"></span><div class="mengban"><img src="images/xz.png"></div></li>';
					  }else{
						  cardStr+='<li isSelect="0" goods_id="'+data.info[i].id+'"><span class="miamzhi">'+data.info[i].money+'</span><span class="danwei">元</span><div class="mengban"><img src="images/xz.png"></div></li>';
					  }
					  
					 }
					 $("#mycardCon .topList ul").append(cardStr);
					 $("#mycardCon .topList ul li").unbind('click').click(
					    function(){
							$(this).find(".mengban").show();
							$(this).attr("isSelect",1);
							_goods_id=$(this).attr("goods_id");
							$(this).siblings().find(".mengban").hide();
							$(this).siblings().attr("isSelect",0);
						}
					 );
					 
					 $("#gmBtn").unbind('click').click(
					    function(){
						  var selectNum=0;
						  for(var i=0;i<$("#mycardCon .topList ul li").length;i++){
						     if($("#mycardCon .topList ul li").eq(i).attr("isSelect")==1){
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
							  window.sessionStorage.setItem("payType","card");
							  window.location.href="topUp.html?orderMoney="+encodeURIComponent(orderMoney)+"&order_number="+encodeURIComponent(order_number); 
							   
						   }else{
							   //fnBase.myalert(data.info);
							   
						   }
						  })
						  
						}
					 );
					 
					 
					 
				  }
				  
			   }else{
			       //fnBase.myalert(data.info);
			   }
              })
}


function zengsong(){
             var _uid=fnBase.huoqu("uid");
			 if (_uid == null || _uid == "undefined" || _uid == "") {
				window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
				return;
			 }
	          var frontURL=Constant.URL+'made/Virtual?code=109';
			  var postData ={"uid":_uid};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   $("#jilu ul").html("");
			   var jiluStr='';
			   if(data.status=="1"){
				  if(data.info){
				     for(var i=0;i<data.info.length;i++){
					   jiluStr+='<li><p class="name"><span class="phone">受赠人电话：'+data.info[i].ipone+'</span><span class="date">'+data.info[i].ctime+'</span></p><p class="jine">金额：'+data.info[i].money+'</p></li>'; 
					 }
					  $("#jilu ul").append(jiluStr);
				  }
				  
			   }else{
			       //fnBase.myalert(data.info);
			   }
			   
              })
}