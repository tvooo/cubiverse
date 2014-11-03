#pragma strict

public var offset: float = 0f;

function Start () {

}

function Update () {
	transform.Rotate (new Vector3 (0, -90, 0) * (Time.deltaTime + offset));
}


