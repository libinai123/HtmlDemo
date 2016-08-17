// JavaScript Document
$(document).ready(function(e) {
    var _uid=fnBase.huoqu('uid');
	var selectProList=new Array();
	var totalPrice=0;
	var viptotalPrice=0;
	if (_uid == null || _uid == "undefined" || _uid == "") {
		window.location.href = "login.html";
		return;
	}
	var frontURL=Constant.URL+'api/cart?code=703';
			  var postData ={"uid":_uid};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				 var cartData=data.info;
				 var cartStr='';
				 $(".cartList").html("");
				 for(var i=0;i<cartData.length;i++){
				   cartStr+='<li isSelect="1"  cartid="'+cartData[i].id+'" num="'+cartData[i].number+'" proPrice="'+cartData[i].unit_price+'"  vipPrice="'+cartData[i].vip_price+'"><div class="fl select leftIcon"></div><div class="fl cenImg"><div class="ver_pic"><div class="subpic"><img src="'+cartData[i].attach[0]+'" class="imgList"></div></div></div><div class="fl rightCon"><p>'+cartData[i].goodsname+'</p><p class="guige"><span>'+cartData[i].uselect_attr+'</span></p><p class="price"><span>￥'+cartData[i].unit_price+'</span><span>会员价: ￥'+cartData[i].vip_price+'</span></p><div class="lastCon"><div class="fl num"><button class="fl increse jian"></button> <input type="text" class="fl NumValue" value="'+cartData[i].number+'" disabled> <button class="fl add jia"></button><div style="clear:both;margin:0"></div></div><p class="fr delBtn"></p><div style="clear:both;margin:0"></div></div></div><div style="clear:both;margin:0"></div></li>';
				 }
				 $(".cartList").append(cartStr);
				 //选中或取消单个商品
				 $(".cartList li").find(".leftIcon").unbind('click').click(
				    function(){
					  var currentLi=$(this).parent();
					  if(currentLi.attr("isSelect")==0){
				         currentLi.attr("isSelect",1);
						 $(this).addClass("select").removeClass("unselect");
					  }else if(currentLi.attr("isSelect")==1){
					     currentLi.attr("isSelect",0);
						 $(this).addClass("unselect").removeClass("select");
					  }
					  
					  var selctLiNum=0;
					  for(var i=0;i<$(".cartList li").length;i++){
					     if(parseInt($(".cartList li").eq(i).attr("isSelect"))==1){
							 selctLiNum=selctLiNum+1;
						 }
					  }
					  if(selctLiNum==0||selctLiNum<$(".cartList li").length){
					    //表示一个也没有选中
						$("#selectALlBtn").attr("isSelect",0);
						$("#selectALlBtn").find(".seAll").addClass("allDelet").removeClass("allSelect");
						
						
					  }else if(selctLiNum==$(".cartList li").length){
					    //全选中
					    $("#selectALlBtn").attr("isSelect",1);
						$("#selectALlBtn").find(".seAll").addClass("allSelect").removeClass("allDelet");
						
					  }
					  countPrice();
					}
				 );
				 //删除单个商品
				 $(".cartList li").find(".delBtn").unbind('click').click(
				    function(){
					 var currentLi=$(this).parent().parent().parent();
					var frontURL=Constant.URL+'api/cart?code=702';
					var postData ={"cartid":currentLi.attr('cartid'),"uid":_uid};
					postData=JSON.stringify(postData);
					fnBase.commonAjax(frontURL, {'param':postData},function(data){
					   console.log(data);
					   if(data.status=="1"){
						 alert("删除成功");
						 currentLi.remove();
						 countPrice();
					   }else{
					     alert(data.info);
					   }
					   
					 }
					 )
					 
					}
				 );
				 //减商品数量
				 $(".cartList li").find(".jian").click(
				    function(){
					   var currentLi=$(this).parent().parent().parent().parent();
					   var _num=parseInt(currentLi.attr("num"),10);
					   _num=_num-1;
					   if(_num<1){
					    _num=1;
						alert("商品数量不能小于1");
					   }
					   
				    var frontURL=Constant.URL+'api/cart?code=704';
					var postData ={"id":currentLi.attr('cartid'),"uid":_uid,"num":_num};
					postData=JSON.stringify(postData);
					fnBase.commonAjax(frontURL, {'param':postData},function(data){
					   console.log(data);
					   if(data.status=="1"){
						 //fnBase.alertDia("修改成功");
						  currentLi.attr("num",_num);
					      currentLi.find("input").val(currentLi.attr("num"));
						  countPrice();
					
					   }else{
					     fnBase.alertDia(data.info);
					   }
				   
				   })
					   
					   
					   
					   
					 
					   
					   
					   
					}
				 );
				 //加商品数量
				  $(".cartList li").find(".jia").click(
				    function(){
					   var currentLi=$(this).parent().parent().parent().parent();
					   var _num=parseInt(currentLi.attr("num"),10);
					   _num=_num+1;
					   if(_num>99){
					    _num=99;
					   }
					   
					   
					   
					   
					  	   
				    var frontURL=Constant.URL+'api/cart?code=704';
					var postData ={"id":currentLi.attr('cartid'),"uid":_uid,"num":_num};
					postData=JSON.stringify(postData);
					fnBase.commonAjax(frontURL, {'param':postData},function(data){
					   console.log(data);
					   if(data.status=="1"){
						 //fnBase.alertDia("修改成功");
						  currentLi.attr("num",_num);
					      currentLi.find("input").val(currentLi.attr("num"));
						  countPrice();
						
					   }else{
					     fnBase.alertDia(data.info);
					   }
				   
				   })   
				  }
				 );

				 
				 //全选
				 $("#selectALlBtn").unbind('click').click(
				    function(){
					   if($(this).attr("isSelect")==1){
						  //取消全选
					      $(this).attr("isSelect",0);
						  $(this).find(".seAll").addClass("allDelet").removeClass("allSelect");
						  $(".cartList li").attr("isSelect",0);
						  $(".cartList li").find(".leftIcon").addClass("unselect").removeClass("select");
						  
					   }else{
						 //全选
					     $(this).attr("isSelect",1);
						 $(this).find(".seAll").addClass("allSelect").removeClass("allDelet");
						 $(".cartList li").attr("isSelect",1);
                         $(".cartList li").find(".leftIcon").addClass("select").removeClass("unselect");
					   }
					   countPrice();
					  
					}
				 );
				 
				 //计算总价
				 countPrice();
				 function countPrice(){
					  totalPrice=0;
					  viptotalPrice=0;
					  var _totalNum=0;
					  selectProList=[];
					  for(var i=0;i<$(".cartList li").length;i++){
						if( $(".cartList li").eq(i).attr("isSelect")==1){
						   totalPrice=fnBase.accAdd(totalPrice,fnBase.accMul($(".cartList li").eq(i).attr("proPrice"),$(".cartList li").eq(i).attr("num")));
						   viptotalPrice=fnBase.accAdd(viptotalPrice,fnBase.accMul($(".cartList li").eq(i).attr("vipPrice"),$(".cartList li").eq(i).attr("num")));
						   _totalNum=_totalNum+1;
						   selectProList.push($(".cartList li").eq(i).attr("cartid"));
						}
					  }
					  $("#totalPrice").text("￥"+totalPrice);
					  $("#viptotalPrice").text("￥"+viptotalPrice);
					  $("#totalNum").text(_totalNum);
					  
				 }
				 
				 $(".settleBtn").unbind('click').click(
				    function(){
					  if(selectProList.length==0){
						 alert("请选择要结算的商品");
						 return;
					  }
					  var liListStr=selectProList.join(",");
					  window.location.href="productconfirmOrder.html?idlist="+encodeURIComponent(liListStr)+"&source="+encodeURIComponent("1");
					}
				 
				 );
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
	
	
	
});