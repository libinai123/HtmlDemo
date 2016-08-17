// JavaScript Document
$(document).ready(function(e) {
    var _id=fnBase.request("code");//返回的id
	$(".tishi span").text(_id);
});