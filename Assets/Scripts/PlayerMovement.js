#pragma strict

enum JumpState {Grounded, Jumped};

public var spawnPoint: Transform;

public var turnSmoothing : float = 15f;     // A smoothing value for turning the player.
public var speedDampTime : float = 0.1f;    // The damping for the speed parameter
private var grounded: boolean = false;

public var jumpPower: float = 5.0f;
public var walkPower: float = 10f;

public var jumpState: JumpState;

private var flickerTimeout: int;

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
    Debug.Log(flickerTimeout);
    GetComponent(Flicker).animate = flickerTimeout > 0;
}

function isGrounded() {
    return Physics.Raycast(transform.position, -Vector3.up, collider.bounds.extents.y + 0.1f);
}

function OnCollisionEnter(collision: Collision) {
    if (collision.other.gameObject.name == "PlaneOfDeath") {
        Debug.Log("TOOOOOOOOOD");
        flickerTimeout = 100;
        GetComponent(Flicker).animate = true;
        rigidbody.velocity = Vector3.zero;
        rigidbody.angularVelocity = Vector3.zero;
        rigidbody.MoveRotation(Quaternion.Euler(0, 0, 0));
        rigidbody.MovePosition(spawnPoint.position);
    }
}

function Jump() {
    var direction: Vector3;
    direction = getUpwards();
    rigidbody.AddForce(direction * jumpPower, ForceMode.Impulse);
    jumpState = JumpState.Jumped;
}

function Walk(horizontal : float)
{
    /*var movement: Vector3;
    movement.Set(horizontal, 0, 0);
    movement = movement.normalized * 6.0f * Time.deltaTime;
    rigidbody.MovePosition (transform.position + movement);*/
    if(horizontal != 0f) {
        if (isGrounded()) {
            rigidbody.AddForce (horizontal * walkPower,0,0);
        } else {
            rigidbody.AddForce (horizontal * walkPower / 10,0,0);
        }
    }
}
