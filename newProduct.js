// JavaScript Document
$(document).ready(function(e) {
	
     var frontURL=Constant.URL+'api/Goods?code=303';
	 var postData ={"is_new_products":true,"is_new_products_status":1};
	 postData=JSON.stringify(postData);
	 fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				 $(".matching-list").html("");
				 var npStr='';
				 for(var i=0;i<data.info.length;i++){
					npStr+='<li sid="'+data.info[i].id+'"><a href="javascript:void(0)" style="position:relative;"><img src="'+data.info[i].attach_ids[0]+'"/><p class="title">'+data.info[i].name+'</p><p class="price">￥'+data.info[i].shop_price+'</p><p class="price colorb9a05d"><span>会员价</span>￥'+data.info[i].vip_price+'</p> <p style="position:absolute;background:url(images/block40.png);color:white;top:33px;right:33px;padding-right:10px;padding-left:10px;">新品</p></a></li>';
				 }
				 $(".matching-list").append(npStr);
				 $(".matching-list li").unbind('click').click(
				    function(){
					  window.location.href="goodDetail.html?sid="+encodeURIComponent($(this).attr("sid")); 
					}
				 );
				 
			   }else{
			    alert(data.info);
			   }
	 })
	 
});