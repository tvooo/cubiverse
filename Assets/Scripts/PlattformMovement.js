﻿#pragma strict
var lala : float = 0.05;

function Start () {

}


function Update () {
	transform.Translate(-lala, 0, 0);
}

function OnTriggerEnter(collider : Collider) {
	Debug.Log("I am colliding");
	//transform.Translate(lala, 0, 0);
	lala = -lala;
	//Debug.Log("I am colliding");
}