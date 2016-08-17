// JavaScript Document
$(document).ready(function(e) {
	          var _uid=fnBase.huoqu('uid');
              var frontURL=Constant.URL+'api/MemberWallet?code=208';
			  var postData ={"uid":_uid};
			  var jiluStr='';
			  $("#jiluCon").html("");
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				 if(data.info){
				    for(var i=0;i<data.info.length;i++){
					  jiluStr+='<li><p>我邀请手机号为<span class="phoneNumber">'+data.info[i].to_name.phone+'</span>的用户成功注册</p><p>我获得：<span class="price">'+data.info[i].uid_money+'元红包奖励</span></p><p>对方获得：<span class="price">'+data.info[i].touid_money+'元红包奖励</span></p><p>'+data.info[i].ctime+'</p></li>';
					}
				 }
				 $("#jiluCon").append(jiluStr);
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
});