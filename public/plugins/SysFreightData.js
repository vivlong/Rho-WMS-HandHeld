var show_alert = function show_alert(titles,messages,btn){
	Rho.Notification.showPopup({
        title : titles,
        message : messages,
        buttons : [btn]
      });
}
var PostToWebService = function PostToWebService(methodName,strServerAddress,JsonData){
	var result = null;	
	var response = Rho.Network.post({
        httpVerb : "POST",
        headers : { "Content-Type": "application/json;charset=utf-8" },
        url : "http://" + strServerAddress + "/RhoWS/Data.asmx/" + methodName,
        body : JsonData
    });
	if (response.status=="ok") {
        try {
        	var dataobj = JSON.parse(response.body);
        	result = JSON.parse(dataobj.d);
        } catch (e) {
        	//show_alert(e.name,e.message,'OK');
        	show_alert('Data','WebService Error','OK');
        }
	}else {
		show_alert('Connect','WebService Error','OK');
    }
	return result;
}
var GetData = new Object({
	GetFromWebService : function (methodName,strServerAddress,JsonData){
		var result = null;	
		var response = Rho.Network.post({
	        httpVerb : "POST",
	        headers : { "Content-Type": "application/json;charset=utf-8" },
	        url : "http://" + strServerAddress + "/RhoWS/Data.asmx/" + methodName,
	        body : JsonData
	    });
		if (response.status=="ok") {
	        try {
	        	var dataobj = eval("(" + response.body + ")");
	        	result = eval("(" + dataobj.d + ")");
	        } catch (e) {
	        	show_alert(e.name,e.message,'OK');
	        }
		}else {
			show_alert('Login','WebService Error','OK');
	    }
		return result;
	}
});