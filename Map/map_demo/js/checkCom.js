var userComData = null ; 
$(function(){
	if($("#companyPws")){
		$("#companyPws").change(function(){
			if($(this).val() == "qxz"){
				clearPwsSession();
			}else{
				sessionStorage.setItem("pwsId",$(this).val());
			}
		})
	}
})
function getCompanyOne(fun){
	/*var userId = $("#userId").val(); 
	var param  = "id="+userId;*/
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
    		if(fun){
    			fun();
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
	 var html = '<option value="qxz">请选择一级公司</option>';
	 for (var i = 0; i < userComData.length; i++) {
		 var comOne  = userComData[i];
		 var selectHtm = "";
		 if(sessionStorage.getItem("comOne") && sessionStorage.getItem("comOne") == comOne.id){
			   selectHtm = "selected";
			   setCompanytwo(sessionStorage.getItem("comOne"));
		 }
		 html += '<option value="'+comOne.id+'" '+selectHtm+'>'+comOne.com_nam+'</option>'
	}
	$("#companyOne").empty().append(html);
}


function setCompanytwo(val){
	if(val == 'qxz'){
		clearCompanyTwo();
		clearCompanyThree();
		clearPws();
		clearPwsSession();
	}else{
		sessionStorage.setItem("comOne",val);
		var html = '<option value="qxz">请选择二级公司</option>';
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
	}
	 
}

function setCompanyThree(val){
	if(val == 'qxz'){
		clearCompanyThree();
		clearPws();
		clearPwsSession();
	}else{
		sessionStorage.setItem("comTwo",val);
		var html = '<option value="qxz">请选择三级公司</option>';
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
		$("#companyThree").empty().append(html);
	}
}


function setPws(val){
	if(val == 'qxz'){
		clearPws();
		clearPwsSession();
	}else{
		sessionStorage.setItem("comThree",val);
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
							 var selectHtm = "";
							 if(sessionStorage.getItem("pwsId") && sessionStorage.getItem("pwsId") == pws.id){
								   selectHtm = "selected";
								   /*setPws(sessionStorage.getItem("pwsId"));*/
							 }
							 html += '<option value="'+pws.id+'" '+selectHtm+'>'+pws.pws_nam+'</option>'
						 }
						
					 }
				 }
			 }
		}
		$("#companyPws").empty().append(html);
	}
}

function clearCompanyTwo(){
	sessionStorage.removeItem("comOne");
	$("#companyTwo").empty().append('<option value="qxz">请选择二级公司</option>');
}

function clearCompanyThree(){
	sessionStorage.removeItem("comTwo");
	$("#companyThree").empty().append('<option value="qxz">请选择三级公司</option>');
}
function clearPws(){
	sessionStorage.removeItem("comThree");
	$("#companyPws").empty().append('<option value="qxz">请选择电站</option>');
}
function clearPwsSession(){
	sessionStorage.removeItem("pwsId");
}