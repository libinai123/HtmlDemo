// JavaScript Document
$(document).ready(function(e) {
    var _sid=decodeURIComponent(fnBase.request('sid'));
	var _ys=fnBase.request('ys');
	getData(_sid,_ys);
	/*已经选择商品点击重新选择商品规格*/
	$('.goodReady').click(function(){
		$('.choseDia').show();
		$("#slTxt").val(1);
	});
	/*尺码和颜色点击*/
	
});

function getData(sid,ys){
	          
	          var numTxt=1;
			  var sale_status=0;
			  var _typeTxt='';
	          var selectList=new Array();
			  var titleList = new Array();
              var frontURL=Constant.URL+'api/Goods?code=304';
			  var postData ={"sid":sid};
			  postData=JSON.stringify(postData);
			  var isCollect=0;
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				  //轮播图
				  var imgListStr='';
				  $("#slideBox .bd ul").html("");
				  for(var i=0;i<data.info.image.length;i++){
				    imgListStr+='<li><img src="'+data.info.image[i]+'"/></li>';
				  }
				  $("#slideBox .bd ul").append(imgListStr);
				  var hd = ($('#slideBox').find('.bd').find('li').length);
				  var hdWidth = hd*24;
				  var left = (592-hdWidth)*0.5;
				  $('#slideBox').find('.hd').css('left',left+'px');
					TouchSlide({
						slideCell:"#slideBox",
						titCell:".hd ul",
						mainCell:".bd ul",
						effect:"leftLoop",
						autoPage:true,
						autoPlay:true	
					});
					var _delivery_days=data.info.delivery_days;
					var _delivrydayStr='';
					if(_delivery_days==""||_delivery_days==null||_delivery_days==0){
					   _delivery_days='';
					   _delivrydayStr='';
					}else{
					  _delivrydayStr='<span style="color:#999">生产周期：'+_delivery_days+'天</span>'
					}
					
					
				  //商品名称、价格
				  $("#pName").text(data.info.name);
				  $("#deliCon").append(_delivrydayStr);
				  $("#pPrice").text("￥"+data.info.shop_price);
				  $("#vipPrice").text("￥"+data.info.vip_price);
				  //规格
				  var guigeStr='';
				  $("#attrSelectArea").html("");
				    if(data.info.attr){
					  for(var i=0;i<data.info.attr.length;i++){
						
						 guigeStr+='<p class="size">'+data.info.attr[i].field_name+'</p>';
						 titleList.push(data.info.attr[i].field_name);
						 selectList.push("0");
						 guigeStr+='<ul class="choseCon">';
						 for(var j=0;j<data.info.attr[i].attr.split(",").length;j++){
							guigeStr+='<li>'+data.info.attr[i].attr.split(",")[j]+'</li>';
						 }
						 guigeStr+='<div style="clear:both;"></div></ul>';
						  guigeStr+='<em class="closeBtn"></em>';
					  }
					  $("#attrSelectArea").append(guigeStr);
					}else{
					   $(".goodReady").hide();
					}
					
					
				  $(".goodLove").attr("goods_id",data.info.id);
				
				  if(ys==1){
	
					      //表示预售商品
						  $(".activeTime").show();
						  sale_status=data.info.sale_status;
						  if(sale_status==1){
							_typeTxt="正在进行中";
							_typeTxt="结束："+data.info.end_time;
						  }else if(sale_status==2){
							 _typeTxt="预售已结束";
						  }else if(sale_status==3){
							 _typeTxt="未开始预售";
						  }
						  $(".activeTime").text(_typeTxt);
						   
						 
				  var chushi=0;
				  var current_time=data.info.current_time;
				  var finish_time=data.info.finish_time;
				 
				 countDown();
				 
				 function countDown(){
				    setInterval(
					   function(){
					    
						      if(sale_status==1){
							        var nowTime = new Date(current_time * 1000+chushi);
									var endTime = new Date(finish_time * 1000);
					
									var t = endTime.getTime() - nowTime.getTime();
									
						            var d=Math.floor(t/1000/60/60/24);
									var hour=Math.floor(t/1000/60/60%24);
									   var min=Math.floor(t/1000/60%60);
									   var sec=Math.floor(t/1000%60);
						
									if (hour < 10) {
										 hour = "0" + hour;
									}
									if (min < 10) {
										 min = "0" + min;
									}
									if (sec < 10) {
										 sec = "0" + sec;
									}
									var countDownTime =d+"天"+ hour + "小时" + min + "分" + sec+"秒"; 
									if(t<=0){
										$(".activeTime").text("预售已结束");
									}else{
										$(".activeTime").text("剩余"+countDownTime);
									}
									
							  }
						 
						  chushi=chushi+1000;
					   
					   },1000
					)
				 
				 }
				 
						   
						  
						  
						  
						  
						  
						  
						 
				  }
				  
				  
				  collectType(data.info.id)
				  
				  $(".closeBtn").unbind('click').click(
				    function(){

					  $('.choseDia').hide();
					}
				  );
				  $('.choseCon').find('li').click(function(){
					var selectNum = 0;
					$(this).addClass('active').siblings().removeClass('active');
					selectList[$(this).parent().index('.choseCon')]=$(this).text();
					for(var i=0;i<selectList.length;i++){
					  if(selectList[i]!=0){
						  selectNum=selectNum+1;
						  if(selectNum==selectList.length){
							$(".goodReady").find("span").text(selectList.join(","));
						  }
					  }
					}
				  });
				  
				  $(".increse").click(
				    function(){
					  numTxt=numTxt-1;
					  if(numTxt<1){
					     numTxt=1;
					  }
					  $("#slTxt").val(numTxt);
					   
					}
				  );
				  
				  $(".add").click(
				    function(){
					 numTxt=numTxt+1;
					  if(numTxt>99){
					     numTxt=99;
					  }
					  $("#slTxt").val(numTxt);
					}
				  
				  );
				  
				  
				  
				  $(".lijigoumai").click(
				     function(){
						   
						    var _uid=fnBase.huoqu("uid");
							if (_uid == null || _uid == "undefined" || _uid == "") {
							    window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
								return;
							}
							
							
							
						   if(titleList.length==0){
							   
						   }else{
						     for(var i=0;i<selectList.length;i++){
							    if(selectList[i]=="0"){
								  fnBase.myalert("请选择"+titleList[i]);
								  $('.goodReady').click();
								  return;
								}
							 }
						   }					
						 
					   
					      //
						  if(ys==1&&sale_status!=1){
						    fnBase.myalert("只能购买预售中的商品");
							return;
						  }
						  
						  var postData = {
								"sid": sid,
								"uid": _uid,
								"attr": selectList.join(","),
								"number":numTxt,
								"state":1
								
							};

							postData = JSON.stringify(postData);
							fnBase.commonAjax(Constant.URL + 'api/cart?code=701', {
								'param': postData
							}, function(data) {
								console.log(data);
								 if (data.status == "1") {
									 window.location.href="productconfirmOrder.html?sid="+encodeURIComponent(sid)+"&source="+encodeURIComponent("0");
								 }else{
								   fnBase.myalert(data.info);
								 }
							})
						  
						 
						
					 }
				  );
				  
			      
				  $(".fenxiang").click(
				     function(){
						     var url=Constant.webURL+"goodDetail.html";
							 url+="?sid="+sid;
							 if(ys==1){
							   url+="&ys="+1;
							 }
							 var img= $("#slideBox .bd ul li").eq(0).find("img").attr("src");
							 var title=$("#pName").text();
						     shareProduct(url,img,title);
						 
						 
					 }
				  );
				  
			      
				  function collectType(_goods_id){
				      var _uid=fnBase.huoqu("uid");
					  if (_uid == null || _uid == "undefined" || _uid == "") {
						  // window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
						   return;
					  }
					  var frontURL=Constant.URL+'made/Collect?code=105';
					  var postData ={"uid":_uid,"goods_id":_goods_id};
					  postData=JSON.stringify(postData);
					  fnBase.commonAjax(frontURL, {'param':postData},function(data){
					   console.log(data);
					   if(data.status=="1"){
						//已收藏
						isCollect=1;
						$(".goodLove").css("background","#fff url(images/scHu.png) no-repeat center center");
					   }else if(data.status=="2"){
						//未收藏
						isCollect=0;
						$(".goodLove").css("background","#fff url(images/scH.png) no-repeat center center");
					   }
					  })
				  }
				  
				  
				  //收藏
				  $(".goodLove").click(
				     function(){
					   var _uid=fnBase.huoqu("uid");
					   if (_uid == null || _uid == "undefined" || _uid == "") {
						   window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
						   return;
					   }
					  var frontURL=Constant.URL+'made/Collect?code=101';
					  var _goods_id=$(this).attr("goods_id");
					  var postData ={"uid":_uid,"goods_id":_goods_id};
					  postData=JSON.stringify(postData);
					  fnBase.commonAjax(frontURL, {'param':postData},function(data){
					   console.log(data);
					   if(data.status=="1"){
						   //window.location.href="index.html";
						   fnBase.myalert(data.info);
						   collectType(_goods_id);
						   
					   }else{
						   fnBase.myalert(data.info);
						   collectType(_goods_id);
					   }
					  })
					   
					   
					 }
				  );
				  
				  
				  
				  //商品详情
				  if(data.info.info){
					$(".deShow .goodList").html(data.info.info);
					$(".deShow .goodList a").attr("href");
					
					for(var i=0;i<$(".deShow .goodList a").length;i++){
					  var httpStr=$(".deShow .goodList a").eq(i).attr("href");
					  var newhttp=httpStr.replace("http://","");
					  $(".deShow .goodList a").eq(i).attr("href",newhttp);
					  
					}
					
				  
				  }else{
				    //商品详情为空
					fnBase.myalert("暂无商品详情");	
				  }
				  
				  
				  //评论
				  if(data.info.comment){
				    $(".elvList").html("");
					var plStr='';
					for(var i=0;i<data.info.comment.length;i++){
					  plStr+='<li><img src="'+data.info.comment[i].user_avatar.a60+'"class="pjTx fl"/><p class="fl pjName">'+data.info.comment[i].user_nickname+'</p><em class="fl pjLev"></em><div style="clear:both;"></div><p class="elvCon">'+data.info.comment[i].content+'</p><p class="elvTime"><span>'+data.info.comment[i].ctime+'</span></p></li>';
					}
					$(".elvList").append(plStr);
				  
				  }else{
                    //暂无评论
					//fnBase.myalert("暂无评论");
					$(".goodElv").hide();				  
				  }
				  
				 //推荐搭配
				 if(data.info.recommend_data){
					$(".reList").html("");
					var tjdpStr='';
					//fnBase.myalert(data.info.recommend_data.length);
					for(var i=0;i<data.info.recommend_data.length;i++){
					  tjdpStr+='<li><a href="goodDetail.html?sid='+data.info.recommend_data[i].id+'"><p>'+data.info.recommend_data[i].name+'</p><p>￥'+data.info.recommend_data[i].shop_price+'</p><p><span>会员价</span>￥'+data.info.recommend_data[i].vip_price+'</p><div class="ver_pic"><div class="suppic"><img src="'+data.info.recommend_data[i].attach_ids[0]+'"class="rocImg"/></div></div></a></li>';
					}
					tjdpStr+='<div style="clear:both;"></div>';
					$(".reList").append(tjdpStr);
					 
				 }else{
				   //fnBase.myalert("暂无推荐搭配");
				   $(".recom").hide();
				 }
				 $(".rocImg").autoZoomLoadImage(true, 182, 182);
				  
				  
			   }else{
			    fnBase.myalert(data.info);
			   }
			   
			   
              })
  
  
}