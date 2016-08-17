// JavaScript Document
$(document).ready(function(e) {
    var _isSelect=window.sessionStorage.getItem("isSelect");
	if(_isSelect==null){
	   _isSelect=0;
	}
	$(".selectList li").click(
	  function(){
	    _isSelect=$(this).index();
		$(this).addClass("select").removeClass("unselect");
		$(this).siblings().removeClass("select").addClass("unselect");
	  }
	);
	$(".selectList li").eq(_isSelect).click();
	if(_isSelect==2){
	 $("#company_Name").val( window.sessionStorage.getItem("company_Name"));
	}
	$("#sure_btn").click(
	   function(){
	     if(_isSelect==2){
		   var _company_Name=$("#company_Name").val();
		   if(_company_Name==""){
		     fnBase.myalert("请填写公司名称");
			 return;
		   }
		 }
		 window.sessionStorage.setItem("isSelect",_isSelect);
		 window.sessionStorage.setItem("company_Name",_company_Name);
		 history.go(-1);
		 
		 
	   }
	);
	
	
	
	
});