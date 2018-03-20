//获取系统时间，将时间以指定格式显示到页面。  
 
function systemDay() {
	//获取系统时间。  
	var dateTime = new Date();

	var year = dateTime.getFullYear();
	var month = (dateTime.getMonth() + 1);
	var day = dateTime.getDate();
	var hh = dateTime.getHours();
	var mm = dateTime.getMinutes();
	var ss = dateTime.getSeconds();
	
	//月日是一位数字，在数字前补0
	month = extra(month);
	day = extra(day);
	
	//分秒时间是一位数字，在数字前补0。  
	mm = extra(mm);
	ss = extra(ss);
	
	$("#time").html(year + "/" + month + "/" + day+"   "+hh+":"+mm+":"+ss);

	setTimeout("systemDay()", 1000);
}

//补位函数。  
function extra(x) {
	//如果传入数字小于10，数字前补一位0。  
	if(x < 10) {
		return "0" + x;
	} else {
		return x;
	}
}