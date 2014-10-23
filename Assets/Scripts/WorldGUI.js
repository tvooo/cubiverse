#pragma strict

public var mySkin : GUISkin;
var customIntro : GUIStyle;
var customInstruction : GUIStyle;
var customText : GUIStyle;
 

private var rctOff : RectOffset;

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
	Empty
}

public var state: State = State.StartLevel1;
private var text : String;
private var intro : String;
private var instruction : String;
public var cubert: PlayerMovement;

function Update () {
			// Level 1
	if(cubert.currentLevel.gameObject.name == "Level 1") {
		if(Input.GetKey("x")  && state == State.StartLevel1){
			state = State.Movement;
		} else if (Input.GetKey("space")  && state == State.Movement){
			state = State.Sphere;
		} else if (Input.GetKey("g")  && state == State.Sphere){
			state = State.Power;
		} else if (Input.GetKey("x") && state == State.Power){
			state = State.Checkpoint;
		}
		//Level 2
	} else if(cubert.currentLevel.gameObject.name == "Level 2" ) {
		if (state == State.House){
			state = State.StartLevel2;
		} else if(Input.GetKey("x")  && state == State.StartLevel2){
			state = State.Empty;
		}
		//Level 3	
	} else if(cubert.currentLevel.gameObject.name == "Level 3") {
		if (state == State.Killerball){
			state = State.StartLevel3;
		} else if(Input.GetKey("x")  && state == State.StartLevel3){
			state = State.Empty;
		} else if(Input.GetKey("r") && state == state.Rotation){
			state = state.Empty;
		}
	}
}




function OnCollisionEnter(collision : Collision){
	if (collision.gameObject.name == "Main21")
		state = State.Killerball;
}



function OnGUI(){
	GUI.skin = mySkin;
      
	switch(state) {
		case State.StartLevel1:
			intro = "Cuberts world was out of order. He could feel it. Something did not work as it used to. His nice, square world broke apart. He never really understood the rules of this world, they felt a little made up to him, but he was happy anyway. He needed to fix it! And he knew he could, because - Cubert had superpowers! Or - at least, powers.  Something was different about him. Whatever it was that was gone from his world and let it drift apart, it was still with him. And maybe he could share it? Spread it somehow, to put everything back into place? He would need help though. He had super powers, but he was a cube after all. <i> continue by hitting x </i>";
			GUI.Label(Rect(50, 50,Screen.width-100,Screen.height-100),intro, mySkin.customStyles[0]);
			break;
		case State.Movement:
			text = "First, he needed to get going. Start moving. For a cube, cubert was quite agile.";
			instruction = "Press <- -> to move, and space to jump.";
			break;
		case State.Sphere:
			text = "That was beautiful, wasnt it? Now, back to the powers. Maybe, if he only concentrated strong enough, and would focus all his thoughts on this one point… ";
			instruction = "Press G to spawn a gravity sphere and drag it with your cursor where you want to position it. Click to fix position.";
			break;
		case State.Power:
			text = "Yes! It worked! There it was, a beautiful materialization of gravity! Amazing! But he needed to be careful. This sphere seemed to have quite an impact on the surface he was standing on. If he wasn’t careful, he could block himself or throw himself off this island, into the vast space of the universe… Scary! He should probably practice a little more and see if he could control his powers a little better.";
			instruction= "To regulate the strength of the spheres, keep the mouse button pressed where you want to place the sphere and move the mouse.";
			break;
		case State.Checkpoint:
			text = "See, that was better. This was going pretty well! Cubert could work with that. How about… pulling down that - thing - over there? Getting that peak a little closer to earth, so he could jump over it?";
			instruction= "Use spheres to build slopes and manipulate peaks, to reach the end of the level.";
			break;
		case State.House:
			text = "Wow, this view was stunning! And what was that beautiful, shiny thing? Cubert felt very attracted to it. If he was able to reach it? He should definitly try!";
			//instruction= "";
			break;
		case State.StartLevel2:
			intro = "He made it! Cubert discovered another island. Cubert, the emporer. He liked the sound of this title. Cubert decided to continue his brave journey and to share more of his cubic awesomenes!  <i> continue by hitting x </i>"; 
			text="";
			instruction = "";
			GUI.Label(Rect((Screen.width/2)-250, (Screen.height/2)-250,500,500),intro, mySkin.customStyles[0]);
			break; 
		case State.Killerball:
			text = "But what was that over there, that black... round... thing? THAT looked nasty. Nasty and dangerous. Of course, Cubert was not afraid. He was only careful, another of his great character traits. Being careful is extential to great success. Of course, so far he was reborn quite hasselfree, but we do not want to be too reckless, do we?"; 
			break;
		case State.StartLevel3:
			intro = "Cubert was impressed by himself. He knew he was great, but his never ending thirst for adventure suprised even him. And how beautiful this world was! From here, he could see the small island he started from. He had come a long way... "; 
			text="";
			instruction = "";
			GUI.Label(Rect((Screen.width/2)-250, (Screen.height/2)-250,500,500),intro, mySkin.customStyles[0]);
			break;
		case State.Rotation:
			text = "And there was more to discover. On this island, there was more moving than just him. How exciting! Cubert was sure, he could use that to travel even further. Lets see if they would be able to carry him! Also something else was different. Cubert himself felt different. Stronger. Yes, even stronger than before. It was the type of satisfaction which goes with a new ability. He learned something new!";
			instruction = "Press R to create a repulsion sphere. You can handle them just like gravity spheres.";
			break;
		case State.Empty:
			text="";
			instruction = "";
			intro = "";
		default:
			text = "";
	}
	
	GUILayout.BeginArea(Rect(50,50,500,500));
	GUILayout.Label(text, mySkin.customStyles[1]);
	GUILayout.Label(instruction, mySkin.customStyles[2]);
	GUILayout.EndArea();

}
