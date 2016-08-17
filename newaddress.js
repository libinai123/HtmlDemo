// JavaScript Document
$(document).ready(function(e) {
    newaddress.init();
});
var newaddress={
 province_id:'',
 city_id:'',
 ismoren:0,
 init:function(){
	   $('#pro').html("");
	   $('#city').html("");
	   $('#area').html("");
	   var sheng='<option value="">--请选择省份--</option>';
	   var shi='<option value="">--请选择城市--</option>';
	   var qu='<option value="">--请选择区/县--</option>';
	   $('#pro').append(sheng);
	   $('#city').append(shi);
	   $('#area').append(qu);
	   newaddress.pushProvince();
	   $(document).on('change','#pro',function(){ 
			//alert($("#pro option:selected").val());
			newaddress.province_id=$("#pro option:selected").val();
			newaddress.pushCity();
			$('#area').html("");
			var qu='<option value="">--请选择区/县--</option>';
			$('#area').append(qu);
		});
		$(document).on('change','#city',function(){ 
			newaddress.city_id=$("#city option:selected").val();
			//alert(newaddress.city_id);
			newaddress.pushArea();
		});
		$(document).on('change','#area',function(){ 
			
		});
		$("#setAddressBtn").bind("click").click(
		   function(){
			  
		    if(newaddress.ismoren==0){
				newaddress.ismoren=1;
				$(this).css("background","url(images/circlehover.png) no-repeat left center");
			}else if(newaddress.ismoren==1){
				newaddress.ismoren=0;
				$(this).css("background","url(images/circle.png) no-repeat left center");
			}
			
		   }
		);
		$("#tijiao").bind("click").click(
		  function(){
		        var _shr=$("#shr").val();
				if(_shr==""){
					fnBase.myalert("请填写收货人姓名");
					return;
				}
				var _phoneNumber=$("#phoneNumber").val();
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
				var _shengName=$("#pro option:selected").text();
				if(_shengName=="--请选择省份--"){
				  fnBase.myalert("请选择省份");
				  return;
	  			}
				var _shiName=$("#city option:selected").text();
				if(_shiName=="--请选择城市--"){
				  fnBase.myalert("请选择城市");
				  return;
				}
				var _quName=$("#area option:selected").text();
			     if(_quName=="--请选择区/县--"){
				   fnBase.myalert("请选择/区县");
				   return;
				}
				
			    //
				var _xiangxidizhi=$("#desAddress").val();
				if(_xiangxidizhi==""){
				 fnBase.myalert("请填写详细地址");
				 return;
				}
				var _youbian=$("#zipcode").val();
				if(_youbian==""){
				 fnBase.myalert("请填写邮政编码");
				 return;
				}
				var re= /^[1-9][0-9]{5}$/;
				if(!re.test(_youbian)){
				 fnBase.myalert("邮编格式不正确");
				 return;
				}
				
			  	var _pid=$("#pro option:selected").val();
				var _cid=$("#city option:selected").val();
				var _sid=$("#area option:selected").val();
				var _uid=fnBase.huoqu("uid");
				
				var zhuangtai=newaddress.ismoren;
				var _address=_pid+","+_cid+","+_sid;
			  var frontURL=Constant.URL+'api/user?code=106';
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
				  
			  };
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			   if(data.status=="1"){
				   fnBase.myalert("新增地址成功！");
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
				  $('#pro').append(str);
			   }else{
			      fnBase.myalert(data.info);
			   }
              })
		   
		   
	
 },
pushCity: function() {
		$('#city').html("");
		var shi='<option value="">--请选择城市--</option>';
		$('#city').append(shi);
		var frontURL=Constant.URL+'api/util?code=202';
		var postData =newaddress.province_id;	
	
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
					$('#city').append(str);
			   }else{
			      fnBase.myalert(data.info);
			   }
              })
		   
		   
  
},

pushArea: function() {
        $('#area').html("");
		var qu='<option value="">--请选择区/县--</option>';
		$('#area').append(qu);   
	    var frontURL=Constant.URL+'api/util?code=202';
		var postData =newaddress.city_id;	
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
					$('#area').append(str);
			   }else{
			      fnBase.myalert(data.info);
			   }
              })
		   
		   
		   
    },
 
 
}