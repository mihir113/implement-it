function createNewSRInPortal() {
 console.log('createNewSRInPortal');
 startProcessing();
 var srSummary = document.getElementById("summaryTxt").value;
 var srUpdate = document.getElementById("element_2").value.replace(/\n/g, "<br />");
 //var srUpdate = replaceHTMLSpecialChars(document.getElementById("element_2").value);
 var srNum = document.getElementById("element_1").value;
 var projectName = document.getElementById("projName").value;
 if(projectName){
 var invocation = new XMLHttpRequest();
 var url = createSR;
 if (invocation) {
  invocation.open("POST", url, true);
  invocation.timeout = 5000;
  invocation.setRequestHeader("project", projectName); //Set Project Name
  invocation.setRequestHeader("sr_number", srNum); //Set the SR Number
  invocation.setRequestHeader("summary", srSummary); //Set the SR Update
  invocation.setRequestHeader("is_open", "Y"); //Set the SR open in Portal
  invocation.setRequestHeader("issue_owner", document.getElementById("srOwner").value); //Set SR Owner
  invocation.setRequestHeader("issue_level", document.getElementById("severity").value); //Set SR Severity
  invocation.setRequestHeader("comments", srUpdate); //Send the SR Update
  console.log('srOpenDateFormatted: +++' + srOpenDateFormatted);
  invocation.setRequestHeader("sr_open_date", srOpenDateFormatted); //Send the SR Update
  invocation.setRequestHeader("sr_group", srGroup); //Send the SR Update
  invocation.withCredentials = true;
  invocation.send();
  invocation.onreadystatechange = function(e) {
   if (invocation.readyState === 4) {
    if (invocation.status === 200) {
     document.getElementById("projName").required = false; 
     processingComplete();
	 document.getElementById("hover_bkgr_fricc_srCreate").style.display = "block"; //Show Confirmation Box
     //window.close(); //Close the popup
    }
   }
  };
 }
 }
}