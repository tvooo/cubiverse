function Start() {

}

function Update () {

}

function OnTriggerEnter(collider: Collider) {
  collider.GetComponent(PlayerMovement).setCheckPoint(this);
    //if (collision.other.gameObject.name == "PlaneOfDeath") {
        Debug.Log(collider);
      //  Respawn();
    //}
}
