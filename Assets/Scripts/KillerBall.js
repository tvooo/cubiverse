function OnTriggerEnter(collider: Collider) {
  collider.GetComponent(PlayerMovement).die();
  Debug.Log(collider);
}
