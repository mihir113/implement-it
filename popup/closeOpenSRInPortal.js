function closeOpenSRInPortal() {
 console.log('closeOpenSRInPortal');
 startProcessing();
 var srUpdate = document.getElementById("element_2").value.replace(/\n/g, "<br />");
 var srSummary = document.getElementById("summaryTxt").value;
 var srOwner = document.getElementById("srOwner").value;
 var srSev = document.getElementById("severity").value;
 var url = updateSR;
 var xhr = new XMLHttpRequest();
 xhr.open("POST", url, true);

 xhr.setRequestHeader("comment", srUpdate);
 xhr.setRequestHeader("issue", srSummary);
 xhr.setRequestHeader("issue_level", srSev);
 xhr.setRequestHeader("issue_owner", srOwner);
 xhr.setRequestHeader("is_open", "N");
 xhr.setRequestHeader("sr_number", srNumber);

 xhr.onreadystatechange = function() { //Call a function when the state changes.
  console.log('xhr.readyState' + xhr.readyState);
  if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
   processingComplete();
   document.getElementById("hover_bkgr_fricc_srClosed").style.display = "block";//Show Confirmation Box
   //window.close(); //Close the popup
  }
 }
 xhr.send();
}