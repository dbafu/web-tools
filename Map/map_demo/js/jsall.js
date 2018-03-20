/**
 * 公共配置文件
 */
  
var url = "";
var jumpPageUrl = "";
//var url = "http://localhost:8080/qinergyserver/service/";
//var jumpPageUrl = "http://localhost:8080/qinergyserver/";
var url = "http://localhost:8080/huadianserver/service/";
var jumpPageUrl = "http://localhost:8080/huadianserver/";

//var url = "http://47.100.84.163/service/";
//var jumpPageUrl = "http://47.100.84.163/";

//var url = "http://39.104.93.43/service/";
//var jumpPageUrl = "http://39.104.93.43/";

/**
 * 判断是否为空
 * @param {} val
 * @return {Boolean}
 */
function isNull(val){
	if (null===val||$.trim(val)===''||'null'===val || undefined === val || 'undefined' === val) {
		return true;
	}else{
		return false;
	}
}

/**
 * 表格全选的操作
 * @param table
 */
function selectCheck(table){
	if($(table).is(":checked")){
		$(table).parent().parent().parent().find("input[name='check']").prop("checked",true);
	}else{
		$(table).parent().parent().parent().find("input[name='check']").prop("checked",false);
	} 
}

/**
 * 截取参数
 * @param param 参数
 */
function substringParam(param){
	if(isNull(param)){
		return param;
	}else{
		return param.substring(2,param.length);
	}
	
}

/**
 * 小数转换整数
 *  @param param 参数
 */
function mathRound(param){
	if(isNull(param)){
		return 0;
	}else{
		return Math.round(param);
	}
	
}

/**
 * 获取当前日期+时分秒
 */
function getDateTodayAndSfm(){
	var myDate = new Date();
	var  year = myDate.getFullYear() ;
	var mouth = add0(myDate.getMonth()+1);
	var day =  add0(myDate.getDate());
	var hh =  add0(myDate.getHours());
	var mm =  add0(myDate.getMinutes());
	var ss =  add0(myDate.getSeconds());
	//var result= year+"-"+mouth+"-"+day+"-"+hh+":"+mm+":"+ss;
	var result= year+mouth+day+hh+mm+ss;
	return  result ;
}


/**
 * 获取当前日期
 */
function getDateToday(){
	var myDate = new Date();
	var  year = myDate.getFullYear() ;
	var mouth = add0(myDate.getMonth()+1);
	var day =  add0(myDate.getDate());
	var result= year+'-'+mouth+'-'+day;
	return  result ;
}
/**
 * 获取当前年
 */
function getDateYear(){
	var myDate = new Date();
	var  year = myDate.getFullYear() ;
	return  year ;
}
/**
 * 获取当前年月
 */
function getDateYearAndMouth(){
	var myDate = new Date();
	var  year = myDate.getFullYear() ;
	var mouth = add0(myDate.getMonth()+1);
	var result= year+'-'+mouth ;
	return  result ;
}
/**
 * 时间戳转换成时间
 * @param nS 时间戳
 * @param type 转换类型 
 *  1 年月日时分秒  2 年月日 3 时分秒 4 年月 5 月日 6 时分 7 分秒 8 年 9 月 10 日 11 时 12 分 13秒
 */
function getLocalDateAndTime(nS,type){
	if(nS === undefined || nS === null || nS === "" || nS === "undefined"){
		return "无";
	}else{
		 var myDate = new Date(parseInt(nS)); 
	     var $_year = myDate.getFullYear(); 
	     var $_month = parseInt(myDate.getMonth())+1; 
	     var $_day = myDate.getDate(); 
		 var hours = myDate.getHours();
		 var minutes = myDate.getMinutes();
		 var second = myDate.getSeconds();
		 
		 var $_f_date = "";
		 switch (type) {
			case 1:
				$_f_date = $_year +"-"+add0($_month)+"-"+add0($_day)+" "+add0(hours)+":"+add0(minutes)+":"+add0(second); 
				break;
			case 2:
				$_f_date =  $_year +"-"+add0($_month)+"-"+add0($_day); 
				break;
			case 3:
				$_f_date =  add0(hours)+":"+add0(minutes)+":"+add0(second); 
				break;
			case 4:
				$_f_date =  $_year +"-"+add0($_month);
				break;
			case 5:
				$_f_date =  add0($_month)+"-"+add0($_day);
				break;
			case 6:
				$_f_date =  add0(hours)+":"+add0(minutes);
				break;
			case 7:
				$_f_date =  add0(minutes)+":"+add0(second);
				break;
			case 8:
				$_f_date =  $_year;
				break;
			case 9:
				$_f_date =  add0($_month);
				break;
			case 10:
				$_f_date =  add0($_day);
				break;
			case 11:
				$_f_date =  add0(hours);
				break;
			case 12:
				$_f_date =  add0(minutes);
				break;
			case 13:
				$_f_date =  add0(second);
				break;
			default:
				break;
		}
	     return $_f_date;
	}
}
 
 
function add0(m){return m<10?'0'+m:m }

/**
 * 获取比当前数大并且最接近的的能被10整除的数
 * @param val 参数值
 * @returns
 */
function getMaxVal(val){
	var  v = getIsZero(val);
	var tmpV = Math.floor(v);
	return v-(v%10)+10;
}


/**
 * 获取数不保留小数
 * @param val 参数值
 * @returns
 */
function getFixedNum4(val){
	if(val === "" || val === undefined || val === null || val === "undefined"){
		return 0 ;
	}else{
		val = parseFloat(val); 
		return val.toFixed(0);
	} 
}

/**
 * 获取数据保留-位小数
 * @param val 参数值
 * @returns
 */
function getFixedNum3(val){
	if(val === "" || val === undefined || val === null || val === "undefined"){
		return "-";
	}else{
		val = parseFloat(val); 
		return val.toFixed(1);
	} 
}

/*
 * 获取整数
 */
function  getFixInt(val){
	if(val === "" || val === undefined || val === null || val === "undefined"){
		return  0 ;
	}else{
		return parseInt(val);
	} 
}
/**
 * 获取数据保留两位小数
 * @param val 参数值
 * @returns
 */
function getFixedNum(val){
	if(val === "" || val === undefined || val === null || val === "undefined" || isNaN(val)  ){
		return (0).toFixed(2);
	}else{
		val = parseFloat(val); 
		return val.toFixed(2);
	} 
}


/**
 * 获取数据保留两位小数
 * @param val 参数值
 * @returns
 */
function getFixedNum5(val){
	if(val === "" || val === undefined || val === null || val === "undefined" || isNaN(val) ){
		return "-";
	}else{
		val = parseFloat(val); 
		return val.toFixed(2);
	} 
}
/**
 * 获取数据保留三位小数
 * @param val 参数值
 * @returns
 */
function getFixedNum2(val){
	if(val === "" || val === undefined || val === null || val === "undefined"){
		return (0).toFixed(3);
	}else{
		val = parseFloat(val); 
		return val.toFixed(3);
	} 
}


/**
 * 获取数据是否返回0  -  微信 pc端共用
 * @param val 参数值
 * @returns
 */
function getIsZero(val){
	if(val === "" || val === undefined || val === null || val === "undefined"){
		return 0;
	}else{
		return  val;
	} 
}

/**
 * 获取数据是否返回无
 * @param val 参数值
 * @returns
 */
function getIsNull(val){
	if(val === "" || val === undefined || val === null || val === "undefined"){
		return "无";
	}else{
		return  val;
	} 
}

/**
 * 获取数据是否返回无
 * @param val 参数值
 * @returns
 */
function getIsNull2(val){
	if(val === "" || val === undefined || val === null || val === "undefined" || val === "null"){
		return "-";
	}else{
		return  val;
	} 
}

function setNoticePage(id,a){
	top.frames['main'].location.href = $(a).attr("hrefData");
}

//设置告警状态
function setNoticeState(event,id,a){
	var e = event ? event : window.event ; 
	e.cancelBubble = true;
	var  layerC = layer.confirm("确认关闭?",function(){
		$(a).parent().parent().parent().remove();
		//获取公告
		$.ajax({
			url:url+"updNoticeState.htm",
			data : "not_id="+id,
			async : false,
			success: function(datas){
				top.frames['bottom'].getGjData();
			},
			error : function(){
				alert("读取告警信息失败");
			}
		}); 
		layer.close(layerC);
	},function(){
		layer.close(layerC);
	})
}

//设置消息状态为已读
function setNoticeState2(event,id,a){
	var e = event ? event : window.event ; 
	e.cancelBubble = true;
	var  layerC = layer.confirm("确认关闭?",function(){
		$(a).parent().parent().parent().remove();
		//获取公告
		$.ajax({
			url:url+"updSysNoticeState.htm",
			data : "not_id="+id,
			async : false,
			success: function(datas){
				top.frames['bottom'].getNotice();
			},
			error : function(){
				alert("读取消息信息失败");
			}
		}); 
		layer.close(layerC);
	},function(){
		layer.close(layerC);
	})
}



/**
 * 取两位小数
 * @param x
 * @returns {Number}
 */
function toDecimal(x) { 
    var f = parseFloat(x); 
    if (isNaN(f)) { 
      return; 
    } 
    f = Math.round(x*100)/100; 
    return f; 
  } 


function mykeyDown(e){   
		var ev = e ? e :event;    
		if(window.addEventListener){     
			if(ev.keyCode==116){
				// F5的键盘常用ASCII码为116
				if(top.frames['main'].frames['right']){
					console.log("这是如果按了F5的刷新右边");
					top.frames['main'].frames['right'].location.reload();
					ev.preventDefault();
					return
					false;
				}else if(top.frames['main']){
					console.log("这是如果按了F5的刷新主页");
					top.frames['main'].location.reload();
					ev.preventDefault();
					return
					false;
				}
			}
			/*else{
				 if(top.frames['main'].frames['right']){
					 	console.log("这是没按F5的刷新右边");
					 	ev.keyCode=0;
					 	ev.returnValue=false;
						top.frames['main'].frames['right'].location.reload();
						return
						false;
				 }else if(top.frames['main']){
					 	console.log("这是没按F5的刷新主页");
						ev.keyCode=0;
						ev.returnValue=false;
						top.frames['main'].location.reload();
						return
						false;
				}
		   }*/
		}
}


//查询用户的按钮权限
function getUserButtonByModuleId(checkUsr,menuId){
	var a = [];
	$.ajax({
		url:url+"getSelectedButtonLstByModuleId.htm",
		data : "use_id="+checkUsr+"&module_id="+menuId,
		async : false,
		success: function(datas){
			  a =  datas.data;
		},
		error : function(){
			 
		}
	}); 
	return a;
}

$(function(){
	//点击弹出窗口事件
	$("body").on("click",".layer",function(){
		if($(this).attr("isParent") && $(this).attr("isParent") == "true" ){
			window.parent.layer.open({
				  type: 2,
				  skin: 'layer-class' ,
				  title: isNull($(this).attr("data-title"))?"":$(this).attr("data-title"),
				  shadeClose: false,
				  //area: [isNull($(this).attr("data-width"))?"50%":$(this).attr("data-width"),isNull($(this).attr("data-height"))?"400px":$(this).attr("data-height"),],
				  area: ['770px','450px'],
				  content: $(this).attr("data-url") //iframe的url
			});
		}else{
			layer.open({
				  type: 2,
				  skin: 'layer-class' ,
				  title: isNull($(this).attr("data-title"))?"":$(this).attr("data-title"),
				  shadeClose: false,
				  //area: [isNull($(this).attr("data-width"))?"50%":$(this).attr("data-width"),isNull($(this).attr("data-height"))?"400px":$(this).attr("data-height"),],
				  area: ['770px','450px'],
				  content: $(this).attr("data-url") //iframe的url
			});
		}
		
	});	
	
	//窗口取消按钮关闭弹窗
	$(".popbutbox").on("click",".cancle",function(){
		window.parent.layer.closeAll();
	});	
	
	//绑定告警弹出框的关闭事件
	$("body").on("click",".qxgj",function(){
		 $(".winbox").remove();
	});	
	
	/*$(".menuli").on("hover",function(){
		 $(this).css("background","#4A4A4A");
	},function(){
		 $(this).css("background","#000");
	});	*/
	
	$("body").on("mouseover mouseout",".menuli",function(event){
		 if(event.type == "mouseover"){
			 $(this).css("background","#4A4A4A");
		 }else if(event.type == "mouseout"){
			 $(this).css("background","#000");
		 }
	})
});


/*跳转方法*/
function jumpUrl(a){
	var menuName = $(a).find("a").text();
	var menuHref = $(a).attr("data-href");
	if(menuName  === "综合监控" ){
		$(top.frames["bottom"].document).find("#nav-bot").empty();
		var oneMenu =  '<a class="bottom-nav" href="'+menuHref+'"  target="main" id="oneLevel" ><i class="bdf"></i>'+menuName+'</a>';
		$(top.frames["bottom"].document).find("#nav-bot").append(oneMenu);
	}else{
		$(top.frames["bottom"].document).find("#nav-bot").empty();
	}
	if($(a).attr("typ") && $(a).attr("typ") == "2" ){
		window.open(menuHref) ; 
	}else{
		top.main.location.href = menuHref ; 
		//window.location.href = menuHref ; 
	}
}

//---------------兼容 ---------------------------
$(function(){  
	
	
	//是否刷新按了F5
	if (typeof document.addEventListener != "undefined") {      
		document.addEventListener("keydown",mykeyDown,true);    
	} else {      
		document.attachEvent("onkeydown", mykeyDown);   
	}   
	
	
	
	/*//是否刷新了页面
	window.onbeforeunload = function(event) {
		debugger;
		if(top.frames['main'].frames['right']){
			console.log("这是如果按了F5的刷新右边");
			top.frames['main'].frames['right'].location.reload();
			event.preventDefault();
			return
			false;
		}else if(top.frames['main']){
			console.log("这是如果按了F5的刷新主页");
			top.frames['main'].location.reload();
			event.preventDefault();
			return
			false;
		}
		//window.event.returnValue =  false;
	};*/
	
	/*document.onkeydown = mykeyDown;      
	for(var i=0;i<frames.length;i++){       
		if (typeof document.addEventListener != "undefined") {      
			frames[i].document.addEventListener("keydown",mykeyDown,true);    
		} else {      
			frames[i].document.attachEvent("onkeydown", mykeyDown);   
		}   
	}*/
	
    //判断浏览器是否支持placeholder属性
    supportPlaceholder='placeholder' in document.createElement('input'),
 
    placeholder=function(input){
 
	    var text = input.attr('placeholder'),
	    defaultValue = input.defaultValue;
	 
	    if(!defaultValue){	 
	      input.val(text).addClass("phcolor");
	    }
	 
	    input.focus(function(){
	 
	      if(input.val() == text){
	   
	        $(this).val("");
	      }
	    });
	 
	  
	    input.blur(function(){
	 
	      if(input.val() == ""){
	       
	        $(this).val(text).addClass("phcolor");
	      }
	    });
 	    
   };
 
  //当浏览器不支持placeholder属性时，调用placeholder函数
  if(!supportPlaceholder){
	  $('input').each(function(){
	      text = $(this).attr("placeholder");
	      if($(this).attr("type") == "text"){	 
	    	  placeholder($(this));
	      }
	  });
  }	 
  
  
 // var patrnum = /[^\d\.]/g;
   var patrnum = /^(\-|\+)?\d+(\.\d+)?$/;
 /* $("input[type=number]").each(function(){
      if (!patrnum.exec(this.value)) {
          alert("请输入正确的数字！");
      }
  })*/
  
  /*$("input[type=number]").each(function(){
	  var a = this;
	  $(a).change(function(){
		  if (!patrnum.exec(this.value)) {
			  console.log("验证啦啦啦啦啦");
			  this.value = this.value.replace(patrnum,'');
	      }
	  })
  })*/
  
  $("input[type=number]").keydown(function(){
	  if (!patrnum.exec(this.value)) {
		  this.value = this.value.replace(!patrnum,'');
      }
  })
  
  $("input[type=number]").keyup(function(){
	  if (!patrnum.exec(this.value)) {
		  this.value = this.value.replace(!patrnum,'');
	  }
  })
  
  $("input[type=number]").on("afterpaste",function(){
	  if (!patrnum.exec(this.value)) {
		  this.value = this.value.replace(!patrnum,'');
	  }
  })
  
    
  
  /* ----------------文本框必填-------------------*/
  $(".requiredInp").after('<span class="fill" >*</span>');
  /* ----------------修改密码单独写的-------------------*/
  $(".requiredInpEditPas").after('<span class="fill" style="margin-right:35px;" >*</span>');
}); 