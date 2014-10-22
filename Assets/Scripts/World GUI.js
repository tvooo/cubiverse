#pragma strict

public var mySkin : GUISkin;
private var text1  : boolean = true;
private var text2 : boolean = false;
private var text3 : boolean = false;
private var text4 : boolean = false;
private var text5 : boolean = false;
private var checkCollider : boolean = false;


var text : String; 


function Start () {

}

function Update () {


	if(Input.GetKey ("space") && text1){
		text1 = false;
		text2 = true;
	} else if (Input.GetKey ("g")&& text2){
		text2 = false;
		text3 = true;
	} else if (Input.GetKey ("x") && text3){
		text3 = false;
		text4 = true;
	} /*else if (checkCollider && text4){
		text4 = false;
		text5 = true;
	}*/
}

 function OnTriggerEnter(collider : Collider){	
		text4 = false;
		text5 = true;
} 

function OnGUI(){
	GUI.skin = mySkin;
	
	if (text1){
		text = "Cuberts world was out of order. He could feel it. Something did not work as it used to. His nice, square world broke apart. He never really understood the rules of this world, they felt a little made up to him, but he was happy anyway. He needed to fix it! And he knew he could, because - Cubert had superpowers! Or - at least, powers. Something was different about him. Whatever it was that was gone from his world and let it drift apart, it was still with him. And maybe he could share it? Spread it somehow, to put everything back into place? He would need help though. He had super powers, but he was a cube after all. First, he needed to get going. Start moving. For a cube, cubert was quite agile. \n\n <i>Press <- -> to move, and space to jump.</i>";
	} else if (text2){
		text = "That was beautiful, wasnt it? Now, back to the powers. Maybe, if he only concentrated strong enough, and would focus all his thoughts on this one point… \n\n <i> Press G to spawn a gravity sphere </i>";
	} else if (text3){
		text = "Yes! It worked! There it was, a beautiful materialization of gravity! Amazing! But he needed to be careful. This sphere seemed to have quite an impact on the surface he was standing on. If he wasn’t careful, he could block himself or throw himself off this island, into the vast space of the universe… Scary! He should probably practice a little more and see if he could control his powers a little better.\n\n <i> Hold X to control strength and radius of the gravity sphere </i>";
	} else if (text4){
		text = "See, that was better. This was going pretty well! Cubert could work with that. How about… pulling down that - thing - over there? Getting that peak a little closer to earth, so he could jump over it? \n\n <i> As soon as you spawned a gravity sphere, you can position it using your cursor </i>";
	} else if (text5){
		text = "Wow, this view was stunning! And what was that beautiful, shiny thing? Cubert felt very attracted to it. If he was able to reach it? He should definitly try!";
	}
		
	GUI.Label(Rect(50,60,700,500), text);

}
