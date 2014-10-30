#pragma strict

public var sndIntro: AudioClip;
public var sndLevel1: AudioClip;

function Start() {
  //if(state == State.StartLevel1) {
    audio.Stop();
    audio.PlayOneShot(sndIntro);
    GameObject.Find("Main Camera").GetComponent(Animation).Play("Intro2");
  //}
}

function Update () {

}
