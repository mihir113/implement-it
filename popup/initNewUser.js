function initializeFirstLoad(){
	
	document.getElementById("form_container").style.display = "none";
    document.getElementById("error_content").style.display = "none";
	document.getElementById("initialize_user").style.display = "block";	
	document.getElementById("hover_bkgr_fricc").style.display = "block";
	document.getElementById("hover_bkgr_fricc_error").style.display = "none";	
}

function hideMailDiv(){
	document.getElementById("form_container").style.display = "block";
    document.getElementById("error_content").style.display = "none";
	document.getElementById("initialize_user").style.display = "none";	
}

document.addEventListener("DOMContentLoaded", function (event) {  
	document.getElementById("hover_bkgr_fricc").addEventListener("click", function( event ) {
		document.getElementById("hover_bkgr_fricc").style.display = "none";
	}, false);
});
document.addEventListener("DOMContentLoaded", function (event) {  
	document.getElementById("popupCloseButton").addEventListener("click", function( event ) {
		document.getElementById("hover_bkgr_fricc").style.display = "none";
		window.close(); //Close the popup
	}, false);
});

document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnAccept").addEventListener("click", function( event ) {
		document.getElementById("hover_bkgr_fricc").style.display = "none";
	}, false);
});

document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("btnUpdateEmail").addEventListener("click", function( event ) {
	updateMail();
	}, false);
});

function updateMail(){
	var setEmail1 = document.getElementById("email_add").value.toLowerCase();
	console.log('setEmail1' + setEmail1);
	setEmail(setEmail1);
	populateSRNumber();	
	document.getElementById("form_container").style.display = "block";
	document.getElementById("initialize_user").style.display = "none";
}