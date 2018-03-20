var userComData = null ; 

function getCompanyOne(){
	/*var userId = $("#user_id").val(); 
	var param  = "id="+userId;*/
	var userId = $("#user_id").val(); 
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
	var userId = $("#user_id").val(); 
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
	 var html = '<option value="qxz">请选择一级公司</option>';
	 for (var i = 0; i < userComData.length; i++) {
		 var comOne  = userComData[i];
		 html += '<option value="'+comOne.id+'"  >'+comOne.com_nam+'</option>'
	}
	$("#companyOne").empty().append(html);
}


function setCompanytwo(val){
	if(val == 'qxz'){
		clearCompanyTwo();
		clearCompanyThree();
	}else{
		var html = '<option value="qxz">请选择二级公司</option>';
		for (var i = 0; i < userComData.length; i++) {
			 var comOne  = userComData[i];
			 if(comOne.id == val){
				 for (var j = 0; j < comOne.twoComLst.length; j++) {
					 var comTwo  = comOne.twoComLst[j];
					 html += '<option value="'+comTwo.id+'" >'+comTwo.com_nam+'</option>'
				 }
			 }
		}
		$("#companyTwo").empty().append(html);
	}
	 
}

function setCompanyThree(val){
	if(val == 'qxz'){
		clearCompanyThree();
	}else{
		var html = '<option value="qxz">请选择三级公司</option>';
		 for (var i = 0; i < userComData.length; i++) {
			 var comOne  = userComData[i];
			 for (var j = 0; j < comOne.twoComLst.length; j++) {
				 var comTwo  = comOne.twoComLst[j];
				 if(comTwo.id == val){
					 for (var k = 0; k < comTwo.thrComLst.length; k++) {
						 var comThree  = comTwo.thrComLst[k];
						 html += '<option value="'+comThree.id+'"  >'+comThree.com_nam+'</option>'
					 }
				 }
			 }
			 
		}
		$("#companyThree").empty().append(html);
	}
}


function setPws(val){
	if(val == 'qxz'){
		clearPws();
	}else{
		var html = '<option value="qxz">请选择电站</option>';
		 for (var i = 0; i < userComData.length; i++) {
			 var comOne  = userComData[i];
			 for (var j = 0; j < comOne.twoComLst.length; j++) {
				 var comTwo  = comOne.twoComLst[j];
				 for (var k = 0; k < comTwo.thrComLst.length; k++) {
					 var comThree  = comTwo.thrComLst[k];
					 if(comThree.id == val){
						 for (var l = 0; l < comThree.pwsInfLst.length; l++) {
							 var pws = comThree.pwsInfLst[l];
							 html += '<option value="'+pws.id+'" >'+pws.pws_nam+'</option>'
						 }
						
					 }
				 }
			 }
		}
		$("#companyPws").empty().append(html);
	}
}


function setTypeIde(val){
	if(val == 'qxz'){
		clearTypeIde();
	}else{
		var html = '<option value="qxz">请选择设备类型</option>';
		$.ajax({
			url:url+"getSysBasAppTypeByPwsId.htm",
			data : "pws_id="+val,
			success: function(datas){
				if (datas.data.length > 0 ) {
					for (var l = 0; l < datas.data.length; l++) {
						 var typIde = datas.data[l];
						 html += '<option value="'+typIde.id+'" >'+typIde.typ_nam+'</option>'
					 }
					$("#typeIde").empty().append(html);
				}
				
			},
			error : function(){
				
			}
		}); 
		
	}
}


function setTypeEquNum(val){
	if(val == 'qxz'){
		clearEquNum();
	}else{
		var companyPws = $("#companyPws").val();
		var html = '<option value="qxz">请选择设备编号</option>';
		$.ajax({
			url:url+"getEquNumBySysBasAppTypeId.htm",
			data : "app_typ_id="+val+"&pws_id="+companyPws,
			success: function(datas){
				if (datas.data.length > 0 ) {
					for (var l = 0; l < datas.data.length; l++) {
						 var equ = datas.data[l];
						 html += '<option value="'+equ.equ_num+'" >'+equ.equ_nam+'</option>'
					 }

					$("#equ_num").empty().append(html);
				}
			},
			error : function(){
				
			}
		}); 
	}
}

function clearCompanyTwo(){
	$("#companyTwo").empty().append('<option value="qxz">请选择二级公司</option>');
}

function clearCompanyThree(){
	$("#companyThree").empty().append('<option value="qxz">请选择三级公司</option>');
}
function clearPws(){
	$("#companyPws").empty().append('<option value="qxz">请选择电站</option>');
}
function clearTypeIde(){
	$("#typeIde").empty().append('<option value="qxz">请选择设备类型</option>');
}
function clearEquNum(){
	$("#equ_num").empty().append('<option value="qxz">请选择设备编号</option>');
}
