#pragma strict

enum JumpState {Grounded, Jumped};

//public var spawnPoint: Transform;
public var currentLevel: Level;

public var turnSmoothing : float = 15f;     // A smoothing value for turning the player.
public var speedDampTime : float = 0.1f;    // The damping for the speed parameter
public var speech: AudioSource;
private var grounded: boolean = false;
public var sndKill: AudioClip[];
public var jumpPower: float = 5.0f;
public var walkPower: float = 10f;

public var jumpState: JumpState;
public var gui: WorldGUI;
public var isEnabled: boolean = false;

public var moving: boolean = false;

private var checkPoint: Transform;

private var flickerTimeout: int;

public var scream: AudioClip;
public var jump: AudioClip;

private var btnSize: int = Screen.height / 5;;

private var leftBtn: Rect = new Rect(10, Screen.height-10-btnSize, btnSize, btnSize);
private var rightBtn: Rect = new Rect(10+btnSize, Screen.height-10-btnSize, btnSize, btnSize);
private var jumpBtn: Rect = new Rect(Screen.width-10-btnSize, Screen.height-10-btnSize, btnSize, btnSize);

function getUpwards() {
    if ( rigidbody.velocity.magnitude != 0 || rigidbody.angularVelocity.magnitude != 0) {
        return Vector3.up;
    }
    var forwardAngle = Vector3.Angle(transform.forward, Vector3.up);
    var backwardAngle = Vector3.Angle(-transform.forward, Vector3.up);
    var upAngle = Vector3.Angle(transform.up, Vector3.up);
    var downAngle = Vector3.Angle(-transform.up, Vector3.up);
    if(forwardAngle <= 90) {
        // eher forward
        if(upAngle <= 90) {
            // eher up
            return (upAngle < forwardAngle) ? transform.up : transform.forward;
        } else {
            // eher down
            return (downAngle < forwardAngle) ? -transform.up : transform.forward;
        }
    } else {
        // eher backward
        if(upAngle <= 90) {
            // eher up
            return (upAngle < backwardAngle) ? transform.up : -transform.forward;
        } else {
            // eher down
            return (downAngle < backwardAngle) ? -transform.up : -transform.forward;
        }
    }
}

function Update () {
	if(!isEnabled)
	  return;
    var h : float = Input.GetAxis("Walk");
    var walking: boolean = false;

    if(isGrounded())
        jumpState = JumpState.Grounded;
    if(Input.GetButtonDown("MyJump") && jumpState == JumpState.Grounded) {
        Jump();
        audio.PlayOneShot(jump);
    }
    Walk( h );
    flickerTimeout -= Time.deltaTime;
    GetComponent(Flicker).animate = flickerTimeout > 0;

    Debug.DrawLine(transform.position, (transform.position + transform.forward), Color.red);
    Debug.DrawLine(transform.position, (transform.position + getUpwards()), isGrounded() ? Color.blue : Color.yellow);

    #if UNITY_ANDROID
    moving = false;
    for(var t: Touch in Input.touches) {
        var vec: Vector2 = t.position;
        vec.y = Screen.height - vec.y; // You need to invert since GUI and screen have differnet coordinate system
        if(leftBtn.Contains(vec) && !walking) {
            Walk(-1);
            walking = true;
        }
        if(rightBtn.Contains(vec) && !walking) {
            Walk(1);
            walking = true;
        }
        if(jumpBtn.Contains(vec) && jumpState == JumpState.Grounded) {
            Jump();
        }
        if(jumpBtn.Contains(vec) || leftBtn.Contains(vec) || rightBtn.Contains(vec)) {
            moving = true;
        }
    }
    #endif
}

function isGrounded() {
    return Physics.Raycast(transform.position, -Vector3.up, collider.bounds.extents.y + 0.1f)/* && (rigidbody.velocity.y <= 1f)*/;
}

function OnCollisionEnter(collision: Collision) {
    if (collision.other.gameObject.name == "PlaneOfDeath") {
        die();
    }
}

function setCheckPoint(cp: Transform) {
    checkPoint = cp;
}

function getLevel() {
    return currentLevel;
}

function getCameraRotation() {
    return currentLevel.getCameraRotation();
}

function Start() {
    Random.seed = 42;
    rigidbody.velocity = Vector3.zero;
    rigidbody.angularVelocity = Vector3.zero;
    //rigidbody.MoveRotation(Quaternion.Euler(0, 0, 90));
    rigidbody.MoveRotation(Quaternion.Euler(0, currentLevel.rotation, 0));
    checkPoint = currentLevel.getSpawnPoint();
    currentLevel.enter();
    rigidbody.MovePosition(checkPoint.position);
    rigidbody.constraints = currentLevel.getConstraints();
}

function nextLevel(level: Level) {
    currentLevel.leave();
    currentLevel = level;
    currentLevel.enter();
    rigidbody.velocity = Vector3.zero;
    rigidbody.angularVelocity = Vector3.zero;
    rigidbody.MoveRotation(Quaternion.Euler(0, 0, 0));
    checkPoint = currentLevel.getSpawnPoint();
    rigidbody.MovePosition(checkPoint.position);
    rigidbody.constraints = currentLevel.getConstraints();
}

function die() {
    var kill: int = Mathf.Round(Random.Range(0, sndKill.Length-1));
    speech.Stop();
    Debug.Log(kill);
    speech.PlayOneShot(sndKill[ kill ]);
    Respawn();
}

function Respawn() {
    flickerTimeout = 100;
    GetComponent(Flicker).animate = true;
    rigidbody.velocity = Vector3.zero;
    rigidbody.angularVelocity = Vector3.zero;
    rigidbody.MoveRotation(Quaternion.Euler(0, 0, 0));
    rigidbody.MovePosition(checkPoint.transform.position);
}

 function Jump() {
     var direction: Vector3;
    direction = getUpwards();
    rigidbody.AddForce(direction * jumpPower, ForceMode.Impulse);
    jumpState = JumpState.Jumped;
}

function Walk(horizontal : float)
{
    var movement: Vector3;
    var weakness: int;

    if(horizontal == 0f)
        return;

    weakness = isGrounded() ? 1 : 10;
    movement = currentLevel.getDirection() * horizontal * walkPower / weakness;
    rigidbody.AddForce (movement);
}

function restartGame() {
    var firstLevel: Level = GameObject.Find("Level 1").GetComponent(Level);
    var secondLevel: Level = GameObject.Find("Level 2").GetComponent(Level);
    var thirdLevel: Level = GameObject.Find("Level 3").GetComponent(Level);

    thirdLevel.resetLevel();
    thirdLevel.leave();
    secondLevel.resetLevel();
    secondLevel.leave();
    firstLevel.resetLevel();
    firstLevel.enter();
    currentLevel = firstLevel;

    rigidbody.velocity = Vector3.zero;
    rigidbody.angularVelocity = Vector3.zero;
    rigidbody.MoveRotation(Quaternion.Euler(0, 0, 0));
    rigidbody.MovePosition(checkPoint.position);
    rigidbody.constraints = currentLevel.getConstraints();

    Respawn();
}

