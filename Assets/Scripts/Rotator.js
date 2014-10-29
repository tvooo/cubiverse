#pragma strict

private var colli : float = -90;
function Start () {

}

function Update () {
	transform.Rotate (new Vector3 (0, colli, 0) * Time.deltaTime);
}


function OnTriggerEnter(collider : Collider) {
	colli = -colli;
}

