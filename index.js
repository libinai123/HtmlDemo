// JavaScript Document
$(document).ready(function(e) {
	$("#searchBtn").click(
	  function(){
	     if($("#searchInput").val()==""){
		   fnBase.myalert("请输入搜索内容");
		   return;
		 }
		 var _key=$("#searchInput").val();
		 window.location.href="searchResult.html?key="+encodeURIComponent(_key);
	  }
	);
	
	$(".ltmenu").click(
	  function(){
	    if($(this).attr("isShow")==0){
		  $(this).attr("isShow",1);
		  $("#menuCon").show();
		  $("#menuMain").show();
		  
		}else{
		  $(this).attr("isShow",0);
		  $("#menuCon").hide();
		  $("#menuMain").hide();
		}
	  }
	);
	
	$("#menuCon").click(
	  function(){
	     $("#menuCon").hide();
		 $("#menuMain").hide();
		 $(".ltmenu").attr("isShow",0);
	  }
	);
	
	
	$("#menuMain ul li").click(
	  function(){
	    if($(this).index()==0){
		  window.location.href="shopList.html";
		}else if($(this).index()==1){
		  window.location.href="intro.html?type=1";
		}else if($(this).index()==2){
		  var url=Constant.webURL+"index.html";
		  var title=Constant.shareTitle;
		  var img=Constant.webURL+"images/aboutBg1.png";
		  shareProduct(url,img,title);
		}else if($(this).index()==3){
		  window.location.href="http://free.appkefu.com/AppKeFu/float/wap/chat.php?wg=muzhiyichu1&robot=false";
		}
	  }
	);
	
	
    var frontURL=Constant.URL+'api/Home/?code=401';
	fnBase.commonAjax(frontURL, {'param':''},function(data){
               console.log(data);
			   if(data.status=="1"){
				   //轮播图
				   $("#slideBox .bd ul").html("");
				   var lbStr='';
				   if(data.info.lunbo){
				     var lbData=data.info.lunbo;
					 for(var i=0;i<lbData.length;i++){
					   lbStr+='<li><a href="'+lbData[i].url+'"><img src="'+lbData[i].attach+'"/></a></li>';
					 }
				   }
				   $("#slideBox .bd ul").append(lbStr);
				   TouchSlide({
					slideCell: "#slideBox",
					titCell: ".hd ul",
					mainCell: ".bd ul",
					effect: "leftLoop",
					autoPage: true, //自动分页
					autoPlay: false //自动播放
				  });
				  
				  //广告图
				  $(".matching-type").html("");
				  var adStr='';
				  if(data.info.indexPush){
				    var adData=data.info.indexPush;
					for(var i=0;i<adData.length;i++){
					   adStr+='<li><a href="'+adData[i].url+'"><img src="'+adData[i].attach+'"/></a></li>';
					}
				  }
				  $(".matching-type").append(adStr);
				  
				  //新品
				  $("#newPro").html("");
				  var newProStr='';
				  newProStr+='<dt><span>|</span> 新品展示<span id="newProMore" style="float:right;font-size:25px;font-weight:normal;">更多></span></dt>';
				  if(data.info.goods){
					  var gdData=data.info.goods;
					  for(var i=0;i<gdData.length;i++){
					    newProStr+='<dd><a href="goodDetail.html?sid='+gdData[i].id+'" style="position:relative;"><img src="'+gdData[i].attach+'" style="position:relative;"/><p class="title">'+gdData[i].name+'</p><p class="price">￥'+gdData[i].shop_price+'</p><p class="price colorb9a05d"><span>会员价</span>￥'+gdData[i].vip_price+'</p><p style="position:absolute;background:url(images/block40.png);color:white;top:33px;right:33px;padding-right:10px;padding-left:10px;">新品</p></a></dd>'; 
					  }
				  }
				  $("#newPro").append(newProStr);
				  $("#newProMore").click(
					  function(){
					   window.location.href="matching-new.html";
					  }
				  );
				  //猜你喜欢
				  $("#guessYouLike").html("");
				  var guessStr='';
				  guessStr+='<dt><span>|</span>猜你喜欢</dt>';
				  if(data.info.likeGoods){
				     var guessDta=data.info.likeGoods;
					 for(var i=0;i<guessDta.length;i++){
					    guessStr+='<dd><a href="goodDetail.html?sid='+guessDta[i].id+'" ><img src="'+guessDta[i].attach+'"/><p class="title">'+guessDta[i].name+'</p><p class="price">￥'+guessDta[i].shop_price+'</p><p class="price colorb9a05d"><span>会员价</span>￥'+guessDta[i].vip_price+'</p></a></dd>';
					 }
				  }
				  $("#guessYouLike").append(guessStr);
				  $(".matching-type img").autoZoomLoadImage(true, 640, 200);
				  //列表图片适配
				  $(".matching-list img").autoZoomLoadImage(true, 253, 253);
			   }else{
			       fnBase.myalert(data.info);
			   }
    })
});