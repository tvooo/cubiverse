#pragma strict

public var sizeFactor: float = 0.8f;
public var speed: float = 4f;

function Update () {
	transform.localScale += Vector3(sizeFactor, sizeFactor, sizeFactor) * (Mathf.Sin(Time.time * speed) / 100 );
}
