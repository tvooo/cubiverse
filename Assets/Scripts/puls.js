#pragma strict

function Start () {

}

function Update () {	
	transform.localScale += Vector3(0.1,0.1,0.1) * Mathf.Sin(Time.deltaTime);
}