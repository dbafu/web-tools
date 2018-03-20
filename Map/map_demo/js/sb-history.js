$(function(){
	$("#his-btn3").click(function(){
		currentPage_bw = 1 ;
		getBwData();
	})
})

var countAll_bw = 0;
var currentPage_bw  = 1;

function getBwData(){
	var param="";
	var equNum = $("#equNum").val();
	if(equNum!="" && equNum!=undefined){
		param+="&&equ_num="+equNum;
	}else{
		layer.alert("未查询到数据");
		return false;
	}
	if($("#sta_tim_bw").val()!=""){
		param+="&&sta_tim="+$("#sta_tim_bw").val();
	}
	if($("#end_tim_bw").val()!=""){
		param+="&&end_tim="+$("#end_tim_bw").val();
	}
	
	param +="&currentPage="+currentPage_bw;
	
	$.ajax({
		url:url+"getDeflInfByEquNum.htm",
		data:param,
		type:"post",
		dataType:"json",
		success:function(data){
			if(data.resultcode=="USR000"){
				if(data.data.length > 0){
					countAll_bw = data.totalPage;
					currentPage_bw = data.currentPage;
					var html="";
					for(var i=0;i<data.data.length;i++){
						var d =  data.data[i];
						html+="<tr>"+
						"<td>"+((currentPage-1)*10+i+1)+"</td>"+
						"<td>"+getLocalDateAndTime(d.time,1)+"</td>"+
						"<td>"+d.PID+"</td>"+
						"<td>"+d.name+"</td>"+
						"<td>"+d.type+"</td>"+
						"<td>"+d.num+"</td>"+
						"<td>"+d.info+"</td>"+
						"<td>"+d.initialStat+"</td>"+
						"<td>"+d.currentStat+"</td>"+
						"</tr>" 
					}
					$("#list3_bw").html(html);
					 
  					$("#tcdPageCode-bw").createPage({
				        pageCount:countAll_bw,
				        current:currentPage_bw,
				        backFn:function(p){
				        	currentPage_bw = p;
				        	getBwData();
				        }
			    	});
	     			 
				}else{
					var h = "<tr>"+
								"<td>暂无数据</td>"+
								"<td></td>"+
								"<td></td>"+
								"<td></td>"+
								"<td></td>"+
								"<td></td>"+
								"<td></td>"+
								"<td></td>"+
								"<td></td>"+
							"</tr>";
					$("#list3_bw").html(h);
					$("#tcdPageCode-bw").empty();
				}
			}else{
				layer.alert(data.desc);
			}
		}
	})
} 