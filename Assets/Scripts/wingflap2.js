#pragma strict

private var colli : float = -90;
public var speed: float = 4f;
function Start () {

}

function Update () {
	transform.Rotate (new Vector3 (0, -90, 0) *  (Mathf.Sin(Time.time * speed) / 25 ));
}


function OnTriggerEnter(collider : Collider) {
	Debug.Log("I am colliding");
	//transform.Translate(lala, 0, 0);
	colli = -colli;
	//Debug.Log("I am colliding");
}

