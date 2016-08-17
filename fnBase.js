// JavaScript Document
var Constant = {
     URL: "http://bingxu.intplus.com/",
	 webURL:"http://bingxu.intplus.com/Wap/shirt/",//存放分享出去的web页面
	 shareTitle:"拇指衣橱",
};



var shebei_type=2;//0网页 1安卓 2苹
var load_flag = false; // 数据记载标识 数据未加载

function connectWebViewJavascriptBridge(callback) {
       if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge)
            }, false)
        }
    };
 connectWebViewJavascriptBridge(function(bridge) {
        bridge.init(function (message, responseCallback) {
            var data = { 'Javascript Responds': 'Wee!' }
            responseCallback(data);
        });		
	 
	   bridge.registerHandler('GetorderID', function (data, responseCallback) {
					var responseData = { 'Javascript Says': 'GetorderID' };
					responseCallback(responseData);
					loadData(data.ordernumber);
					
	   })  
/*	  connectWebViewJavascriptBridge(function(bridge) {
					bridge.callHandler('getorderIDfunction', {}, function (response) {
					   log('JS got response', response);
					})
	  }); */
	  //支付成功
	  bridge.registerHandler('paySuccessful', function (data, responseCallback) {
					var responseData = { 'Javascript Says': 'paySuccessful' };
					responseCallback(responseData);
					window.location.href="paySuccess.html";
					
					
	  })
	   //支付失败
	  bridge.registerHandler('payFail', function (data, responseCallback) {
					var responseData = { 'Javascript Says': 'paySuccessful' };
					responseCallback(responseData);
					window.location.href="payFail.html";
					
					
	   })  
	   //虚拟卡分享成功回调
	   bridge.registerHandler('shareSuccess', function (data, responseCallback) {
					var responseData = { 'Javascript Says': 'paySuccessful' };
					responseCallback(responseData);
					shresu();

	   })  
	   //虚拟卡分享取消回调
	   bridge.registerHandler('shareFail', function (data, responseCallback) {
					var responseData = { 'Javascript Says': 'paySuccessful' };
					responseCallback(responseData);
					sharefail();

	   })  
	   //获取面料
	   bridge.registerHandler('GetClothInfo', function (data, responseCallback) {
					var responseData = { 'Javascript Says': 'GetorderID' };
					responseCallback(responseData);
					mianliao(data.id);
					
	   })  
	   
	    
	 
	  
 })
 
 function GetorderID(ordernumber){
   loadData(ordernumber);
 }
 
 function GetClothInfo(id){
	 mianliao(id);
 }
 
function paySuccessful(){

window.location.href="paySuccess.html";
}
function payFail(){
window.location.href="payFail.html";
}

function shareSuccess(){
	shresu();
}

function shareFailed(){
    sharefail();
}
 
function orderPayIOS(orderNumber,amount,gooodsType,leixing){
	if(shebei_type==2){
			connectWebViewJavascriptBridge(function(bridge) {
				 bridge.callHandler('goPayPage', {'orderNumber':orderNumber,'amount':amount,'gooodsType':gooodsType,"leixing":leixing}, function (response) {
					log('JS got response', response);
				 })
			});
	
	}else if(shebei_type==1){
	      jsCall.goPayPage(orderNumber,amount,gooodsType,leixing);
	}

 }
function openSizeCon(){
     connectWebViewJavascriptBridge(function(bridge) {
		 bridge.callHandler('openSize', {}, function (response) {
			log('JS got response', response);
		 })
	});
 }
//分享虚拟卡
function shareCard(url){
	  if(shebei_type==2){
			 connectWebViewJavascriptBridge(function(bridge) {
				 bridge.callHandler('shareCard', {'url':url}, function (response) {
					log('JS got response', response);
				 })
			 });
	  }else if(shebei_type==1){
	      jsCall.shareCard(url);
	  }
	 
	 
}
//分享商品
function shareProduct(url,img,title){
	 if(shebei_type==2){
		 connectWebViewJavascriptBridge(function(bridge) {
			 bridge.callHandler('shareProduct', {'url':url,'img':img,'title':title}, function (response) {
				log('JS got response', response);
			 })
		});
	 }else if(shebei_type==1){
	      jsCall.shareProduct(url,img,title);
	 }
}
//调用原生的预约测量
function yuyue(orderNumber){
	 if(shebei_type==2){
     connectWebViewJavascriptBridge(function(bridge) {
		 bridge.callHandler('yuyue', {'orderNumber':orderNumber}, function (response) {
			log('JS got response', response);
		 })
	});
	 }else{
	    jsCall.yuyue(orderNumber);
	 }
}

//把分享地址传递给IOS
function sendShareAddress(url){
	
	if(shebei_type==2){
		connectWebViewJavascriptBridge(function(bridge) {
			 bridge.callHandler('sendShareAddress', {'url':url}, function (response) {
				log('JS got response', response);
			 })
		});
	}else if(shebei_type==1){
	   jsCall.sendShareAddress(url);
	}
}
//门店地图

function shopMap(name,a,l){
	if(shebei_type==2){
    connectWebViewJavascriptBridge(function(bridge) {
		 bridge.callHandler('shopMap', {'name':name,'a':a,'l':l}, function (response) {
			log('JS got response', response);
		 })
	});
	}else{
	   jsCall.shopMap(name,a,l);
	}
}

//分类页标题
function setcateTitle(name){
	if(shebei_type==2){
    connectWebViewJavascriptBridge(function(bridge) {
		 bridge.callHandler('setcateTitle', {'name':name}, function (response) {
			log('JS got response', response);
		 })
	});
	}else{
	   jsCall.setcateTitle(name);
	}
}
//标准尺码里“返回首页”
function goIndex(){
   if(shebei_type==2){
    connectWebViewJavascriptBridge(function(bridge) {
		 bridge.callHandler('goIndex', {'name':""}, function (response) {
			log('JS got response', response);
		 })
	});
	}else if(shebei_type==1){
	   jsCall.goIndex();
	}else{
	   window.location.href="index.html";
	}
}


function getorderIDfunction(){
 if(shebei_type==2){
       connectWebViewJavascriptBridge(function(bridge) {
					bridge.callHandler('getorderIDfunction', {}, function (response) {
					   log('JS got response', response);
					})
	  });
 }else{
    jsCall.getorderIDfunction();
 }

}


function gotomypage(){
	       //登录
	       if(shebei_type==1){
		      jsCall.closePage();
		   }else if(shebei_type==2){
			    connectWebViewJavascriptBridge(function(bridge) {
					 bridge.callHandler('closePage', {}, function (response) {
						log('JS got response', response)
					 })
				})
		   }
	
}










 var fnBase={
	    
        loadShow:function(){
            $("<div class='black_loading' style='display: block'><div class='ldbg'><img src='images/loading.gif' ><p>正在加载，请稍后...</p></div></div>").appendTo($('body'))
        },
        loadHide:function(){
            $('.black_loading').remove();
        },
        commonAjax : function(url, data,fn){
            fnBase.loadShow();
            $.ajax({
                cache : false,
                data : data,
                url : url,
                timeout:10000,
                dataType : "json",
                async : true,
                type : "post",
                success : function(data) {
                    fnBase.loadHide();
                    fn(data);
                },
                error:function(){
                    fnBase.loadHide();
                    //fnBase.myalert("亲！您的手机网络不太顺畅喔~");
                }
            });
        },
		
		 commonAjaxloadingHide : function(url, data,fn){
            //fnBase.loadShow();
            $.ajax({
                cache : false,
                data : data,
                url : url,
                timeout:10000,
                dataType : "json",
                async : true,
                type : "post",
                success : function(data) {
                    //fnBase.loadHide();
                    fn(data);
                },
                error:function(){
                   // fnBase.loadHide();
                    //fnBase.myalert("亲！您的手机网络不太顺畅喔~");
                }
            });
        },
		baocun:function(key,value){
			
			//window.localStorage.setItem(key,value);
			if(shebei_type==0){
				window.localStorage.setItem(key,value);
			}else if(shebei_type==1){
				jsCall.putString(key,value);

			}else if(shebei_type==2){
			   window.localStorage.setItem(key,value);
			   connectWebViewJavascriptBridge(function(bridge) {
                   bridge.callHandler('saveVar', {'key':key,'value':value}, function (response) {
                        log('JS got response', response)
                    })
               });
			}
			
		},
		huoqu:function(key){
		   //alert( window.localStorage.getItem(key));
		  
		   if(shebei_type==0){
			 return  window.localStorage.getItem(key);
		   }else if(shebei_type==1){
		     return jsCall.getString(key);
		   }/*else if(shebei_type==2){
			   //注意，IOS返回值需要时间，要等待返回值有了以后才能使用返回值，否则调用不到
		     bridge.callHandler('getVar', {'key':key}, function (response) {
                log('JS got response', response);
             })

		   }*/else{
		   return  window.localStorage.getItem(key);
		   }
		},
		shanchu:function(key){
		   //window.localStorage.removeItem(key);
		   if(shebei_type==0){
		      window.localStorage.removeItem(key);
		   }else if(shebei_type==1){

		      jsCall.removeData(key);
		   }else if(shebei_type==2){
			   
			 window.localStorage.removeItem(key);
			 connectWebViewJavascriptBridge(function(bridge) {
				bridge.callHandler('removeVar', {'key':key}, function (response) {
					log('JS got response', response)
				 })
			  });

		   }
		},
	 myalert: function(txt,time){
		if(shebei_type==0){
			alert(txt);
		}else if(shebei_type==1){
		    jsCall.showDialog(txt);
		}else if(shebei_type==2){
		     connectWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('showMessage', {'message': txt}, function (response) {
                        log('JS got response', response)
                    })
             });
		}
    },
	
	request: function(name){
        var url = window.location.href;
        if(url){
            var valArray = url.split("?")[1];
            if(valArray && valArray.length >0){
                var valArr = valArray.split("&");
                if(valArr && valArr.length > 0){
                    for(var i in valArr){
                        if(valArr[i].split("=")[0] == name){
                            return valArr[i].split("=")[1];
                        }
                    }
                }
            }
        }
      },
//乘法计算
    accMul:function(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {}

        try {
            m += s2.split(".")[1].length
        } catch (e) {}

        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)

    },
    //加法计算
    accAdd:function (arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }

        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }

        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2))
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    },
	accSub:function(arg1,arg2){
		var r1,r2,m,n;
		try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
		try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
		m=Math.pow(10,Math.max(r1,r2));
		//last modify by deeka
		//动态控制精度长度
		n=(r1>=r2)?r1:r2;
		return ((arg1*m-arg2*m)/m).toFixed(n);
	}
	
}
 
