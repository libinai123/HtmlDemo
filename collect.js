// JavaScript Document
$(document).ready(function(e) {
	                  var _uid=fnBase.huoqu("uid");
					  if (_uid == null || _uid == "undefined" || _uid == "") {
						   window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
						   return;
					  }
                      var frontURL=Constant.URL+'made/Collect?code=104';
					  var postData ={"uid":_uid};
					  postData=JSON.stringify(postData);
					  fnBase.commonAjax(frontURL, {'param':postData},function(data){
					   console.log(data);
					   if(data.status=="1"){
						   $(".collectList").html("");
						   var collectStr='';
						   for(var i=0;i<data.info.length;i++){
						      collectStr+='<li sid="'+data.info[i].goods_id+'"><a href="javascript:;"><div class="imgBox fl"><div class="ver_pic"><div class="suppic"><img src="'+data.info[i].goods_data.attach_ids[0]+'"class="coImg"/></div></div></div><div class="infoBox fl"><p>'+data.info[i].goods_data.name+'</p><div class="qxCollectBtn" style="font-size:30px;background:#000;margin-top:50px;color:white;width:180px;height:50px;line-height:50px;text-align:center;"  collectid="'+data.info[i].id+'">取消收藏</div></div><div style="clear: both;"></div></a></li>';
						   }
						   $(".collectList").append(collectStr);
						   $(".coImg").autoZoomLoadImage(true, 140, 140);
						   $(".collectList li .qxCollectBtn").click(
						      function(){				  
								  var frontURL=Constant.URL+'made/Collect?code=103';
								  var collectid=$(this).attr("collectid");
								  var currentLi=$(this).parent().parent().parent();
								  var postData ={"id":collectid};
								  postData=JSON.stringify(postData);
								  fnBase.commonAjax(frontURL, {'param':postData},function(data){
								   console.log(data);
								   if(data.status=="1"){
									   //window.location.href="index.html";
									  fnBase.myalert("收藏已取消");
									  currentLi.remove();
  
								   }else if(data.status=="2"){
									  fnBase.myalert("亲你还没有添加哦，赶紧去选购吧");
								   }
								   else{
									  fnBase.myalert(data.info);
								   }
								   
								  })
								  return false;
								  
								  
								  
								  
								  
								  
							  }
						   );
						   
						   //
						   
						   
						    $(".collectList li").click(
							  function(){
							      window.location.href="goodDetail.html?sid="+encodeURIComponent($(this).attr("sid")); 
							  }
							); 
						   
											   
					   }else{
						   fnBase.myalert(data.info);
						 
					   }
					  })
});