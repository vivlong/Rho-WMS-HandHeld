$(function(){
	if(window.localStorage){
		if(localStorage.getItem("strCatalog") != null && localStorage.getItem("strServerAddress") != null){
			document.getElementById("strUserName").value =  localStorage.getItem("strUserName");
			document.getElementById("strServerAddress").value =  localStorage.getItem("strServerAddress");
			document.getElementById("strCatalog").value = localStorage.getItem("strCatalog");
			document.getElementById("strPassword").value = localStorage.getItem("strPassword");
			document.getElementById("QuickLogin").checked = true;
		}
	}
	$('#LoginForm').submit(function(){
		return false;
	});
});
function Connecting(){
	if(LoginCheck())
	{
		var JsonData = {"strResult": "1","strCatalog": document.getElementById("strCatalog").value,"strUserName": document.getElementById("strUserName").value};
		var result = PostToWebService("GetUserInfo",document.getElementById("strServerAddress").value,JsonData);
		if(result.length >0)
		{
		  if(result[0].UserID == document.getElementById("strUserName").value)
		  {
		    if(document.getElementById("QuickLogin").checked){
		      localStorage.setItem("strUserName",document.getElementById("strUserName").value);
		      localStorage.setItem("strServerAddress",document.getElementById("strServerAddress").value);
		      localStorage.setItem("strCatalog",document.getElementById("strCatalog").value);
		      localStorage.setItem("strPassword",document.getElementById("strPassword").value);
		    }else{
		      localStorage.setItem("strUserName",document.getElementById("strUserName").value);
		      localStorage.setItem("strServerAddress",document.getElementById("strServerAddress").value);
		      localStorage.setItem("strCatalog",document.getElementById("strCatalog").value);
		      localStorage.setItem("strPassword",document.getElementById("strPassword").value);
		    }
		    Rho.WebView.navigate('/app/Main/index');
		  }
		  else
		  {
		    show_alert('Login','Invalid User!','OK');
		  }
		}
	}
}
function LoginCheck() {
	var LoginForm = document.getElementById('LoginForm');
	if (LoginForm.strUserName.value=="")
	{
		show_alert('Login','User ID can not be empty!','OK');
		LoginForm.strUserName.focus();
		return false;
	}
	if (LoginForm.strCatalog.value == '')
	{
		show_alert('Login','Site can not be empty!','OK');
		LoginForm.strCatalog.focus();
		return false;
	}
	return true;
}