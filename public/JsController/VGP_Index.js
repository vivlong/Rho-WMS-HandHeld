var SelectorValue='';
var strFilter='';
$(function() {
  LoadCutomer();
  searchfield('text_LoadCutomer',SelectorValue);
  $('#GoodsReceipt').footable();
  document.getElementById('text_LoadCutomer').focus();
  Rho.Barcode.disable();
  Rho.Barcode.enable({},scan_received);
});
function LoadRecord(CustomerCode,GoodsReceiptNoteNo){
  var strSQL='';
  if(CustomerCode != '' && CustomerCode.length > 0){
    strSQL = "select TrxNo,CustomerCode,GoodsReceiptNoteNo, CONVERT(varchar(100), ReceiptDate, 111) AS ReceiptDate,RefNo from imgr1 Where CustomerCode='" + CustomerCode + "'";
  }else if(GoodsReceiptNoteNo != "" && GoodsReceiptNoteNo.length > 0){
    strSQL = "select top 1 TrxNo,CustomerCode,GoodsReceiptNoteNo,CONVERT(varchar(100), ReceiptDate, 111) AS ReceiptDate,RefNo from imgr1 Where GoodsReceiptNoteNo='" + GoodsReceiptNoteNo + "'";
  }else{
    return false;
  }
  var JsonData = '{"spName": "","strSQL": "' + strSQL + '","strResult": "1","strCatalog": "' + localStorage.getItem("strCatalog") + '","strUserName": "' + localStorage.getItem("strUserName") + '","strPassWord": "' + localStorage.getItem("strPassWord") + '"}';
  var result = PostToWebService("ExecDataReturnDS",localStorage.getItem("strServerAddress"),JsonData);
  var strHtml = '';
  for(var i=0;i<result.length;i++){
    var strRefNo = result[i].RefNo;
    if(strRefNo.length > 6){
      strRefNo = strRefNo.slice(0,6) + '...';
    }
    strHtml=strHtml+"<tr ondblclick=\"Jump("+result[i].TrxNo+");\"><td>"+result[i].CustomerCode+"</td><td>"+result[i].GoodsReceiptNoteNo+"</td><td>"+result[i].ReceiptDate+"</td><td>"+strRefNo+"</td></tr>";
  }
  if(strHtml!='' && strHtml.length>0)
  {
    $('#GoodsReceipt').attr("class", "footable table table-bordered table-condensed xsmall Table-Text Margin-Left-m8");
  }
  else
  {
    $('#GoodsReceipt').attr("class", "footable table table-bordered table-condensed xsmall Table-Text");
  }
  $('#GoodsReceipt_tbody').html(strHtml).show();
}
function LoadCutomer(){
  SelectorValue = '';
  var strSQL = 'select BusinessPartyCode from Rcbp1 Where StatusCode<>\'DEL\' and LEN(BusinessPartyCode)>0';
  var JsonData = '{"spName": "","strSQL": "' + strSQL + '","strResult": "1","strCatalog": "' + localStorage.getItem("strCatalog") + '","strUserName": "' + localStorage.getItem("strUserName") + '","strPassWord": "' + localStorage.getItem("strPassWord") + '"}';
  var result = PostToWebService("ExecDataReturnDS",localStorage.getItem("strServerAddress"),JsonData);
  var strHtml = '';
  var obj=document.getElementById('selector_LoadCutomer');
  obj.options.length=0;
  obj.add(new Option('',''));
  for(var i=0;i<result.length;i++){
    SelectorValue = SelectorValue + result[i].BusinessPartyCode.toString() + ',';
    obj.add(new Option(result[i].BusinessPartyCode.toString(),result[i].BusinessPartyCode.toString()));
  }
  SelectorValue = SelectorValue.slice(0,SelectorValue.length-1);
}
function LoadGRN(){
  SelectorValue = '';
  if(document.getElementById("text_LoadCutomer").value != null && document.getElementById("text_LoadCutomer").value.length > 0){
    strFilter = " and CustomerCode='" + document.getElementById("text_LoadCutomer").value + "'";
  }
  var strSQL = 'select GoodsReceiptNoteNo from Imgr1 Where StatusCode=\'USE\' and LEN(GoodsReceiptNoteNo)>0' + strFilter;
  var JsonData = '{"spName": "","strSQL": "' + strSQL + '","strResult": "1","strCatalog": "' + localStorage.getItem("strCatalog") + '","strUserName": "' + localStorage.getItem("strUserName") + '","strPassWord": "' + localStorage.getItem("strPassWord") + '"}';
  var result = PostToWebService("ExecDataReturnDS",localStorage.getItem("strServerAddress"),JsonData);
  var obj=document.getElementById('selector_LoadGRN');
  obj.options.length=0;
  obj.add(new Option('',''));
  for(var i=0;i<result.length;i++){
    SelectorValue = SelectorValue + result[i].GoodsReceiptNoteNo.toString() + ',';
    obj.add(new Option(result[i].GoodsReceiptNoteNo.toString(),result[i].GoodsReceiptNoteNo.toString()));
  }
  SelectorValue = SelectorValue.slice(0,SelectorValue.length-1);
}
function SelectCustomer(){
  var obj = document.getElementById('selector_LoadCutomer');
  document.getElementById('text_LoadCutomer').value = obj.options[obj.selectedIndex].text;
  if(document.getElementById('text_LoadCutomer').value != '')
  {
    LoadRecord(document.getElementById('text_LoadCutomer').value ,'');
  }
  document.getElementById("text_LoadCutomer").focus();
}
function SelectGRN(){
  var obj = document.getElementById('selector_LoadGRN');
  document.getElementById('text_LoadGRN').value = obj.options[obj.selectedIndex].text;
  if(document.getElementById('text_LoadGRN').value != '')
  {
    LoadRecord('',document.getElementById('text_LoadGRN').value);
  }
  document.getElementById("text_LoadGRN").focus();
  GotoJump(13);
}
function SearchField_CallBackOnKeyDown(id,fieldValue,IsSelected){
  if(id == 'text_LoadCutomer')
  {
    LoadRecord(fieldValue,'')
  }
  else
  {
    if(IsSelected)
    {
      LoadRecord('',fieldValue);
    }
    else
    {
      GotoJump(13);
    }
  }
}
function SearchField_CallBackOnMouseDown(id,fieldValue){
  //(id == 'text_LoadCutomer') ? LoadRecord(fieldValue,'') : LoadRecord('',fieldValue);
  if(id == 'text_LoadCutomer')
  {
    LoadRecord(fieldValue,'')
  }
  else
  {
      LoadRecord('',fieldValue);
      GotoJump(13);
  }
}
function GotoJump(keynum){
  if(keynum==13)
  {
    var TrxNo = '';
    var strSQL = 'select top 1 TrxNo from imgr1 Where GoodsReceiptNoteNo=\'' + document.getElementById("text_LoadGRN").value + '\'';
    var JsonData = '{"spName": "","strSQL": "' + strSQL + '","strResult": "1","strCatalog": "' + localStorage.getItem("strCatalog") + '","strUserName": "' + localStorage.getItem("strUserName") + '","strPassWord": "' + localStorage.getItem("strPassWord") + '"}';
    var result = PostToWebService("ExecDataReturnDS",localStorage.getItem("strServerAddress"),JsonData);
    for(var i=0;i<result.length;i++){
      TrxNo = result[i].TrxNo.toString();
    }
    if(TrxNo!='' && TrxNo.length>0)
    {
      Jump(TrxNo);
    }
  }     
}
function Jump(TrxNo){
  var str = '/app/VGP/{' + TrxNo + '}/vgp_scan_sotreno';
  Rho.WebView.navigate(str);
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
    document.getElementById("text_LoadGRN").value = params["barcode"];
  }
  else
  {
    //show_alert("Scan","Barcode scanning aborted","OK");
  }
  Rho.Barcode.stop();
}