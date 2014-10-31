#pragma strict

private var alphaFadeValue : float = 0;
public var FadeInTexture : Texture2D;
public var mySkin : GUISkin; 
public var speed: float = 4f;

 

function Start () {

}


function OnGUI(){
	GUI.skin = mySkin;
	alphaFadeValue += Mathf.Clamp01(Time.deltaTime / 100);
	GUI.color = new Color(255, 255, 255, alphaFadeValue);
	GUI.DrawTexture( new Rect(50, 50, Screen.width-100, Screen.height-100 ), FadeInTexture );
} 
 