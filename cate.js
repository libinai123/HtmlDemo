// JavaScript Document
$(document).ready(function(e) {
	
	          var _current=fnBase.request("current");
			  if(_current==undefined||_current==null||_current=="undefined"){
				  _current=0;
			  }
              var frontURL=Constant.URL+'api/goods?code=301';
			  fnBase.commonAjax(frontURL, {'param':''},function(data){
               console.log(data);
				   if(data.status=="1"){
					    if(data.info){
						   var di=data.info;
						   var diStr='';
						   //$("#flCon ul").html("");
						   for(var i=0;i<di.length;i++){
						      diStr+='<li ><a class="yiji" cateid="'+di[i].id+'"  href="javascript:void(0)">'+di[i].title+'';
							  if(di[i]._node){
							      diStr+='<i class="angles-icon fr"></i></a>';
								  diStr+='<dl class="menu-child" style="display: none;">';
								  for(var j=0;j<di[i]._node.length;j++){
								     diStr+='<dd ><a class="erji" cateid="'+di[i]._node[j].id+'" href="javascript:void(0)">'+di[i]._node[j].title+'</a></dd>';
								  }
							  }else{
							     diStr+='</a>';
							  }
							 diStr+='</li>';
						   }
						   $("#flCon ul").append(diStr);
						   
						   
						 
							//左侧栏目
							$(".menu a").on("click", function() {
								var thisParent = $(this).parent().parent();
								var isAddAction = !$(this).hasClass("action");
								thisParent.find(".action").removeClass("action");
								var nowActionChild = thisParent.find(".menu-child.show");
								if (nowActionChild.length > 0) {
									nowActionChild.removeClass("show");
									nowActionChild.slideUp("fast");
								}
								if (isAddAction) {
									$(this).addClass("action");
									if (!thisParent.hasClass("menu-child")) {
										var newActionChild = $(this).parent().find(".menu-child");
										newActionChild.addClass("show");
										newActionChild.slideDown("fast");
									}
								}
							});
							
							$("#flCon ul li a.yiji").click(
							   function(){
							      //alert("一级");
								  var _index=$(this).parent().index();
								  if(_index==0){
								    getProData(0,0);
								  }else if(_index==1){
								    getProData(1,0);
								  }else{
									var _cateid=$(this).attr("cateid");
								    getProData(2,_cateid);
								  }
								  //alert($(this).text());
								  $("title").html($(this).text()); 
								  setcateTitle($(this).text())
								  
								  return false;
							   }
							);
							$("#flCon ul li").eq(_current).find('a.yiji').click();
						    $("#flCon ul li a.erji").click(
							   function(){
							      //alert("二级");
								  var _cateid=$(this).attr("cateid");
								  getProData(2,_cateid);
								  return false;
							   }
							);

						}
				   }else{
					   fnBase.myalert(data.info);
				   }
			   
              })
	
});

function getProData(type,cateid){
	$("#proListCon").html("");
		      var frontURL=Constant.URL+'api/Goods?code=303';
			  var postData ={};
			  if(type==0){
			     postData='';
			  }else if(type==1){
			     var postData ={"is_new_products":true};
			     postData=JSON.stringify(postData);
			  }else if(type==2){
			      var postData ={"cate":cateid};
			      postData=JSON.stringify(postData); 
			  }
			  
			   fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				  $("#proListCon").html("");
					  if(data.info){
						var proStr='';
						for(var i=0;i<data.info.length;i++){
						   proStr+='<li sid="'+data.info[i].id+'"><a href="javascript:void(0)"><img src="'+data.info[i].attach_ids[0]+'"><p class="title">'+data.info[i].name+'</p><p class="price">￥'+data.info[i].shop_price+'</p><p class="price colorb9a05d"><span>会员价</span>￥'+data.info[i].vip_price+'</p></a></li>';
						}
						
					  }
					  $("#proListCon").append(proStr);
					  //列表图片适配
					  $(".matching-list img").autoZoomLoadImage(true, 185, 185);
					  $("#proListCon li").click(
					     function(){
						   window.location.href="goodDetail.html?sid="+encodeURIComponent($(this).attr("sid")); 
						 }
					  );
				  
			   }else{
			       //fnBase.myalert(data.info);
			   }
              })



}
