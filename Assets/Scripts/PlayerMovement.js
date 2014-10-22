#pragma strict

enum JumpState {Grounded, Jumped};

//public var spawnPoint: Transform;
public var currentLevel: Level;

public var turnSmoothing : float = 15f;     // A smoothing value for turning the player.
public var speedDampTime : float = 0.1f;    // The damping for the speed parameter
private var grounded: boolean = false;

public var jumpPower: float = 5.0f;
public var walkPower: float = 10f;

public var jumpState: JumpState;

private var checkPoint: Transform;

private var flickerTimeout: int;

private var jump: AnimationState;


function getUpwards() {
    if ( rigidbody.velocity.magnitude != 0) {
        return Vector3.up;
    }
    var forwardAngle = Vector3.Angle(transform.forward, Vector3.up);
    var backwardAngle = Vector3.Angle(-transform.forward, Vector3.up);
    var upAngle = Vector3.Angle(transform.up, Vector3.up);
    var downAngle = Vector3.Angle(-transform.up, Vector3.up);
    if(forwardAngle < 90) {
        // eher forward
        if(upAngle < 90) {
            // eher up
            return (upAngle < forwardAngle) ? transform.up : transform.forward;
        } else {
            // eher down
            return (downAngle < forwardAngle) ? -transform.up : transform.forward;
        }
    } else {
        // eher backward
        if(upAngle < 90) {
            // eher up
            return (upAngle < backwardAngle) ? transform.up : -transform.forward;
        } else {
            // eher down
            return (downAngle < backwardAngle) ? -transform.up : -transform.forward;
        }
    }
}

function FixedUpdate () {

}

function Update () {
    var h : float = Input.GetAxis("Walk");
    if(isGrounded())
        jumpState = JumpState.Grounded;
    if(Input.GetButtonDown("MyJump") && jumpState == JumpState.Grounded) {
        Jump();
    }
    Walk( h );
    flickerTimeout -= Time.deltaTime;
    GetComponent(Flicker).animate = flickerTimeout > 0;

    Debug.DrawLine(transform.position, (transform.position + transform.forward), Color.red);
}

function isGrounded() {
    return Physics.Raycast(transform.position, -Vector3.up, collider.bounds.extents.y + 0.1f);
}

function OnCollisionEnter(collision: Collision) {
    if (collision.other.gameObject.name == "PlaneOfDeath") {
        Debug.Log("Cubert fell down into the abyss...");
        Respawn();
    }
}

function setCheckPoint(cp: CheckPoint) {
    checkPoint = cp.transform;
}

function getLevel() {
    return currentLevel;
}

function rotate(degrees) {
    //cameraRotation-90 * parseInt(player.getLevel());
}

function getCameraRotation() {
    return currentLevel.getCameraRotation();
}

function Start() {
    rigidbody.velocity = Vector3.zero;
    rigidbody.angularVelocity = Vector3.zero;
    rigidbody.MoveRotation(Quaternion.Euler(0, 0, 90));
    checkPoint = currentLevel.getSpawnPoint();
    rigidbody.MovePosition(checkPoint.position);
    rigidbody.constraints = currentLevel.getConstraints();
    
    animation["jump"].wrapMode = WrapMode.Once;
	jump = animation["jump"];
}

function nextLevel(level: Level) {
    currentLevel = level;
    rigidbody.velocity = Vector3.zero;
    rigidbody.angularVelocity = Vector3.zero;
    rigidbody.MoveRotation(Quaternion.Euler(0, 0, 90));
    checkPoint = currentLevel.getSpawnPoint();
    rigidbody.MovePosition(checkPoint.position);
    //rigidbody.MovePosition(mh.transform.position);
    rigidbody.constraints = currentLevel.getConstraints();
    //rigidbody.constraints = RigidbodyConstraints.FreezeRotationY | RigidbodyConstraints.FreezeRotationZ | RigidbodyConstraints.FreezePositionX;
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
    animation.Play("jump");
    jumpState = JumpState.Jumped; 
} 

function Walk(horizontal : float)
{
    var movement: Vector3;
    var weakness: int;

    if(horizontal == 0f)
        return;

    weakness = isGrounded() ? 1 : 10;
    /*var movement: Vector3;
    movement.Set(horizontal, 0, 0);
    movement = movement.normalized * 6.0f * Time.deltaTime;
    rigidbody.MovePosition (transform.position + movement);*/
    movement = currentLevel.getDirection() * horizontal * walkPower / weakness;
    // Kann bisher nur Level 1 + 2
    /*movement.Set(
        0,//level == Level.Level1 ? horizontal * walkPower / weakness : 0,
        0,
        0//level == Level.Level2 ? horizontal * walkPower / weakness : 0
    );*/

    rigidbody.AddForce (movement);
}
