function verifyLocalMemory(){
	console.log('verifyLocalMemory');
	var emaiStored = localStorage.getItem("ssoEm");
	if(emaiStored === null){
		
		console.log('Inside VerifyLocalMemory');
		initializeFirstLoad();
	}
	else{
		hideMailDiv();
		//initializeFirstLoad();
	}
}
function setEmail(em_text) {
  console.log('setEmail-- Inside manageStorage');
  localStorage.setItem('ssoEm', em_text);
}