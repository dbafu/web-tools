var userComData = null ; 
$(function(){
	if($("#companyPws")){
		$("#companyPws").change(function(){
			if($(this).val() == "qxz"){
				clearPwsSession();
			}else{
				sessionStorage.setItem("pwsIdXt",$(this).val());
			}
		})
	}
})
function getCompanyOne(){
	var userId = $("#userId").val(); 
	var param  = "";
	$.ajax({
    	url:url+"getComLst.htm",
    	data : param,
    	dataType:"json",
    	type:"post",
    	success:function(data){
    		if (data.resultcode=="USR000") {
    			 if(data.data != null){
    				 userComData = data.data ;
    				 setCompanyOne();
    			 } 
			} else {
               layer.alert(data.desc);
			}
    	}
    })
}


function setCompanyOne(){
	 var html = '<option value="qxz">请选择一级公司</option>';
	 for (var i = 0; i < userComData.length; i++) {
		 var comOne  = userComData[i];
		 var selectHtm = "";
		 if(sessionStorage.getItem("comOneXt") && sessionStorage.getItem("comOneXt") == comOne.id){
			   selectHtm = "selected";
			   if($("#companyPwsNew") && $("#companyPwsNew").html() != undefined){
				   setPwsNew(sessionStorage.getItem("comOneXt"),1);
			   }
			   setCompanytwo(sessionStorage.getItem("comOneXt"));
			   
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
		sessionStorage.setItem("comOneXt",val);
		var html = '<option value="qxz">请选择二级公司</option>';
		for (var i = 0; i < userComData.length; i++) {
			 var comOne  = userComData[i];
			 if(comOne.id == val){
				 for (var j = 0; j < comOne.comLev2Lst.length; j++) {
					 var comTwo  = comOne.comLev2Lst[j];
					 var selectHtm = "";
					 if(sessionStorage.getItem("comTwoXt") && sessionStorage.getItem("comTwoXt") == comTwo.id){
						 if($("#companyPwsNew") && $("#companyPwsNew").html() != undefined){
							   setPwsNew(sessionStorage.getItem("comTwoXt"),2);
						   }
						   selectHtm = "selected";
						   setCompanyThree(sessionStorage.getItem("comTwoXt"));
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
		sessionStorage.setItem("comTwoXt",val);
		var html = '<option value="qxz">请选择三级公司</option>';
		 for (var i = 0; i < userComData.length; i++) {
			 var comOne  = userComData[i];
			 for (var j = 0; j < comOne.comLev2Lst.length; j++) {
				 var comTwo  = comOne.comLev2Lst[j];
				 if(comTwo.id == val){
					 for (var k = 0; k < comTwo.comLev3Lst.length; k++) {
						 var comThree  = comTwo.comLev3Lst[k];
						 var selectHtm = "";
						 if(sessionStorage.getItem("comThreeXt") && sessionStorage.getItem("comThreeXt") == comThree.id){
							 if($("#companyPwsNew") && $("#companyPwsNew").html() != undefined){
								   setPwsNew(sessionStorage.getItem("comThreeXt"),3);
							   }
							   selectHtm = "selected";
							   setPws(sessionStorage.getItem("comThreeXt"));
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
		sessionStorage.setItem("comThreeXt",val);
		var html = '<option value="qxz">请选择电站</option>';
		var param = 'com_id='+val;
		$.ajax({
	    	url:url+"getPwsInfLstByPwsId.htm",
	    	data : param,
	    	dataType:"json",
	    	type:"post",
	    	success:function(data){
	    		if (data.resultcode=="USR000") {
	    			for (var l = 0; l < data.data.length; l++) {
						 var pws = data.data[l];
						 var selectHtm = "";
						 if(sessionStorage.getItem("pwsIdXt") && sessionStorage.getItem("pwsIdXt") == pws.id){
							   selectHtm = "selected";
							   /*setPws(sessionStorage.getItem("pwsId"));*/
						 }
						 html += '<option value="'+pws.id+'" '+selectHtm+'>'+pws.pws_nam+'</option>'
					 }
	    			$("#companyPws").empty().append(html);
				} else {
	               layer.alert(data.desc);
				}
	    	}
	    })
	}
}

function clearCompanyTwo(){
	sessionStorage.removeItem("comOneXt");
	$("#companyTwo").empty().append('<option value="qxz">请选择二级公司</option>');
}

function clearCompanyThree(){
	sessionStorage.removeItem("comTwoXt");
	$("#companyThree").empty().append('<option value="qxz">请选择三级公司</option>');
}
function clearPws(){
	sessionStorage.removeItem("comThreeXt");
	$("#companyPws").empty().append('<option value="qxz">请选择电站</option>');
}
function clearPwsSession(){
	sessionStorage.removeItem("pwsIdXt");
}