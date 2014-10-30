#pragma strict

private var alphaFadeValue : float = 0;
private var fade : boolean = false;
public var FadeOutTexture : Texture2D;
public var ballert : Texture2D;
public var mySkin : GUISkin; 
public var sndBall: AudioClip;
public var cubert: PlayerMovement;

 

function Start () {

}

function OnTriggerEnter(collider: Collider) {
	fade = true;
	Physics.gravity = Vector3(0, 9.81, 0);
	Debug.Log ("I am triggering" + fade);
	cubert.speech.Stop();
	cubert.speech.PlayOneShot(sndBall);
}

function OnGUI(){
	GUI.skin = mySkin;
	if(fade){
		alphaFadeValue += Mathf.Clamp01(Time.deltaTime / 5);
		GUI.color = new Color(255, 255, 255, alphaFadeValue);
		GUI.DrawTexture( new Rect(0, 0, Screen.width, Screen.height ), FadeOutTexture );
		GUILayout.BeginArea(new Rect( Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2));
		GUILayout.Label("Cubert woke up and realized, he was a ball.", mySkin.customStyles[0]);
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Box(ballert);
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
	} 
	else {Debug.Log ("I am not fading");}
} 
 