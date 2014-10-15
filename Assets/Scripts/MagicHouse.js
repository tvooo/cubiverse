public var nextLevel: Level;
private var passed: boolean = false;

function Start() {

}

function Update () {

}

function OnTriggerEnter(collider: Collider) {
  if(passed)
    return;

  collider.GetComponent(PlayerMovement).nextLevel(nextLevel);
  passed = true;
  Debug.Log(collider);
}
