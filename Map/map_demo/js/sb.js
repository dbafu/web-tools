$(function(){
	var goJumpType = $("#goJumpType").val();
	if(goJumpType != "" && goJumpType != undefined){
		var id  = $("#id").val();
		var equNum  = $("#equNum").val();
		jumpPage(id,equNum);
	}
})

function jumpPage(id,equNum){
	var app_typ_id=$("#app_typ_id").val();
	var pws_id=$("#pws_id").val(); 
	var typ_ide=$("#typ_ide").val();  
	var url_p = "?id="+id+"&equNum="+equNum;
	var html = '';
	var curUrl = '';
	if(typ_ide == "GFNBQ"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/pvinverter.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/pvinverter.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/pvshistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/pvshealthy.htm'+url_p+'"  target="right">健康状况</a>';
	 }else if(typ_ide == "CNNBQ"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/storage.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/storage.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/storagehistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/storagehealthy.htm'+url_p+'"  target="right">健康状况</a>';
	 }else if(typ_ide == "CNDC"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/energy.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/energy.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/energyhistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/energyhealthy.htm'+url_p+'"  target="right">健康状况</a>';
	 }else if(typ_ide == "HJJCY"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/enviroment.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/enviroment.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/enviromenthistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/enviromenthealthy.htm'+url_p+'"  target="right">健康状况</a>';
	 }else if(typ_ide == "DCDC"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/dc.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/dc.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/dchistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/dchealthy.htm'+url_p+'" target="right" >健康状况</a>';
	 }else if(typ_ide == "BYQ"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/transformer.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/transformer.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/transformerhistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/transformerhealthy.htm'+url_p+'"  target="right">健康状况</a>';
	 }else if(typ_ide == "DB"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/enwatch.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/enwatch.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/enwatchhistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/enwatchhealthy.htm'+url_p+'" target="right" >健康状况</a>';
	 }else if(typ_ide == "DNZLJCZZ"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/powercheck.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/powercheck.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/powercheckhistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/powercheckhealthy.htm'+url_p+'" target="right" >健康状况</a>';
	 }else if(typ_ide == "HLX"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/headerbox.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/headerbox.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/headerboxhistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/headerboxhealthy.htm'+url_p+'" target="right" >健康状况</a>';
	 }else if(typ_ide == "JLPDG"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/peidiangui.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/peidiangui.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/peidianguihistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/peidianguihealthy.htm'+url_p+'"  target="right">健康状况</a>';
	 }else if(typ_ide == "ZLPDG"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/zlpeidiangui.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/zlpeidiangui.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/zlpeidianguihistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/zlpeidianguihealthy.htm'+url_p+'" target="right">健康状况</a>';
	 }else if(typ_ide == "JLZZ"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/jielie.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/jielie.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/jieliehistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/jieliehealthy.htm'+url_p+'" target="right" >健康状况</a>';
	 }else if(typ_ide == "XLBH"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/protect.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/protect.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/protecthistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/protecthealthy.htm'+url_p+'" target="right">健康状况</a>';
	 }else if(typ_ide == "JLCDZ"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/dcz.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/dcz.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/dczhistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/dczhealthy.htm'+url_p+'" target="right">健康状况</a>';
	 }else if(typ_ide == "ZLCDZ"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/acz.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/acz.htm'+url_p+'" class="active" target="right">实时检测</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/aczhistory.htm'+url_p+'" target="right">历史分析</a>'+
		 	'<a  href="'+jumpPageUrl+'commens/zhjk/sb/aczhealthy.htm'+url_p+'" target="right">健康状况</a>';
	 }else if(typ_ide == "KZQ"){
			 
	 }else if(typ_ide == "WWXT"){
		 curUrl = jumpPageUrl+'commens/zhjk/sb/microgrid.htm'+url_p;
		 html = '<a  href="'+jumpPageUrl+'commens/zhjk/sb/microgrid.htm'+url_p+'" style="margin-left: -10%;" class="active" target="right">实时检测</a>';
		 	/*'<a  href="'+jumpPageUrl+'commens/zhjk/sb/microgridhistory.htm'+url_p+'" target="right">历史分析</a>';*/
	 } 
	 $(parent.frames["tophead"].document).find("#tab").html(html);
	 
	 //选择设备时，左上角的名称变成当前设备名称
	 getName(equNum,curUrl);
}

function getName(equNum,curUrl){
	$.ajax({
    	url:url+"getEquNameByEquNum.htm",
    	data : "equ_num="+equNum,
    	dataType:"json",
    	type:"post",
    	success:function(data){
    		//选择设备时，左上角的名称变成当前设备名称
    	 	 $(parent.frames["tophead"].document).find("#title").html(data.data[0].equ_nam);
    		 
    		 location.href = curUrl ;
    	}
	})
}