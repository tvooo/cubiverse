#pragma strict

function Start () {

}

function Update () {
	transform.Rotate (new Vector3 (0, -90, 0) * Time.deltaTime);
}


