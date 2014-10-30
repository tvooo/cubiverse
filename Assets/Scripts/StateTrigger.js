#pragma strict

public var targetState: State;
private var cubert: PlayerMovement;
public var snd: AudioClip;
public var triggerOnlyOnce: boolean = true;
private var triggered: boolean = false;

function Start() {
  cubert = GameObject.Find("Cubert").GetComponent(PlayerMovement);
}


function OnTriggerEnter(collider: Collider) {
  if(!triggerOnlyOnce || !triggered) {
    triggered = true;
    if(targetState) {
      GameObject.Find("HoldGUI").GetComponent(WorldGUI).state = targetState;
    }
    if(snd) {
      cubert.speech.Stop();
      cubert.speech.PlayOneShot(snd);
    }
  }

}
