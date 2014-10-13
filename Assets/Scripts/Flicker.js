
  public var animate: boolean = true;

  public var tickTime: float = .1f;  //Time in seconds per 'tick' (.1 = .1sec full alpha, .1sec reduced alpha, .1sec full, etc)
  public var alphaScale: float = .3f;  //How transparent are the 'faded' ticks?

  var timeout: float = 0;        //timer to keep track of current time this tick.
  var fullAlpha: float = 1;      //Keep track of full alpha. We will grab this info from the material on start.
  var full: boolean = true;       //Flag to keep track of if we should use the full or reduced alpha

  function Start() {
    fullAlpha = renderer.material.color.a;
    timeout = 0;
    full = true;
  }

  function Update() {
    var c: Color = renderer.material.color;
    c.a = fullAlpha;

    //Is the effect animating?
    if (animate) {
      //Accumulate time into the timer
      timeout += Time.deltaTime;

      //Process all ticks that would have happened over the deltaTime
      //(incase of a delay, we don't want it to instantly flip for a few frames)
      while (timeout > tickTime) {
        timeout -= tickTime;
        full = !full;
        //Subtract the time for that tick, and flip the fade flag.
      }

      //If we are not full this frame, set the reduced alpha value.
      if (!full) {
        c.a *= alphaScale;
      }

    }

    //This will apply the full alpha if we are not animating,
    //And then partial alpha half the time if we are.
    renderer.material.color = c;
  }
