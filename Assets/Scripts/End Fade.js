#pragma strict

private var alphaFadeValue : float = 0;
private var fade : boolean = false;
public var FadeOutTexture : Texture2D;
public var mySkin : GUISkin; 
 

function Start () {

}

function OnTriggerEnter(collider: Collider) {
	fade = true;
	Physics.gravity = Vector3(0, -1.0, 0);
	Debug.Log ("I am triggering" + fade);
}

function OnGUI(){
	GUI.skin = mySkin;
	if(fade){
		alphaFadeValue += Mathf.Clamp01(Time.deltaTime / 5); 
		GUI.color = new Color(0, 0, 0, alphaFadeValue);
		GUI.DrawTexture( new Rect(0, 0, Screen.width, Screen.height ), FadeOutTexture );
		GUI.color = new Color(255, 255, 255, alphaFadeValue);
		GUI.Label(Rect( Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "Cubert woke up and realized, he was a ball.", mySkin.customStyles[0]);
	} 
	else {Debug.Log ("I am not fading");}
} 
 