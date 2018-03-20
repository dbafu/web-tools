var userComData = null ; 
 
var markerArr = [];

var comOneCheck = null ; 
var comTwoCheck = null ; 
var comThreeCheck = null ; 

var placeHolderStyle = {
	normal : {
        color: '#E86B8D' 
    }
}
var placeHolderStyle1 = {
	normal : {
        color: '#F1AC45' 
    }
}
var placeHolderStyle2 = {
	normal : {
        color: '#35AA3A' 
    }
}

function getCompanyOne(){
	/*var param  = "id="+userId;*/
	var userId = $("#userId").val(); 
	var use_typ = $("#use_typ").val(); 
	var slt_opt_sta = $("#slt_opt_sta").val(); 
	$.ajax({
    	/*url:url+"getOrgHieFromEcache.htm",
    	data : param,*/
		url:url+"getOrganizationHierarchyByUse.htm",
		data : "use_id="+userId+"&use_typ="+use_typ+"&slt_opt_sta="+slt_opt_sta,
    	dataType:"json",
    	type:"post",
    	success:function(data){
    		if (data.resultcode=="USR000") {
    			 if(data.data != null){
    				 userComData = data.data ;
    				 setCompanyOne();
    			 }else{
    				 getUseData();
    			 }
			} else {
               layer.alert(data.desc);
			}
    	}
    })
}

function getUseData(){
	var userId = $("#userId").val(); 
	var use_typ = $("#use_typ").val(); 
	var slt_opt_sta = $("#slt_opt_sta").val(); 
	$.ajax({
		url:url+"getOrganizationHierarchyByUse.htm",
		data : "use_id="+userId+"&use_typ="+use_typ+"&slt_opt_sta="+slt_opt_sta,
		success: function(datas){
			if (datas.data.length > 0 ) {
				userComData = datas.data ;
				setCompanyOne();
			}
		},
		error : function(){
			
		}
	}); 
}

function setCompanyOne(){
	 var html = '<option value="qxz">请选择</option>';
	 var oneComId = "0";
	 for (var i = 0; i < userComData.length; i++) {
		 var comOne  = userComData[i];
		 if(i == 0){
			 oneComId = comOne.id ;
		 }
		 var selectHtm = "";
		/* if(sessionStorage.getItem("comOne") && sessionStorage.getItem("comOne") == comOne.id){
			   selectHtm = "selected";
			   setCompanytwo(sessionStorage.getItem("comOne"));
		 }*/
		 html += '<option value="'+comOne.id+'" '+selectHtm+'>'+comOne.com_nam+'</option>'
	}
	$("#companyOne").empty().append(html);
	setCompanytwo(oneComId);
}


function setCompanytwo(val){
	if(val == 'qxz'){
		clearCompanyTwo();
		clearCompanyThree();
		markerArr = [];
		sessionStorage.removeItem("comOne");
		setListData();
	}else{
		comOneCheck = val;
		markerArr = [];
		sessionStorage.setItem("comOne",val);
		var html = '<option value="qxz">请选择</option>';
		for (var i = 0; i < userComData.length; i++) {
			 var comOne  = userComData[i];
			 if(comOne.id == val){
				 for (var j = 0; j < comOne.twoComLst.length; j++) {
					 var comTwo  = comOne.twoComLst[j];
					 var selectHtm = "";
					 if(sessionStorage.getItem("comTwo") && sessionStorage.getItem("comTwo") == comTwo.id){
						   selectHtm = "selected";
					 }
					 html += '<option value="'+comTwo.id+'" '+selectHtm+'>'+comTwo.com_nam+'</option>'
				 }
			 }
		}
		$("#companyTwo").empty().append(html);
		
		for (var i = 0; i < userComData.length; i++) {
			 var comOne  = userComData[i];
			 if(comOne.id == val){
				 //添加一级公司的人员信息
				 for (var j = 0; j < comOne.optLst.length; j++) {
					 var oneMarker = {};
					 var optOne  = comOne.optLst[j];
					 if(optOne.useLonLat && optOne.useLonLat.length > 0 ){
						 if(optOne.useLonLat[0].use_lon && optOne.useLonLat[0].use_lat){
							 oneMarker = {
									id : optOne.id,
									point : optOne.useLonLat[0].use_lon+','+optOne.useLonLat[0].use_lat,
									type : 2 ,
									pos: optOne.pos_name,
									comName : comOne.com_nam,
									sex : optOne.use_sex,
									remark : optOne.remark,
									name : optOne.use_nam,
									use_mob : optOne.use_mob,
									state : optOne.slt_opt_sta,
									workYear : optOne.work_year
							 };
						 }
					 }
					markerArr.push(oneMarker);
				 }
				 
				 for (var j = 0; j < comOne.twoComLst.length; j++) {
					 var comTwo  = comOne.twoComLst[j];
					 for (var k = 0; k < comTwo.optLst.length; k++) {
						//添加 二级公司的人员信息
						 var oneMarker = {};
						 var optTwo  = comTwo.optLst[k];
						 if(optTwo.useLonLat && optTwo.useLonLat.length > 0 ){
							 if(optTwo.useLonLat[0].use_lon && optTwo.useLonLat[0].use_lat){
								 oneMarker = {
										id : optTwo.id,
										point : optTwo.useLonLat[0].use_lon+','+optTwo.useLonLat[0].use_lat,
										type : 2 ,
										pos: optTwo.pos_name,
										comName : comTwo.com_nam,
										sex : optTwo.use_sex,
										remark : optTwo.remark,
										name : optTwo.use_nam,
										use_mob : optTwo.use_mob,
										state : optTwo.slt_opt_sta,
										workYear : optTwo.work_year 
								};
							 }
						 }
						markerArr.push(oneMarker);
					 }
					 for (var k = 0; k < comTwo.thrComLst.length; k++) {
						 //添加 三级公司的人员信息
						 var oneMarker = {};
						 var comThree  = comTwo.thrComLst[k];
						 //添加二级公司下三级公司的人员信息
						 for (var l = 0; l < comThree.optLst.length; l++) {
							 var optThree  = comThree.optLst[l];
							 if(optThree.useLonLat && optThree.useLonLat.length > 0 ){
									if(optThree.useLonLat[0].use_lon && optThree.useLonLat[0].use_lat){
										 oneMarker = {
												id : optThree.id,
												point :  optThree.useLonLat[0].use_lon+','+optThree.useLonLat[0].use_lat,
												type : 2 ,
												pos: optThree.pos_name,
												comName : comThree.com_nam,
												sex : optThree.use_sex,
												remark : optThree.remark,
												name : optThree.use_nam,
												use_mob : optThree.use_mob,
												state : optThree.slt_opt_sta,
												workYear : optThree.work_year 
										};
										markerArr.push(oneMarker);
									}
							 }
						}
						 //添加二级公司下三级公司的电站
						 for (var l = 0; l < comThree.pwsInfLst.length; l++) {
							 var pwsThree  = comThree.pwsInfLst[l];
							 if(pwsThree.pws_lon && pwsThree.pws_lat){
								 oneMarker = {
										id : pwsThree.id,
										point : pwsThree.pws_lon+','+pwsThree.pws_lat ,
										type : 1 ,
										pos: pwsThree.pro_nam+pwsThree.cit_nam+pwsThree.are_nam+pwsThree.pws_add,
										comName : comThree.com_nam,
										state : pwsThree.cur_sta,
										remark : pwsThree.rem,
										name : pwsThree.pws_nam
								};
								 markerArr.push(oneMarker);
							 }
							
						 }
					 }
				 }
			 }
		}
		if(sessionStorage.getItem("comTwo")){
			   setCompanyThree(sessionStorage.getItem("comTwo"));
		}
		setListData();
	}
}

function setCompanyThree(val){
	if(val == 'qxz'){
		clearCompanyThree();
		setCompanytwo(comOneCheck);
		sessionStorage.removeItem("comThree");
	}else{
		comTwoCheck = val;
		markerArr = [];
		sessionStorage.setItem("comTwo",val);
		var html = '<option value="qxz">请选择</option>';
		for (var i = 0; i < userComData.length; i++) {
			 var comOne  = userComData[i];
			 for (var i = 0; i < userComData.length; i++) {
				 var comOne  = userComData[i];
				 for (var j = 0; j < comOne.twoComLst.length; j++) {
					 var comTwo  = comOne.twoComLst[j];
					 if(comTwo.id == val){
						 for (var k = 0; k < comTwo.thrComLst.length; k++) {
							 var comThree  = comTwo.thrComLst[k];
							 var selectHtm = "";
							 if(sessionStorage.getItem("comThree") && sessionStorage.getItem("comThree") == comThree.id){
								   selectHtm = "selected";
							 }
							 html += '<option value="'+comThree.id+'" '+selectHtm+'>'+comThree.com_nam+'</option>'
						 }
					 }
				 }
			}
		}
		$("#companyThree").empty().append(html);
		
		
		for (var i = 0; i < userComData.length; i++) {
			 var comOne  = userComData[i];
			 for (var j = 0; j < comOne.twoComLst.length; j++) {
				 var comTwo  = comOne.twoComLst[j];
				 if(comTwo.id == val){
					 for (var k = 0; k < comTwo.optLst.length; k++) {
						//添加 二级公司的人员信息
						 var oneMarker = {};
						 var optTwo  = comTwo.optLst[k];
						 if(optTwo.useLonLat && optTwo.useLonLat.length > 0 ){
							 if(optTwo.useLonLat[0].use_lon && optTwo.useLonLat[0].use_lat){
								 oneMarker = {
										id : optTwo.id,
										point : optTwo.useLonLat[0].use_lon+','+optTwo.useLonLat[0].use_lat,
										type : 2 ,
										pos: optTwo.pos_name,
										comName : comTwo.com_nam,
										sex : optTwo.use_sex,
										remark : optTwo.remark,
										name : optTwo.use_nam,
										use_mob : optTwo.use_mob,
										state : optTwo.slt_opt_sta,
										workYear : optTwo.work_year 
								};
								markerArr.push(oneMarker);
							 }
						 }
					 }
					 for (var k = 0; k < comTwo.thrComLst.length; k++) {
						 //添加 三级公司的人员信息
						 var oneMarker = {};
						 var comThree  = comTwo.thrComLst[k];
						 //添加二级公司下三级公司的人员信息
						 for (var l = 0; l < comThree.optLst.length; l++) {
							 var optThree  = comThree.optLst[l];
							 if(optThree.useLonLat && optThree.useLonLat.length > 0 ){
								 if(optThree.useLonLat[0].use_lon && optThree.useLonLat[0].use_lat){
									 oneMarker = {
											id : optThree.id,
											point : optThree.useLonLat[0].use_lon+','+optThree.useLonLat[0].use_lat,
											type : 2 ,
											pos: optThree.pos_name,
											comName : comThree.com_nam,
											sex : optThree.use_sex,
											remark : optThree.remark,
											name : optThree.use_nam,
											use_mob : optThree.use_mob,
											state : optThree.slt_opt_sta,
											workYear : optThree.work_year 
									};
									markerArr.push(oneMarker);
								 }
							 }
						 }
						 //添加二级公司下三级公司的电站
						 for (var l = 0; l < comThree.pwsInfLst.length; l++) {
							 var pwsThree  = comThree.pwsInfLst[l];
							 if(pwsThree.pws_lon && pwsThree.pws_lat){
								 oneMarker = {
										id : pwsThree.id,
										point : pwsThree.pws_lon+','+pwsThree.pws_lat ,
										type : 1 ,
										pos: pwsThree.pro_nam+pwsThree.cit_nam+pwsThree.are_nam+pwsThree.pws_add,
										comName : comThree.com_nam,
										state : pwsThree.cur_sta,
										remark : pwsThree.rem,
										name : pwsThree.pws_nam
								};
								markerArr.push(oneMarker);
							 }
						 }
					 }
				 }
			 }
			 
		}
		if(sessionStorage.getItem("comThree")){
			   setPws(sessionStorage.getItem("comThree"));
		 }
		setListData();
	}
}



function setPws(val){
	if(val == 'qxz'){
		sessionStorage.removeItem("comThree");
		setCompanyThree(comTwoCheck);
	}else{
		comThreeCheck = val;
		markerArr = [];
		sessionStorage.setItem("comThree",val);
		for (var i = 0; i < userComData.length; i++) {
			 var comOne  = userComData[i];
			 for (var j = 0; j < comOne.twoComLst.length; j++) {
				 var comTwo  = comOne.twoComLst[j];
				 for (var k = 0; k < comTwo.thrComLst.length; k++) {
					 var comThree  = comTwo.thrComLst[k];
					 if(comThree.id == val){
						 //添加二级公司下三级公司的人员信息
						 for (var l = 0; l < comThree.optLst.length; l++) {
							 var optThree  = comThree.optLst[l];
							 if(optThree.useLonLat && optThree.useLonLat.length > 0 ){
								 if(optThree.useLonLat[0].use_lon && optThree.useLonLat[0].use_lat){
									 oneMarker = {
											id : optThree.id,
											point : "116.605489,40.15491",
											type : 2 ,
											pos: optThree.pos_name,
											comName : comThree.com_nam,
											sex : optThree.use_sex,
											remark : optThree.remark,
											name : optThree.use_nam,
											use_mob : optThree.use_mob,
											state : optThree.slt_opt_sta,
											workYear : optThree.work_year 
									};
									markerArr.push(oneMarker);
								 }
							 }
						 }
						 //添加二级公司下三级公司的电站
						 for (var l = 0; l < comThree.pwsInfLst.length; l++) {
							 var pwsThree  = comThree.pwsInfLst[l];
							 if(pwsThree.pws_lon && pwsThree.pws_lat){
								 oneMarker = {
										id : pwsThree.id,
										point : pwsThree.pws_lon+','+pwsThree.pws_lat ,
										type : 1 ,
										pos: pwsThree.pro_nam+pwsThree.cit_nam+pwsThree.are_nam+pwsThree.pws_add,
										comName : comThree.com_nam,
										state : pwsThree.cur_sta,
										remark : pwsThree.rem,
										name : pwsThree.pws_nam
								};
							 }
							markerArr.push(oneMarker);
						 }
					 }
				 }
			 }
		}
		setListData();
	}
}

function clearCompanyTwo(){
	sessionStorage.removeItem("comOne");
	$("#companyTwo").empty().append('<option value="qxz">请选择</option>');
}

function clearCompanyThree(){
	sessionStorage.removeItem("comTwo");
	$("#companyThree").empty().append('<option value="qxz">请选择</option>');
}
 
function setListData(){
	if(markerArr.length > 0 ){
		var pwsListHtm = '';
		var perListHtm = '';
		
		var pwsCount = 0;
		var perCount = 0;
		
		for (var i = 0; i < markerArr.length; i++) {
			var oneMar = markerArr[i];
			//添加电站
			if(oneMar.type == 1){
				 var sta = oneMar.state == 1 ? "计划" :   oneMar.state == 2 ? "在建" : "投运" ;
				pwsListHtm += '<tr>'+
							  '<td>'+oneMar.name+'</td>'+
							  '<td>'+oneMar.pos+'</td>'+
							  ' <td>'+oneMar.remark+'</td>'+
				              ' <td>'+sta+'</td>'+
							  ' <td><a href="'+jumpPageUrl+'/commens/detail.htm?id='+oneMar.id+'" target="_self" onclick="return dianzhan(&apos;'+oneMar.name+'&apos;,&apos;'+jumpPageUrl+'/commens/detail.htm?id='+oneMar.id+'&apos;)" >查看详情</a></td>'+
							  ' </tr>';
				pwsCount++;
			}
			//添加人员
			if(oneMar.type == 2){
				perListHtm += '<tr>'+
				              '<td>'+oneMar.name+'</td>'+
				              '<td>'+oneMar.use_mob+'</td>'+
				              '<td>'+oneMar.workYear+'年</td>'+
				              '<td>'+oneMar.remark+'</td>'+
				              '<td>'+oneMar.comName+'</td>'+
				              '</tr>';
				perCount++;
			}
		}
		$("#pwsList").empty().html(pwsListHtm);
		$("#perList").empty().html(perListHtm);
		
		$("#dzNum").html(pwsCount);
		$("#ryNum").html(perCount);
		
		if(pwsListHtm ==  ''){
			$("#pwsList").html('<tr><td colspan="5">暂无数据</td></tr>');
		}
		if(perListHtm ==  ''){
			$("#perList").html('<tr><td colspan="5">暂无数据</td></tr>');
		}
	}else{
		$("#pwsList").html('<tr><td colspan="5">暂无数据</td></tr>');
		$("#perList").html('<tr><td colspan="5">暂无数据</td></tr>');
		$("#dzNum").html(0);
		$("#ryNum").html(0);
	}
	
}


function dianzhan(menuName,menuHref){
	if(menuHref !="#"){
		var TwoMenu =  '<a class="bottom-nav" href="'+menuHref+'"  target="main" id="twoLevel" style="padding-left: 0;max-width: 40%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" ><i style="font-style: normal;font-size: 14px;width: 10px;height: 38px;margin-right: 5px;padding-right: 0;background: url('+jumpPageUrl+'/images/jiantou.png) no-repeat;background-size: 7px 15px;margin-top: 2px;float: left;"></i><i class="bdf"></i>'+menuName+'</a>';
		$(parent.frames["bottom"].document).find("#nav-bot").append(TwoMenu);
	}
}