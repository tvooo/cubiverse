private var passed: boolean = false;

function OnTriggerEnter(collider: Collider) {
  if(passed)
    return;
  collider.GetComponent(PlayerMovement).setCheckPoint(this.transform);
  passed = true;
  Debug.Log(collider);
}

function reset() {
  passed = false;
}
