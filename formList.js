// JavaScript Document
$(document).ready(function(e) {
	var _current=fnBase.request("current");
	var _id=fnBase.request("id");
	if(_id){
	 changeData(_id,_current);
	}else{
	  newData();
	}
	
	var _uid=fnBase.huoqu('uid');
	if (_uid == null || _uid == "undefined" || _uid == "") {
		window.location.href = "login.html?historyPage="+encodeURIComponent(window.location.href);
		return;
	}
	var txtNameList=new Array();
	txtNameList.push("衬衣","单件西装","西裤","西服套装");
	
	function newData(){
              var frontURL=Constant.URL+'made/Volume?code=105';
			  var postData ={"id":_current};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				  if(data.info){
					 var myStr='';
					 $("#myformList").html("");
					 myStr+='<li>所选类型：<span>'+txtNameList[_current-1]+'</span></li><li><p class="titleLabel">姓名</p><p class="myingput"><input id="name" placeholder="请输入姓名"></p></li><li><p class="titleLabel">身高(cm)</p><p class="myingput"><input id="height" placeholder="请输入身高(cm)"></p></li><li><p class="titleLabel">体重(kg)</p><p class="myingput"><input id="weight" placeholder="请输入体重(kg)"></p></li>';
				     for(var i=0;i<data.info.length;i++){
					   myStr+='<li><p class="titleLabel">'+data.info[i].comment+'</p><p class="myingput"><input  placeholder="请输入'+data.info[i].comment+'" id="'+data.info[i].field+'"/></p></li>';
					 }
					 $("#myformList").append(myStr);
					
					 
				  }
				  
				  
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
	}
	
	
	function changeData(_id,_status){
			  var frontURL=Constant.URL+'made/Volume?code=105';
			  var postData ={"id":_current};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				  if(data.info){
					 var myStr='';
					 $("#myformList").html("");
					 myStr+='<li>所选类型：<span>'+txtNameList[_current-1]+'</span></li><li><p class="titleLabel">姓名</p><p class="myingput"><input id="name" placeholder="请输入姓名"></p></li><li><p class="titleLabel">身高(cm)</p><p class="myingput"><input id="height" placeholder="请输入身高(cm)"></p></li><li><p class="titleLabel">体重(kg)</p><p class="myingput"><input id="weight" placeholder="请输入体重(kg)"></p></li>';
				     for(var i=0;i<data.info.length;i++){
					   myStr+='<li><p class="titleLabel">'+data.info[i].comment+'</p><p class="myingput"><input  placeholder="请输入'+data.info[i].comment+'" id="'+data.info[i].field+'"/></p></li>';
					 }
					 $("#myformList").append(myStr);
					      var frontURL=Constant.URL+'made/Volume?code=106';
						  var postData ={"id":_id,"status":_status};
						  postData=JSON.stringify(postData);
						  fnBase.commonAjax(frontURL, {'param':postData},function(data){
						   console.log(data);
						   if(data.status=="1"){
							  if(data.info){
								 var myStr='';
								 for(var i=0;i<$("#myformList li").length;i++){
									 $("#myformList li").eq(i).find("input").val(data.info[$("#myformList li").eq(i).find("input").attr("id")]);
								 }
								 
							  }
							  
							  
						   }else{
							   fnBase.myalert(data.info);
						   }
						  })
				  }
				  
				  
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
	       
	}
	
	
	
	
	
  $("#bottom_btn").click(
		function(){
				  for(var i=1;i<$("#myformList li").length;i++){
						    if($("#myformList li").eq(i).find('input').val()==""){
							  fnBase.myalert($("#myformList li").eq(i).find('input').attr("placeholder"));
							  return;
							}
				   }
				     var frontURL=Constant.URL+'made/Volume?code=101';
					 var postData = {
						"uid":_uid,
						"status":_current,
					 };
					 
					 if(_id){
					    var frontURL=Constant.URL+'made/Volume?code=102';
						var postData = {
							"uid":_uid,
							"status":_current,
							"id":_id
						 };
					 }
			
					var mylist='';
					for(var i=1;i<$("#myformList li").length;i++){
						postData[$("#myformList li").eq(i).find('input').attr("id")]=$("#myformList li").eq(i).find('input').val();
					}
					 console.log(postData);
					 postData = JSON.stringify(postData);
					 fnBase.commonAjax(frontURL, {
						'param': postData
					 }, function(data) {
						console.log(data);
						if (data.status == "1") {
						 if(_id){
						   fnBase.myalert("修改成功");
						   window.location.href="celiang.html?current="+_current+"&type="+0;
						 }else{
						   
						   var _oderPush=fnBase.request("oderPush");
						   if(_oderPush==1){
							 var _orderNumber=fnBase.request("orderNumber");
							 var _volume_id=data.info;

							  var frontURL=Constant.URL+'api/Order?code=804';
							  var postData ={"volume_id":_volume_id,"is_voluem":2,"order_number":_orderNumber};
							  postData=JSON.stringify(postData);
							  fnBase.commonAjax(frontURL, {'param':postData},function(data){
							   console.log(data);
							   if(data.status=="1"){
								   //alert(currentType);
								  fnBase.myalert("修改状态成功");
								  history.go(-1);
							   }else{
								  fnBase.myalert(data.info);
							   }
							  })
		 
						   }
						   else{
							   fnBase.myalert("添加量体成功");
						       window.location.href="celiang.html?current="+_current+"&type="+0;
						   }
						 }
						} else {
						  fnBase.myalert(data.info)
						}
					 })
 
			}
	 );
	
	
	
});