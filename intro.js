// JavaScript Document
$(document).ready(function(e) {
	          var _type=fnBase.request("type");
			  if(_type==2){
			    $("title").html("常见问题");
			  }else{
			     $("title").html("关于我们");
			  }
			  
              var frontURL=Constant.URL+'api/Abouts?code=900';
			  var postData ={type:_type};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			  // alert("网络请求成功");
			   if(data.status=="1"){
				   //alert(currentType);
				  $(".intro").html(data.info);
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
});