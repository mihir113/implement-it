(function () {'use strict';// this function is strict...
}());
//Global Variables-Start
var status_open = "Y";
var srNumber = "";
var status_new = "N";
var proj_available = "Y";
const getSR = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/get_comment/";
const updateSR = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/sr_update/";
const createSR = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/sr_create";
const getProject = "https://apex.oraclecorp.com/pls/apex/fusion_projects/implementation/get_project/";
var srInformation = "";
var validInternet = "";
var csiNum = "";
var srOpenDateFormatted = "";
var srGroup = "";
// When the Firefox Addon is loaded 
window.addEventListener("load", populateSRNumber);
function populateSRNumber() {
	doesConnectionExist();// Check Internet Connection & VPN 
	/* Hide Unwanted Sections On Page Load */
	document.getElementById("hover_bkgr_fricc_srUpdate").style.display = "none"; //Update Modal Dialog
	document.getElementById("hover_bkgr_fricc_srCreate").style.display = "none"; //Create Modal Dialog
	document.getElementById("hover_bkgr_fricc_srClosed").style.display = "none"; //Closed Modal Dialog
	document.getElementById("hover_bkgr_fricc_error").style.display = "none"; //Timeout Error
	document.getElementById("projDiv").style.display = "none"; //Project List
	document.getElementById("loader").style.display = "none"; //Loader
	document.getElementById("lblSRClose1").style.display = "none";	
	browser.tabs.query({
		active: true,
		currentWindow: true
	}).then(function (tabs) {
		var currentTabUrl = tabs[0].url;
		var url = new URL(currentTabUrl);
		var domain = url.hostname;
		var strM = tabs[0].title;
		if (domain === ("support.us.oracle.com") && ((url.toString().indexOf("https://support.us.oracle.com/oip/faces/secure/srm/srview/SRTechnical.jspx?action=createQueryTab&srNumber=") > -1) ||(url.toString().indexOf("https://support.us.oracle.com/oip/faces/secure/srm/srview/SRTechnical.jspx?srNumber=")> -1 ))){ //Execute the rest of the plugin code only when user is MOS site
			//srNumber = url.searchParams.get("srNumber");
			srNumber = strM.substring(3,16);
			var inputBoxSRNum = document.getElementById("element_1"); // Set the SR Number Parameter to the SR Input Textbox on form.
			inputBoxSRNum.value = srNumber;
			verifyLocalMemory();	
			var em= localStorage.getItem("ssoEm");
			if (srNumber !== "" && em !== null){
				//getURLFromFile();
				getSRUpdateFromImplPortal();
			}
			else{
				initializeFirstLoad();
			}
		}
		else { //Error Handling
			document.getElementById("form_container").style.display = "none";
			document.getElementById("initialize_user").style.display = "none";
			document.getElementById("error_content").style.display = "block"; //Display Error Message
		}
	});
}
//Code To Handle SR Status	
document.addEventListener("DOMContentLoaded", function (event) {
	var a = document.getElementById('srStatusSelect');
	a.addEventListener('change', function() {
		if(this.value =="Closed"){//Closed
				status_open = "N";
				status_new = "N";
				document.getElementById("saveForm").value = "Close SR";
				document.getElementById("projDiv").style.display = "None";
				document.getElementById("lblSRUpd1").style.display = "none";
				document.getElementById("lblSRClose1").style.display = "block";
				status_open = "N";
		}
		if(this.value =="Open"){//Open
				document.getElementById("saveForm").value = "Update SR";
				document.getElementById("projDiv").style.display = "None";
				document.getElementById("lblSRClose1").style.display = "none";
				document.getElementById("lblSRUpd1").style.display = "block";
				status_open = "Y";
				status_new = "N";
		}
		if(this.value =="New"){//New
				newSRFlow();
		}  
	}, false);
});
//Submit
document.addEventListener("submit", (e) => { //When Firefox addon is submit 
	startProcessing();
	console.log('Inside Submit');
	if (document.getElementById("element_2").value !== "") {
		if (status_new == "Y" && proj_available == "N") {
			window.alert("Project Name Is Required");
			document.getElementById("loader").style.display = "none";
			document.getElementById("form_container").style.display = "block";
		}
		//If SR is OPEN -- Update SR In Portal
		if (status_open == "Y" && status_new == "N" && proj_available == "Y") {
			updateOpenSRInPortal();
		}
		//If SR is Closed
		if (status_open == "N" && status_new == "N") {
			closeOpenSRInPortal();
		}
		//If SR is a NEW SR
		if (status_open == "N" && status_new == "Y" && proj_available == "Y") {
			createNewSRInPortal();
		}
	} //If end
	else {
		window.alert("Please provide a SR update before clicking Submit");
	}
	e.preventDefault(); // Stop the OnLoad function to execute on Submit.
});

function processingComplete(){	
	document.getElementById("loader").style.display = "none";
	document.getElementById("form_container").style.display = "block";
}
function startProcessing(){	
	document.getElementById("form_container").style.display = "none";
	document.getElementById("loader").style.display = "block";
}
function newSRFlow(){
	console.log('newSRFlow');
	document.getElementById("projName").required = true; 
	getSRDetailsFromMOS();
	document.getElementById("srStatusSelect").value = "New";
	document.getElementById("saveForm").value = "Create SR";
	document.getElementById("projDiv").style.display = "block";
	document.getElementById("lblSRClose1").style.display = "none";
	document.getElementById("lblSRUpd1").style.display = "block";
	document.getElementById("initialize_user").style.display = "none";	
	status_open = "N";
	status_new = "Y";	
}
function replaceHTMLSpecialChars(mystring){
	//	return mystring.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/p/g, "");
	return brToNewLine(mystring).replace(/<{1}[^<>]{1,}>{1}/g,"");
	//return mystring.replace(/<{1}[^<>]{1,}>{1}/g,"");
}
function brToNewLine(str) {
    return str.replace(/<br ?\/?>/g, "\n");
}
function convertMOSSpecCharacters(mystring){
	return mystring.replace(/&amp;/g, "&").replace(/&quot;/g, '\\"');
}
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKServerCreate").addEventListener("click", function( event ) {
		document.getElementById("hover_bkgr_fricc_srCreate").style.display = "none";
		window.close(); //Close the popup
	}, false);
});
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKServerUpdate").addEventListener("click", function( event ) {
		document.getElementById("hover_bkgr_fricc_srUpdate").style.display = "none";
		window.close(); //Close the popup
	}, false);
});
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnOKServerClosed").addEventListener("click", function( event ) {
		document.getElementById("hover_bkgr_fricc_srClosed").style.display = "none";
		window.close(); //Close the popup
	}, false);
});

function formatDates(dateStr){
	var date = dateStr.split("-");
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	for(var j=0;j<months.length;j++){
	if(date[1]==months[j]){
		 date[1]=months.indexOf(months[j])+1;
	 }                      
	} 
	if(date[1]<10){
	date[1]='0'+date[1];
	}                        
	return  date[1] + '-' + date[0] +'-' + date[2];
}