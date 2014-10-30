#pragma strict

public var mySkin : GUISkin;
var customIntro : GUIStyle;
var customInstruction : GUIStyle;
var customText : GUIStyle;


public var sndLevel2: AudioClip;
public var sndLevel3: AudioClip;
public var sndMagicHouse: AudioClip;
public var sndSuperhero: AudioClip;
public var sndDeathsphere: AudioClip;
public var sndRepsphere: AudioClip;
public var sndRepsphere2: AudioClip;

private var Look : String;
public enum State {
	Movement,
	Sphere,
	Power,
	Checkpoint,
	House,
	StartLevel1,
	StartLevel2,
	StartLevel3,
	Killerball,
	Rotation,
	Repulsion,
	PostRepulsion,
	End,
	Empty
}

public var state: State = State.Movement;
private var text : String;
private var intro : String;
private var instruction : String;
public var cubert: PlayerMovement;

function Update () {
	if(cubert.currentLevel.gameObject.name == "Level 2" ) {
		if (state == State.House){
			state = State.StartLevel2;
			cubert.speech.Stop();
			cubert.speech.PlayOneShot(sndLevel2);
		} else if(state == State.Killerball){
			state = State.Empty;
		}
		//Level 3
	} else if(cubert.currentLevel.gameObject.name == "Level 3") {
		if (state == State.Empty){
			state = State.StartLevel3;
			cubert.speech.Stop();
			cubert.speech.PlayOneShot(sndLevel3);
		}
	}
}


function OnCollisionEnter(collision : Collision){
	if (collision.gameObject.name == "StateTriggerPlane")
		state = State.Killerball;
}



function OnGUI(){
	GUI.skin = mySkin;

	switch(state) {
		case State.Movement:
			#if UNITY_ANDROID
			  instruction = "Use the soft buttons on the bottom of the screen to move and jump.";
			#endif
			#if UNITY_STANDALONE
				instruction = "Press <- -> to move, and space to jump.";
			#endif


			break;
		case State.Sphere:
			#if UNITY_ANDROID
				instruction = "Pinch two fingers towards each other to spawn and position a Gravity Sphere. The closer your fingers get, the strongers the sphere will be.";
			#endif
			#if UNITY_STANDALONE
				instruction = "Press G to spawn a Gravity Sphere. As soon as you spawned a Gravity Sphere, you can position it using your cursor. Hold the mouse button clicked and pull the cursor out to control the strength of the Sphere.";
			#endif
			break;
		case State.StartLevel3:
			#if UNITY_ANDROID
				instruction = "Pinch two fingers apart from each other to spawn and position a Repulsion Sphere. The farther apart your fingers get, the strongers the sphere will be.";
			#endif
			#if UNITY_STANDALONE
				instruction = "Press R to spawn a Repulsion Sphere. You can handle them just like Gravity Spheres.";
			#endif
			break;
		default:
			text = "";
	}

	#if UNITY_STANDALONE
		GUILayout.BeginArea(Rect(Screen.width/50,Screen.height/50,Screen.width/5,Screen.height));
	#endif

	#if UNITY_ANDROID
		GUILayout.BeginArea(Rect(Screen.width/50,Screen.height/50,Screen.width/2 - Screen.width/25,Screen.height/5));
		GUILayout.BeginHorizontal();
	#endif

	GUILayout.Label(instruction, mySkin.customStyles[0]);
	GUILayout.Label("Spheres: " + cubert.currentLevel.ballCounter + " / " + cubert.currentLevel.ballContingent, mySkin.customStyles[2]);

	#if UNITY_ANDROID
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
		GUILayout.BeginArea(Rect(Screen.width/2 + Screen.width/50,Screen.height/50,Screen.width/2 - Screen.width/25,Screen.height/5));
		GUILayout.BeginHorizontal();
	#endif
	if(GUILayout.Button("Reset Level", mySkin.customStyles[1])) {
    cubert.currentLevel.resetLevel();
    cubert.Respawn();
  }
  if(GUILayout.Button("Go to last Checkpoint", mySkin.customStyles[1])) {
  cubert.Respawn();
	}
	if(GUILayout.Button("Restart Game", mySkin.customStyles[1])) {
      cubert.restartGame();
  }

  #if UNITY_ANDROID
  	GUILayout.EndHorizontal();
  #endif

	GUILayout.EndArea();

}
