//Retrieve the Endpoints
function getURLFromFile() {
	console.log('getURLFromFile');
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var responseText = JSON.parse(xhr.responseText);
				getSR = responseText.getSR;
				updateSR = responseText.updateSR;
				createSR = responseText.createSR;
				getProject = responseText.getProject;
			} else {
				document.getElementById("hover_bkgr_fricc_error").style.display = "block";
			}
		}
	}
	xhr.open("GET", browser.extension.getURL('/popup/url.json'), true);
	xhr.send();
}