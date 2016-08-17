// JavaScript Document
$(document).ready(function(e) {
     var frontURL=Constant.URL+'api/Goods?code=303';
	 var postData ={"is_pre_sale":1};
	 postData=JSON.stringify(postData);
	 fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				 $(".matching-list").html("");
				 var npStr='';
				 var typeArray=new Array();
				 typeArray.push("正在进行中","预售已结束","预售未开始");
				 for(var i=0;i<data.info.length;i++){
					var saleTime=typeArray[data.info[i].sale_status-1];
					if(data.info[i].sale_status==1){
					  //saleTime="剩余："+data.info[i].end_time;
					}				
					npStr+='<li sale_status="'+data.info[i].sale_status+'" sid="'+data.info[i].id+'" current_time="'+data.info[i].current_time+'" finish_time="'+data.info[i].finish_time+'"><a href="javascript:void(0)"><img src="'+data.info[i].attach_ids[0]+'"/><p class="title">'+data.info[i].name+'</p><p class="price">￥'+data.info[i].shop_price+'</p><p class="price colorb9a05d"><span>会员价</span>￥'+data.info[i].vip_price+'</p><p class="time colorb9a05d"><i class="clock-icon"></i><span class="shengyu" style="font-size:14px;">'+saleTime+'</span></p></a></li>';
				 }
				 
				 $(".matching-list").append(npStr);
				 var chushi=0;
				 
				 countDown();
				 
				 function countDown(){
				    setInterval(
					   function(){
					      for(var i=0;i<$(".matching-list li").length;i++){
						      if($(".matching-list li").eq(i).attr("sale_status")==1){
							        var nowTime = new Date($(".matching-list li").eq(i).attr("current_time") * 1000+chushi);
									var endTime = new Date($(".matching-list li").eq(i).attr("finish_time") * 1000);
					
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
										$(".matching-list li").eq(i).find(".shengyu").text("预售已结束");
									}else{
										$(".matching-list li").eq(i).find(".shengyu").text("剩余"+countDownTime);
									}
									
							  }
						  }
						  chushi=chushi+1000;
					   
					   },1000
					)
				 
				 }
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 $(".matching-list li").unbind('click').click(
				    function(){
					  window.location.href="goodDetail.html?sid="+encodeURIComponent($(this).attr("sid"))+"&ys="+1; 
					}
				 );
				 $(".matching-list img").autoZoomLoadImage(true, 253, 253);
				 
			   }else{
			    alert(data.info);
			   }
	 })
	 
});