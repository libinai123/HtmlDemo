// JavaScript Document
$(document).ready(function(e) {
	
    editAddress.getData();
});
var editAddress={
 province_id:'',
 city_id:'',
 ismoren:0,
 _addid:'',
 comaddress:'',
 _edit_province:'',
 _edit_city:'',
 _edit_area:'',
 firstEdit:true,//首次进入，没有操作。
 getData:function(){
	 
	          editAddress.firstEdit=true;
	          var _uid=fnBase.huoqu("uid");
			  editAddress._addid=decodeURIComponent(fnBase.request("id"));
		      var frontURL=Constant.URL+'api/user?code=107';
			  var postData ={"rid":editAddress._addid,"uid":_uid};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				$("#eidt_shr").val(data.info.name);
				$("#eidt_phoneNumber").val(data.info.phone);
				$("#eidt_desAddress").val(data.info.address);
				$("#eidt_zipcode").val(data.info.postcode);
				
				editAddress._edit_province=(data.info.province).split("-")[0];
				editAddress._edit_city=(data.info.city).split("-")[0];
				editAddress._edit_area=(data.info.area).split("-")[0];
				editAddress.ismoren=data.info.default;
			    if(editAddress.ismoren==0){
					$("#eidt_setAddressBtn").css("background","url(images/circle.png) no-repeat left center");
				}else if(editAddress.ismoren==1){
					$("#eidt_setAddressBtn").css("background","url(images/circlehover.png) no-repeat left center");
				}
			    editAddress.init();
				
				
				
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
		   
		   
	 
	 
 },
 init:function(){
	   
	   $('#eidt_pro').html("");
	   $('#eidt_city').html("");
	   $('#eidt_area').html("");
	   var sheng='<option value="">--请选择省份--</option>';
	   var shi='<option value="">--请选择城市--</option>';
	   var qu='<option value="">--请选择区/县--</option>';
	   $('#eidt_pro').append(sheng);
	   $('#eidt_city').append(shi);
	   $('#eidt_area').append(qu);
	   editAddress.pushProvince();
	   
	   
	  
	   $(document).on('change','#eidt_pro',function(){ 
			editAddress.firstEdit=false;
			editAddress.province_id=$("#eidt_pro option:selected").val();
			editAddress.pushCity();
			$('#eidt_area').html("");
			var qu='<option value="">--请选择区/县--</option>';
			$('#eidt_area').append(qu);
		});
		$(document).on('change','#eidt_city',function(){ 
		    editAddress.firstEdit=false;
			editAddress.city_id=$("#eidt_city option:selected").val();
			editAddress.pushArea();
		});
		$(document).on('change','#eidt_area',function(){ 
			
		});
		$("#eidt_setAddressBtn").bind("click").click(
		   function(){
		    if(editAddress.ismoren==0){
				editAddress.ismoren=1;
				$(this).css("background","url(images/circlehover.png) no-repeat left center");
			}else if(editAddress.ismoren==1){
				editAddress.ismoren=0;
				$(this).css("background","url(images/circle.png) no-repeat left center");
			}
			
		   }
		);
		$("#eidt_tijiao").bind("click").click(
		  function(){
		   
		        var _shr=$("#eidt_shr").val();
				if(_shr==""){
					fnBase.myalert("请填写收货人姓名");
					return;
				}
				var _phoneNumber=$("#eidt_phoneNumber").val();
				if(_phoneNumber==""){
				    fnBase.myalert("请填写电话号码");
					return;
				}
				var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
				if (!myreg.test(_phoneNumber)) {
					fnBase.myalert("手机号码有误！ 请输入11位数字");
					return;
				} 
				
				//省市区校验
				var _shengName=$("#eidt_pro option:selected").text();
				if(_shengName=="--请选择省份--"){
				  fnBase.myalert("请选择省份");
				  return;
	  			}
				var _shiName=$("#eidt_city option:selected").text();
				if(_shiName=="--请选择城市--"){
				  fnBase.myalert("请选择城市");
				  return;
				}
				var _quName=$("#eidt_area option:selected").text();
			     if(_quName=="--请选择区/县--"){
				   fnBase.myalert("请选择/区县");
				   return;
				}
				
			    //
				var _xiangxidizhi=$("#eidt_desAddress").val();
				if(_xiangxidizhi==""){
				 fnBase.myalert("请填写详细地址");
				 return;
				}
				var _youbian=$("#eidt_zipcode").val();
				if(_youbian==""){
				 fnBase.myalert("请填写邮政编码");
				 return;
				}
				var re= /^[1-9][0-9]{5}$/;
				if(!re.test(_youbian)){
				 fnBase.myalert("邮编格式不正确");
				 return;
				}
				
			  	var _pid=$("#eidt_pro option:selected").val();
				var _cid=$("#eidt_city option:selected").val();
				var _sid=$("#eidt_area option:selected").val();
				var _uid=fnBase.huoqu("uid");
				var zhuangtai=editAddress.ismoren;
	       

		   
		     var frontURL=Constant.URL+'api/user?code=108';
			  var postData ={
				
				 "uid":_uid,
				 "name":_shr,
				 "phone":_phoneNumber,
				 "postcode":_youbian,
				 "province":_pid,
				 "city":_cid,
				 "area":_sid,
				 "address":_xiangxidizhi,
				 "default":zhuangtai, 
				 "id":editAddress._addid,
				  
			  };
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				   //alert("修改地址成功！");
				   window.history.go(-1);
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
		   
		   
		  }
		);
	 
 },
 pushProvince: function() {	   
		      var frontURL=Constant.URL+'api/util?code=201';
			  var postData ={};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
              console.log(data);
			   if(data.status=="1"){
				  var china=data;
				  var str='';
				  for (var i = 0; i < china.info.length; i++) {
                      str += '<option value='+china.info[i].code+'>' + china.info[i].name + '</option>';
                  }
				  $('#eidt_pro').append(str);
				  if(editAddress.firstEdit==true){
						  
							 for(var i=0;i<$('#eidt_pro option').length;i++){
								 if($('#eidt_pro option').eq(i).attr("value")==editAddress._edit_province){
									$('#eidt_pro option').eq(i).attr("selected","selected");
									
								 }
							 }				
						   editAddress.province_id= editAddress._edit_province;
						   editAddress.pushCity();
				   
				 }
				  
				  
				  
			   }else{
			      fnBase.myalert(data.info);
			   }
              })
		   
	
 },
pushCity: function() {
		$('#eidt_city').html("");
		var shi='<option value="">--请选择城市--</option>';
		$('#eidt_city').append(shi);
		var frontURL=Constant.URL+'api/util?code=202';
		var postData =editAddress.province_id;	
	     fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				     var china=data;
					 if(data.info=="undefined"){
					   return;
					 };
				     var str='';
				     for (var i = 0; i < china.info.length; i++) {
                       str += '<option value='+china.info[i].code+'>' + china.info[i].name + '</option>';
                     }
					$('#eidt_city').append(str);
					if(editAddress.firstEdit==true){
					 for(var i=0;i<$('#eidt_city option').length;i++){
						 if($('#eidt_city option').eq(i).attr("value")==editAddress._edit_city){
							$('#eidt_city option').eq(i).attr("selected","selected");
						 }
					 }	
				   editAddress.city_id= editAddress._edit_city;
                   editAddress.pushArea();	
				}
					
					
			   }else{
			      fnBase.myalert(data.info);
			   }
              })
		   
		   
  
},

pushArea: function() {
        $('#eidt_area').html("");
		var qu='<option value="">--请选择区/县--</option>';
		$('#eidt_area').append(qu);
		 var frontURL=Constant.URL+'api/util?code=202';
		 var postData =editAddress.city_id;	
	     fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				     var china=data;
					 if(data.info=="undefined"){
					   return;
					 };
				     var str='';
				     for (var i = 0; i < china.info.length; i++) {
                       str += '<option value='+china.info[i].code+'>' + china.info[i].name + '</option>';
                     }
					$('#eidt_area').append(str);
					if(editAddress.firstEdit==true){
					 for(var i=0;i<$('#eidt_area option').length;i++){
						 if($('#eidt_area option').eq(i).attr("value")==editAddress._edit_area){
							$('#eidt_area option').eq(i).attr("selected","selected");
						 }
					 }	
					
					}
					
			   }else{
			      fnBase.myalert(data.info);
			   }
              })
		   
		   
		 
    },
 
 
}