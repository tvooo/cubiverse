#pragma strict

public var targetState: State;


function OnTriggerEnter(collider: Collider) {
  if(targetState) {
  	GameObject.Find("HoldGUI").GetComponent(WorldGUI).state = targetState;
  }
}