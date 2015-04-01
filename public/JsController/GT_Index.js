var TrxNo;
var StoreNo;
$(document).ready(function(){
  document.getElementById("StoreNo").focus();
  Rho.Barcode.disable();
  Rho.Barcode.enable({},scan_received);
});
function LoadRecord(e){
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
    var BarCode = document.getElementById("BarCode").value;
    var strSQL='';
    if(BarCode != ''){
      strSQL = 'SELECT Top 1 Impr1.ProductCode, Impr1.ProductName,'
      strSQL = strSQL + "(Case DimensionFlag When '1' Then PackingQty When '2' Then WholeQty Else LooseQty End) AS DimensionQty,"
      strSQL = strSQL + "(Case DimensionFlag When '1' Then PackingVolume When '2' Then WholeVolume Else LooseVolume End) AS DimensionVolume,"
      strSQL = strSQL + "(Case DimensionFlag When '1' Then PackingWeight When '2' Then WholeWeight Else LooseWeight End) AS DimensionWeight"
      strSQL = strSQL + " From Impr1 WHERE (Case (Select Top 1 IsNull(BarCodeField,'') From Impa1) When '' Then Impr1.UserDefine01 else (Select Top 1 IsNull(BarCodeField,'') From Impa1) end)='" + BarCode + "' AND Impr1.StatusCode<>'DEL' AND Impr1.CustomerCode='" + document.getElementById("CustomerCode").value + "'";
    }
    var JsonData = '{"spName": "","strSQL": "' + strSQL + '","strResult": "1","strCatalog": "' + localStorage.getItem("strCatalog") + '","strUserName": "' + localStorage.getItem("strUserName") + '","strPassWord": "' + localStorage.getItem("strPassWord") + '"}';
    var result = PostToWebService("ExecDataReturnDS",localStorage.getItem("strServerAddress"),JsonData);
    for(var i=0;i<result.length;i++){
      if(result[i].ProductCode != null)
      {
        document.getElementById("ProductCode").value = result[i].ProductCode;
      }
      if(result[i].ProductName != null)
      {
        document.getElementById("Description").value = result[i].ProductName;
      }
      if(result[i].DimensionQty != null)
      {
        document.getElementById("DimensionQty").value = result[i].DimensionQty;
      }
      if(result[i].DimensionVolume != null)
      {
        document.getElementById("Vol").value = result[i].DimensionVolume;
      }
      if(result[i].DimensionWeight != null)
      {
        document.getElementById("Wt").value = result[i].DimensionWeight;
      }
    }
    document.getElementById("DimensionQty").focus();
  }
}
function QueryString(val){  
  var uri = window.location.search;
  var re = new RegExp("" +val+ "=([^&?]*)", "ig");  
  return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);  
}
function scan_received(params){
  //Did we actually find a barcode ?
  //If status is not 'ok', the scan was cancelled
  if (params["status"]=="ok") {
    document.getElementById("BarCode").value = params["barcode"];
  }
  else
  {
    //show_alert("Scan","Barcode scanning aborted","OK");
  }
  Rho.Barcode.stop();
}
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
    //Jump(TrxNo,document.getElementById("StoreNo").value);
  }     
}