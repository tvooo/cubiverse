#pragma strict

private var colli : float = 90;

function Start () {

}

function Update () {
	transform.Rotate (new Vector3 (0, 0, colli) * Time.deltaTime);
}

function OnTriggerEnter(collider : Collider) {
	Debug.Log("I am colliding");
	//transform.Translate(lala, 0, 0);
	colli = -colli;
	//Debug.Log("I am colliding");
}
