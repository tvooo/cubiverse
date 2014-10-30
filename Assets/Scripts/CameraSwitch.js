var MainCamera : Camera; 
var IntroCamera : Camera;

function Start(){ 
	MainCamera.enabled = false; 
	IntroCamera.enabled = true;
}

function Switch(){ 
	MainCamera.enabled = true; 
	IntroCamera.enabled = false;
}