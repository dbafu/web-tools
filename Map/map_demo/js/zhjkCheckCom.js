var userComData = null ; 
 
var markerArr = [];

var comOneCheck = null ; 
var comTwoCheck = null ; 
var comThreeCheck = null ; 

var placeHolderStyle = {
	normal : {
        color: '#3285FF' 
    }
}
var placeHolderStyle1 = {
	normal : {
        color: '#F1B101' 
    }
}
var placeHolderStyle2 = {
	normal : {
        color: '#F54336' 
    }
}

function getCompanyOne(){
	/*var userId  = $("#userId").val();
	var param  = "use_id="+userId; */
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
		 /*if(sessionStorage.getItem("comOne") && sessionStorage.getItem("comOne") == comOne.id){
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
		map_init();
	}else{
		comOneCheck = val;
		markerArr = [];
		sessionStorage.setItem("comOne",val);
		
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
							markerArr.push(oneMarker);
						 }
					}
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
											name : pwsThree.pws_nam,
											picS : pwsThree.pwsPicLst
									};
								 markerArr.push(oneMarker);
							 }
							
						 }
					 }
				 }
			 }
		}
		
		var html = '<option value="qxz">请选择</option>';
		for (var i = 0; i < userComData.length; i++) {
			 var comOne  = userComData[i];
			 if(comOne.id == val){
				 for (var j = 0; j < comOne.twoComLst.length; j++) {
					 var comTwo  = comOne.twoComLst[j];
					 var selectHtm = "";
					 if(sessionStorage.getItem("comTwo") && sessionStorage.getItem("comTwo") == comTwo.id){
						   selectHtm = "selected";
						   setCompanyThree(sessionStorage.getItem("comTwo"));
					 }
					 html += '<option value="'+comTwo.id+'" '+selectHtm+'>'+comTwo.com_nam+'</option>'
				 }
			 }
		}
		$("#companyTwo").empty().append(html);
		
		
		
		map_init();
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
										name : pwsThree.pws_nam,
										picS : pwsThree.pwsPicLst
								};
								markerArr.push(oneMarker);
							 }
						 }
					 }
				 }
			 }
			 
		}
		map_init();
		
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
								   setPws(sessionStorage.getItem("comThree"));
							 }
							 html += '<option value="'+comThree.id+'" '+selectHtm+'>'+comThree.com_nam+'</option>'
						 }
					 }
				 }
			}
		}
		$("#companyThree").empty().append(html);
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
											point :optThree.useLonLat[0].use_lon+','+optThree.useLonLat[0].use_lat,
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
										name : pwsThree.pws_nam,
										picS : pwsThree.pwsPicLst
								};
								markerArr.push(oneMarker);
							 }
						 }
					 }
				 }
			 }
		}
		map_init();
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
 
function showRight(){
	var userId = $("#userId").val();
	var param  = "use_id="+userId;
	$.ajax({
    	url:url+"getIntMonLeftSide.htm",
    	data : param,
    	dataType:"json",
    	type:"post",
    	success:function(data){
    		if (data.resultcode=="USR000") {
    			 if(data.data.length > 0 ){
    				 var d  = data.data[0];
    				 var serData = [];
    				 serData.push({
    					 value:d.pwsOptCou, 
    					 name:'已投运',
    					 itemStyle : placeHolderStyle2 
    				 });
    				 serData.push({
    					 value:d.pwsConCou, 
    					 name:'在建',
    					 itemStyle : placeHolderStyle1
    				 });
    				 serData.push({
    					 value:d.pwsPlaCou, 
    					 name:'计划',
    					 itemStyle : placeHolderStyle
    				 });
    				 
    				 var serData2 = [];
    				 serData2.push({
    					 value:getFixedNum5(d.pwsOptCap/1000), 
    					 name:'已投运',
    					 itemStyle : placeHolderStyle2 
    				 });
    				 serData2.push({
    					 value:getFixedNum5(d.pwsConCap/1000), 
    					 name:'在建',
    					 itemStyle : placeHolderStyle1
    				 });
    				 serData2.push({
    					 value:getFixedNum5(d.pwsPlaCap/1000), 
    					 name:'计划',
    					 itemStyle :  placeHolderStyle
    				 });
    				 
    				 
    				 var zrl = getFixedNum5(((d.pwsOptCap)+(d.pwsConCap)+(d.pwsPlaCap))/1000);
    				 var zsl = (d.pwsOptCou)+(d.pwsConCou)+(d.pwsPlaCou);
    				 
    				 
    				 chart(serData,zsl);
    				 chart1(serData2,zrl);
    				 
    				 var pwsCou = d.pwsCou;
    				 var pwsCap = d.pwsCap;
    				 
    				 $("#aqyxts").html(d.safeRunDays);
    				 $("#ljsy").html(getFixedNum5(d.tolRvn));
    				 
    				 $("#gfgl").html(getFixedNum5(d.pvPower/1000)+"");
    				 $("#cngl").html(getFixedNum5(d.pcPower/1000)+"");
    				 $("#cdgl").html(getFixedNum5(d.chpPower/1000)+"");

    				 $("#dxzs").html(getFixedNum4(d.equPlaTre)+"棵");
    				 $("#eyht").html(getFixedNum5(d.carDioEmiRed/1000)+"吨");
    				 $("#jybm").html(getFixedNum5(d.staCoal/1000)+"吨");
    				 
    				 
    				 $("#tyrl").html(getFixedNum5(d.pwsOptCap/1000));
    				 $("#tysl").html(d.pwsOptCou);
    				 $("#zjrl").html(getFixedNum5(d.pwsConCap/1000));
    				 $("#zjsl").html(d.pwsConCou);
    				 $("#jhrl").html(getFixedNum5(d.pwsPlaCap/1000));
    				 $("#jhsl").html(d.pwsPlaCou);
    				 
    				 
    				 $("#rightnav").show();
    			 }else{
    				 $("#rightnav").hide();
    			 }
			} else {
               layer.alert(data.desc);
			}
    	}
    })
}

