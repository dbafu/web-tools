(function($){
	
	var menuButData = [];
	var user = $("#userId").val();
	var menu_id = $("#menu_id").val();
	var is_button = $("#is_button").val();
	if(is_button == 1){
		menuButData = getUserButtonByModuleId(user,menu_id);
	}
	//操作栏的新增等功能的显隐
	console.log(menuButData);
	
	for(var i = 0 ; i < menuButData.length ; i++){
		var oneMenu = menuButData[i];
		
		var dd = oneMenu.btt_ide;
		var isSh = oneMenu.is_dpl;
		if(isSh == 0){ //0代表这个按钮隐藏  ,如果默认显示就按照==0判断隐藏，如果默认隐藏就按照==1判断显示
			if($("."+dd)){ //数据库btt_ide字段与页面元素class对应 
				$("."+dd).hide();
			}
		}
	}
	
	var ms = {
		init:function(obj){
			return (function(){
				//这个逻辑还有问题
				for(var i = 0 ; i < menuButData.length ; i++){
					var oneMenu = menuButData[i];
					
					var dd = oneMenu.btt_ide;
					var isSh = oneMenu.is_dpl;
					if(isSh == 0){ //0代表这个按钮隐藏  ,如果默认显示就按照==0判断隐藏，如果默认隐藏就按照==1判断显示
						$.each($(obj).find("."+dd),function(index,d){
							if($(d).next().html() != undefined && $(d).next().html().indexOf("&nbsp;&nbsp;") > -1){
								$(d).next().remove();
							}    
							$(d).remove();
						})
					}
				}  
				if(menuButData.length > 0 ){
					$.each($(obj).find("tr"),function(){
						$.each($(this).find("td"),function(a,i){
							$.each($(this).find("a"),function(index){
								  if(index == $(i).find("a").length-1){
										if($(this).next().html() != undefined && $(this).next().html().indexOf("&nbsp;&nbsp;") > -1 ){
											$(this).next().remove();
										}
								  }  
							})
						})
					})
				}
				
			})();
		},
	}
	$.fn.createQx = function(){
		ms.init(this);
	}
	
})(jQuery);