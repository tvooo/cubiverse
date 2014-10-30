#pragma strict
public var speed: float = 4f;

function Start () {

}

function Update () {
	transform.Translate(new Vector3(0, 0, -5)* (Mathf.Sin(Time.time * speed) / 200 ));
}


