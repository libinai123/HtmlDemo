// JavaScript Document
$(document).ready(function(e) {
          var frontURL=Constant.URL+'api/personal?code=301';
		  fnBase.commonAjax(frontURL, {'param':''},function(data){
			console.log(data);
				if(data.status=="1"){
				   var storeStr='';
				   $(".stroeList").html("");
				   for(var i=0;i<data.info.length;i++){
				     storeStr+='<li _id="'+data.info[i].id+'" _accuracy="'+data.info[i].accuracy+'"  _latitude="'+data.info[i].latitude+'" _name="'+data.info[i].name+'"><div class="fl stroeImg"><div class="ver_pic look_ver"><div class="subpic"><img src="'+data.info[i].attach_ids+'" class="lookImg"></div></div></div><div class="fl stroeInfo"><p>'+data.info[i].name+'</p><p><span class="fl">'+data.info[i].start_time+'-'+data.info[i].end_time+'</span><a class="fr" href="tel:'+data.info[i].phone+'">'+data.info[i].phone+'</a></p><p>'+data.info[i].address+'</p></div></li>';
				   }
				   $(".stroeList").append(storeStr);
				   $(".stroeList li").click(
				       function(){
					     shopMap($(this).attr("_name"),$(this).attr("_accuracy"),$(this).attr("_latitude"));
					   }
				   );
				  
				}else{
				 fnBase.myalert(data.info);
				}
		  })
});