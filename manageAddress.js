$(document).ready(function(e) {	
    manageAddress.init();
	$("#xzBtn").click(
	  function(){
	     window.location.href="newAddress.html";  
	  }
	);
});
var manageAddress={
	init:function(){
		
		var selectAdd=decodeURIComponent(fnBase.request("select"));//表示要选择地址
	    var _uid=fnBase.huoqu("uid");
	    var frontURL=Constant.URL+'api/user?code=105';
		var postData = _uid;
	    fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status==1){
				
				var str='';
				for(var i=0;i<data.info.length;i++){
					var desAddress=data.info[i].p+" "+data.info[i].c+" "+data.info[i].a+" "+data.info[i].address;
					if(data.info[i].default==1){
					   str+='<li addressID="'+data.info[i].id+'"><div class="manageAddressTop"><p class="xmdh"><span class="_name">'+data.info[i].name+'</span><span class="phone">'+data.info[i].phone+'</span></p><p style="clear:both"></p><p class="desadress">'+desAddress+'</p></div><div class="manageAddressBottom"><p class="setDefault deficohover">设置默认地址</p><p class="xiugai">删除</p><p class="bianjiBtn">编辑</p></div></li>';
					}else{
					str+='<li addressID="'+data.info[i].id+'"><div class="manageAddressTop"><p class="xmdh"><span class="_name">'+data.info[i].name+'</span><span class="phone">'+data.info[i].phone+'</span></p><p style="clear:both"></p><p class="desadress">'+desAddress+'</p></div><div class="manageAddressBottom"><p class="setDefault defico">设置默认地址</p><p class="xiugai">删除</p><p class="bianjiBtn">编辑</p></div></li>';
				    }
		
				}
				$(".manageAddressList").append(str);
				//设置默认
				$(".manageAddressList li .manageAddressBottom .setDefault").unbind("click").click(
				    function(){
					      var addID=$(this).parent().parent().attr("addressID");					
						  var currentLi=$(this).parent().parent();
						  var frontURL=Constant.URL+'api/User?code=110';
						  var postData ={"id":addID,"uid":_uid};
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
						   console.log(data);
						   if(data.status=="1"){
							  currentLi.find(".manageAddressBottom .setDefault").addClass("deficohover").removeClass("defico");
							  currentLi.siblings().find(".manageAddressBottom .setDefault").removeClass("deficohover").addClass("defico");
						   }else{
							   fnBase.myalert(data.info);
						   }
						  })
					     return false;
					}
				);
				//删除
				$(".manageAddressList li .manageAddressBottom .xiugai").unbind("click").click(
				   function(){
						  var addID=$(this).parent().parent().attr("addressID");
						  var currentLi=$(this).parent().parent();
						  var frontURL=Constant.URL+'api/User?code=111';
						  var postData ={"id":addID,"uid":_uid};
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
						   console.log(data);
						   if(data.status=="1"){
							fnBase.myalert("删除成功");
							currentLi.remove();
							if($(".manageAddressList li").length==0){
								$("#zanwu").show();
							}
							window.location.reload();
						   }else{
							   fnBase.myalert(data.info);
						   }
						  })
						
				    return false;
					   
				   }
				);
				//编辑
				$(".manageAddressList li .manageAddressBottom .bianjiBtn").unbind("click").click(
				   function(){
					   var addID=$(this).parent().parent().attr("addressID");
					   window.location.href="eidtAddress.html?id="+encodeURIComponent(addID);
					   return false;
				   }
				);
				$(".manageAddressList li").unbind('click').click(
				   function(){
				     if(selectAdd==1){
						var _id=$(this).attr("addressID");
						var _order_type=decodeURIComponent(fnBase.request("order_type"));
						if(_order_type==1){
							
							var source=decodeURIComponent(fnBase.request("source"))
							var _idlist=decodeURIComponent(fnBase.request("idlist"));
							window.location.href="productconfirmOrder.html?id="+encodeURIComponent(_id)+"&source="+source+"&idlist="+encodeURIComponent(_idlist);
							
						}else{
						    window.location.href="confirmOrder.html?id="+encodeURIComponent(_id);
						}
					 }
				   }
				);
				
			
			}else if(data.status==2){
				
			    $(".manageAddressList").html("");
				$("#zanwu").unbind("click").click(
					function(){
						  window.location.href="newAddress.html";  
					}
				);
				$("#zanwu").show();
				   //新增
			}
       })
	}
}