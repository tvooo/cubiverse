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
			// Level 1
	if(cubert.currentLevel.gameObject.name == "Level 1") {
		/*if(Input.GetKey("x")  && state == State.StartLevel1){
			state = State.Movement;
			cubert.speech.Stop();
			cubert.speech.PlayOneShot(sndLevel1);
		} else*/ if (Input.GetKey("space")  && state == State.Movement){
			state = State.Sphere;
			cubert.speech.Stop();
			cubert.speech.PlayOneShot(sndSuperhero);
		}/* else if (Input.GetKey("g")  && state == State.Sphere){
			cubert.speech.Stop();
			cubert.speech.PlayOneShot(sndCubifly);
			state = State.Power;
		} else if (Input.GetKey("g") && state == State.Power){
			state = State.Checkpoint;
			cubert.speech.Stop();
			cubert.speech.PlayOneShot(sndEnergy);
		}*/
		//Level 2
	} else if(cubert.currentLevel.gameObject.name == "Level 2" ) {
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
		}/* else if(state == State.Repulsion){
			state = State.PostRepulsion;
		} else if(Input.GetKey("r") && state == state.PostRepulsion){
			state = state.Empty;
			cubert.speech.Stop();
			cubert.speech.PlayOneShot(sndRepsphere2);
		}*/
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
			instruction = "Press <- -> to move, and space to jump.";
			break;
		case State.Sphere:
			instruction = "Press G to spawn a gravity sphere. As soon as you spawned a gravity sphere, you can position it using your cursor. Hold the mouse button clicked and pull the cursor out to control the strength of the sphere.";
			break;
		case State.StartLevel3:
			instruction = "Press R to create a repulsion sphere. You can handle them just like gravity spheres.";
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
