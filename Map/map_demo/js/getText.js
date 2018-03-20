$(function(){
	getIntEquOpeInf();
})


function  getIntEquOpeInf(){
	var equ_num=$("#equNum").val();
	param="equ_num="+equ_num;
	$.ajax({
		url:url+"getIntEquOpeInf.htm",
		type:"post",
		data:param,
		dataType:"json",
		success:function(data){
			if(data.resultcode=="USR000"){
				var d=data.data[0];
				if(d.lasMaintenanceLst.length>0){
					var a=d.lasMaintenanceLst[0];
					/*$("#end_time1").html(getLocalDateAndTime(a.end_time,2)+' '+getLocalDateAndTime(a.end_time,3));*/
					$("#end_time1").html(getLocalDateAndTime(a.end_time,2));
				}
				if(d.lastOverhaulLst.length>0){
					var a=d.lastOverhaulLst[0];
					/*$("#end_time2").html(getLocalDateAndTime(a.end_time,2)+' '+getLocalDateAndTime(a.end_time,3));*/
					$("#end_time2").html(getLocalDateAndTime(a.end_time,2));
				}
				if(d.nextOverhaulLst.length>0){
					var a=d.nextOverhaulLst[0];
					/*$("#next_time").html(getLocalDateAndTime(a.next_time,2)+' '+getLocalDateAndTime(a.next_time,3));*/
					$("#next_time").html(getLocalDateAndTime(a.next_time,2));
				}
				if(d.alaStaLst.length>0){
					var a=d.alaStaLst[0];
					$("#info").html(getIsNull(a.info));
				}
				if(d.tolMaintenanceCountLst.length>0){
					var a=d.tolMaintenanceCountLst[0];
					$("#cou").html(getIsNull(a.cou));
				}
			}else{
				layer.alert(data.desc);
			}
		}
	})
	
	
	
}

function stateLine(){
	var equ_num=$("#equNum").val();
	param="equ_num="+equ_num;
	$.ajax({
		url:url+"getEquHealthCurve.htm",
		type:"post",
		data:param,
		dataType:"json",
		success:function(data){
			if(data.resultcode=="USR000"){
				setQxChart(data);
			}else{
				layer.alert(data.desc);
			}
		}
	})
}
function setQxChart(data){
	  var xTime = [];
	  var y1 = [];
	  for(var i = 0 ; i < data.data.length ; i++){
		  var d = data.data[i];
		  var ss = d.tol_tim.split("-")[2];
		  xTime.push(ss+"日"); 
		  y1.push(getIsNull2(d.health_scor)); 
	  }
	  

	  var myChart = echarts.init(document.getElementById('abc'), 'shine');
	  option = {
	    legend: {
	        data: ['设备评分'],
	        top: 10,
	    },
	  	tooltip : {
	  		trigger : 'axis'
	  	},
	  	grid : {
			left : '60',
			top : '40',
			right : '60',
			bottom : '30'
		},
	  	calculable : true,
	  	xAxis : [ {
	  		type : 'category',
	  		boundaryGap : false,
	  		data : xTime 
	  	} ],
	  	yAxis : [ {
	  		type : 'value',
	  		name : '',
	  		axisLabel : {
	  			formatter : '{value}'
	  		},
	  		min : 0 ,
	  		max  : 100
	  	} ],
	  	series : [ {
	  		name : '设备评分',
	  		type : 'line',
	  		smooth : true,
	  		data : y1,
			symbol : 'none',
			itemStyle : {
				normal : {
					color : '#5FB0E3' 
                }
			}
	  	}
	  	]
	  };

	  myChart.setOption(option);
}

var countAll = 0;
var currentPage  = 1;
function getAlaHistoryLst(){
	var equ_num=$("#equNum").val();
	param="equ_num="+equ_num;
	var sta_tim=$("#sta_tim_gj").val();
	if(!isNull(sta_tim)){
		param+="&sta_tim="+sta_tim;
	}
	var end_tim=$("#end_tim_gj").val();
	if(!isNull(end_tim)){
		param+="&end_tim="+end_tim;
	}
	param +="&currentPage="+currentPage;
	$.ajax({
		url:url+"getAlaHistoryLst.htm",
		type:"post",
		data:param,
		dataType:"json",
		success:function(data){
			if(data.resultcode=="USR000"){
				var htmls="";
				countAll = data.totalPage;
				currentPage = data.currentPage;
				for(var i=0;i<data.data.length;i++){
					var d=data.data[i];
//					var flag = d.fau_flag==0?"消失":d.fau_flag==1?"发生":"无";
					var level = d.level==1?"告警":d.level==2?"故障":"无";
					htmls +="<tr>"+
					'<td>'+((currentPage-1)*10+i+1)+'</td>'+
					"<td>"+getIsNull(d.info)+"</td>"+
					"<td>"+getIsNull(level)+"</td>"+
					"<td>"+getIsNull(d.fau_flag)+"</td>"+
					"<td>"+getLocalDateAndTime(d.time,1)+"</td>"+
					"</tr>";
				}
				if(htmls != ""){
					$("#tab1").html(htmls);
					$("#tcdPage1").createPage({
				        pageCount:countAll,
				        current:currentPage,
				        backFn:function(p){
				        	currentPage = p;
				        	getAlaHistoryLst();
				        }
			    	});
				}else{
					$("#tab1").html("<tr><td colspan='5'>暂无数据</td></tr>");
					$("#tcdPage1").empty();
				}
				
				
			}else{
				layer.alert(data.desc);
			}
		}
	})
}

var countAll2 = 0;
var currentPage2  = 1;
function getMaintenanceLst(){
	var equ_num=$("#equNum").val();
	param="equ_num="+equ_num;
	var sta_tim=$("#dateTime_sta_wx").val();
	if(!isNull(sta_tim)){
		param+="&sta_tim="+sta_tim;
	}
	var end_tim=$("#dateTime_end_wx").val();
	if(!isNull(end_tim)){
		param+="&end_tim="+end_tim;
	}
	param +="&currentPage="+currentPage2;
	$.ajax({
		url:url+"getMaintenanceLst.htm",
		type:"post",
		data:param,
		dataType:"json",
		success:function(data){
			if(data.resultcode=="USR000"){
				var htmls="";
				countAll2 = data.totalPage;
				currentPage2 = data.currentPage;
				for(var i=0;i<data.data.length;i++){
					var d=data.data[i];
					htmls+='<tr>'+
					'<td>'+((currentPage2-1)*10+i+1)+'</td>'+
					'<td>'+getLocalDateAndTime(d.upd_tim,1)+'</td>'+
					'<td>'+getIsNull(d.repair_reason)+'</td>'+
					'<td>'+getIsNull(d.repair_use_nam)+'</td>'+
					'<td>'+getIsNull(d.remark)+'</td>'+
					'<tr>';
				}
				if(htmls != ""){
					$("#tab2").html(htmls);
					$("#tcdPage2").createPage({
				        pageCount:countAll2,
				        current:currentPage2,
				        backFn:function(p){
				        	currentPage2 = p;
				        	getMaintenanceLst();
				        }
			    	});
				}else{
					$("#tab2").html("<tr><td colspan='5'>暂无数据</td></tr>");
					$("#tcdPage2").empty();
				}
				
				
			}else{
				layer.alert(data.desc);
			}
		}
	})
}

var countAll3 = 0;
var currentPage3  = 1;
function getOverhaulLst(){
	var equ_num=$("#equNum").val();
	param="equ_num="+equ_num;
	var sta_tim=$("#dateTime_sta_by").val();
	if(!isNull(sta_tim)){
		param+="&sta_tim="+sta_tim;
	}
	var end_tim=$("#dateTime_end_by").val();
	if(!isNull(end_tim)){
		param+="&end_tim="+end_tim;
	}
	param +="&currentPage="+currentPage3;
	$.ajax({
		url:url+"getOverhaulLst.htm",
		type:"post",
		data:param,
		dataType:"json",
		success:function(data){
			if(data.resultcode=="USR000"){
				var htmls="";
				countAll3 = data.totalPage;
				currentPage3 = data.currentPage;
				for(var i=0;i<data.data.length;i++){
					var d=data.data[i];
					htmls+='<tr>'+
					'<td>'+((currentPage3-1)*10+i+1)+'</td>'+
					'<td>'+getLocalDateAndTime(d.sta_time,1)+'</td>'+
					'<td>'+getLocalDateAndTime(d.end_time,1)+'</td>'+
					'<td>'+getIsNull(d.use_nam)+'</td>'+
					'<td>'+getIsNull(d.remark)+'</td>'+
					'<tr>';
				}
				if(htmls != ""){
					$("#tab3").html(htmls);
					$("#tcdPage3").createPage({
				        pageCount:countAll3,
				        current:currentPage3,
				        backFn:function(p){
				        	currentPage3 = p;
				        	getOverhaulLst();
				        }
			    	});
				}else{
					$("#tab3").html("<tr><td colspan='5'>暂无数据</td></tr>");
					$("#tcdPage3").empty();
				}
				
			}else{
				layer.alert(data.desc);
			}
		}
	})
}
