$(document).ready(function(e) {
  // mianliao("237");
});

function mianliao(id){
              var frontURL=Constant.URL+'made/Styles?code=108';
			  var postData ={id:id};
			  postData=JSON.stringify(postData);
			  fnBase.commonAjax(frontURL, {'param':postData},function(data){
               console.log(data);
			  // alert("网络请求成功");
			   if(data.status=="1"){
				   //alert(currentType);
				  $(".intro").html(data.info.remark);
			   }else{
			       fnBase.myalert(data.info);
			   }
              })
}