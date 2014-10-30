// The target we are following
private var target: Transform;
var player : PlayerMovement;
// The distance in the x-z plane to the target
var distance = 10.0;
// the height we want the camera to be above the target
var height = 5.0;
// How much we
var heightDamping = 2.0;
var rotationDamping = 3.0;
var wantedRotationAngle;

function Start() {
  target = player.GetComponent(Transform);
  wantedRotationAngle = 0;//player.getCameraRotation();
}

function LateUpdate () {
  // Early out if we don't have a target
  if (!target/* || animation.isPlaying*/)
    return;

  // Calculate the current rotation angles
  wantedRotationAngle = player.getCameraRotation();

  var wantedHeight = target.position.y + height;

  var currentRotationAngle = transform.eulerAngles.y;
  var currentHeight = transform.position.y;

  // Damp the rotation around the y-axis
  currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);

  // Damp the height
  currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * Time.deltaTime);

  // Convert the angle into a rotation
  var currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);

  // Set the position of the camera on the x-z plane to:
  // distance meters behind the target
  transform.position = target.position;
  transform.position -= currentRotation * Vector3.forward * distance;

  // Set the height of the camera
  transform.position.y = currentHeight;

  // Always look at the target
  transform.LookAt (target);
}

function enablePlayerMovement() {
  player.isEnabled = true;
  //gameObject.Find("HoldGUI").GetComponent(WorldGUI).state = State.Movement;
  player.speech.Stop();
  Debug.Log(player.speech.sndLevel1);
  player.speech.PlayOneShot(player.speech.GetComponent(Speech).sndLevel1);
}
