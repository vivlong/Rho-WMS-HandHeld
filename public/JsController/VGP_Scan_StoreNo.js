var TrxNo;
var IsScaned = false;
$(function(){
	TrxNo = strSSN;
	TrxNo = TrxNo.slice(1,TrxNo.length-1);   
	if(TrxNo.length>0){
		var strSQL = "select CustomerCode,GoodsReceiptNoteNo from imgr1 where TrxNo=" + TrxNo;
		var JsonData = '{"spName": "","strSQL": "' + strSQL + '","strResult": "1","strCatalog": "' + localStorage.getItem("strCatalog") + '","strUserName": "' + localStorage.getItem("strUserName") + '","strPassWord": "' + localStorage.getItem("strPassWord") + '"}';
		var result = PostToWebService("ExecDataReturnDS",localStorage.getItem("strServerAddress"),JsonData);
		var strHtml = "";
		for(var i=0;i<result.length;i++){
			document.getElementById("CustomerCode").value = result[i].CustomerCode;
			document.getElementById("GoodsReceiptNoteNo").value = result[i].GoodsReceiptNoteNo;
		}
	}
	document.getElementById("StoreNo").focus();
	Rho.Barcode.disable();
	Rho.Barcode.enable({},scan_received);
});
function GotoJump(e){
	var keynum;
	if(window.event) // IE
	{
		keynum = e.keyCode
	}
	else if(e.which) // Chrome/Netscape/Firefox/Opera
	{
		keynum = e.which
	}
	if(keynum==13)
	{
		Jump(TrxNo,document.getElementById("StoreNo").value);
	}     
}
function Jump(TrxNo,StoreNo){
	if(StoreNo.length>0)
	{
		//window.location="Imgr_Scan_BarCode.html?TrxNo="+TrxNo+"&StoreNo="+StoreNo;
		var str = "/app/VGP/{" + TrxNo + "," + StoreNo + "}/vgp_scan_barcode";
		Rho.WebView.navigate(str);
	}
	else
	{
		show_alert("ScanStoreNo","Store No can not be empty!","OK");
		document.getElementById("StoreNo").focus(); 
	}
}
function scan_using_default_scanner(){
	// Scan with default options
	Rho.Barcode.take({}, scan_received);
}
function scan_received(params){
	//Did we actually find a barcode ?
	//If status is not 'ok', the scan was cancelled
	if (params["status"]=="ok") {
		IsScaned = true;
		document.getElementById("StoreNo").value = params["barcode"];
	}
	else
	{
		//show_alert("Scan","Barcode scanning aborted","OK");
	}
	Rho.Barcode.stop();
}