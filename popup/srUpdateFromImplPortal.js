//Function to fetch existing SR Update from implementation portal
function getSRUpdateFromImplPortal() {
 console.log('getSRUpdateFromImplPortal');
 startProcessing();
 var xhr = new XMLHttpRequest(),
  method = "GET",
  url = getSR + srNumber;
  xhr.open(method, url, true);
  xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
   processingComplete();
   var responseText = JSON.parse(xhr.responseText);
   var srCount = Object.keys(responseText.items).length;
   if (srCount > 0) { //SR exists in Portal
    var isSROpenInPortal = responseText.items[0].is_open;
    var portalUpdate = responseText.items[0].issue_detail;
    document.getElementById("srOwner").value = responseText.items[0].issue_owner; //SR Owner
    document.getElementById("severity").value = responseText.items[0].issue_level; //SR Severity
    document.getElementById("summaryTxt").value = responseText.items[0].issue; //SR Summary
    // If SR Is Open
    if (isSROpenInPortal === "Y") {
	 status_open =="Y";
     document.getElementById("srStatusSelect").value = "Open";
	 document.getElementById("srStatusSelect").options[2].disabled = true;
	 document.getElementById("saveForm").value = "Update SR";
    } else {
	 status_open = "N";
     document.getElementById("srStatusSelect").value = "Closed";
	 document.getElementById("srStatusSelect").options[2].disabled = true;
	 document.getElementById("saveForm").value = "Close SR";
    }
    if (portalUpdate !== "") {
     document.getElementById("element_2").value = replaceHTMLSpecialChars(portalUpdate);
    }
   } else { //No SR Found in Portal, simulating new SR flow
    console.log('newSRFlow');
    newSRFlow();
   }
  }
 };
 xhr.send();
}