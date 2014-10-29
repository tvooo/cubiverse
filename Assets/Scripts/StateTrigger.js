#pragma strict

public var targetState: State;
private var cubert: PlayerMovement;
public var snd: AudioClip;

function Start() {
  cubert = GameObject.Find("Cubert").GetComponent(PlayerMovement);
}


function OnTriggerEnter(collider: Collider) {
  if(targetState) {
  	GameObject.Find("HoldGUI").GetComponent(WorldGUI).state = targetState;
    cubert.speech.Stop();
    cubert.speech.PlayOneShot(snd);
  }
}
