public enum MoveConstraint {
  Horizontal,
  Vertical
};

/* Public variables */
public var rotation: int = 0;
public var spawnPoint: Transform;
public var moveConstraints: MoveConstraint = MoveConstraint.Horizontal;
public var direction: Vector3 = Vector3.right;
public var ballPositionPlane: GameObject;
public var checkPoints: CheckPoint[];
public var ballContingent: int = 5;
public var cubert: PlayerMovement;
public var gravitySpherePrefab: GravSphere;
public var repulsionSpherePrefab: RepSphere;
public var startState: State;

/* Private variables */
private var currentSphere: BaseSphere;
private var isActive: boolean = false;
private var balls: BaseSphere[];
private var ballCounter: int;
private var landscapes: Component[];

function Start() {
  landscapes = GetComponentsInChildren(Transformable);
  balls = new BaseSphere[ballContingent];
  ballCounter = ballContingent;
}

function resetLevel() {
  // Remove gravity balls, reset checkpoints
  if(balls) {
    for (var ball: BaseSphere in balls) {
      if(ball) {
        Debug.Log("Destroying sphere");
        Destroy(ball.gameObject);
      }
    }
  }
  ballCounter = ballContingent;

  for(var checkPoint: CheckPoint in checkPoints) {
    checkPoint.reset();
  }

  for(var landscape: Component in landscapes) {
    landscape.GetComponent(Transformable).reset();
  }

  cubert.setCheckPoint(spawnPoint);
}

function Update() {
  var ray: Ray;
  var hit: RaycastHit;

  if(!isActive)
    return;

  if(Input.GetButtonDown("Restart Level")) {
    for (var ball: BaseSphere in balls) {
      Debug.Log(ball);
    }
  }

  if(hasBalls() && Input.GetButtonDown("Spawn Gravity Sphere")) {
    Debug.Log("Spawning Gravity Sphere");
    currentSphere = Instantiate(gravitySpherePrefab, Vector3.zero, Quaternion.identity).GetComponent(BaseSphere);
    addSphere(currentSphere);
  };

  if(hasBalls() && repulsionSpherePrefab && Input.GetButtonDown("Spawn Repulsion Sphere")) {
    Debug.Log("Spawning Repulsion Sphere");
    currentSphere = Instantiate(repulsionSpherePrefab, Vector3.zero, Quaternion.identity).GetComponent(BaseSphere);
    addSphere(currentSphere);
  };

  if (currentSphere) {
    ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    var layerMask = 1 << 9;

    if(currentSphere.resizing) {
      // Resizing
      var size: float = 1 + ((Input.mousePosition - currentSphere.resizeOrigin).magnitude / 100);
      Debug.Log(size);

      currentSphere.setRadius(size);
    } else {
      // Moving
      if(Physics.Raycast(ray, hit, layerMask)) {
        currentSphere.transform.position = new Vector3(hit.point.x, hit.point.y, hit.point.z);
      }
    }

    for(var landscape: Component in landscapes) {
      if(/*isVisible()*/ true) {
        if(currentSphere.GetComponent(GravSphere)) {
          currentSphere.GetComponent(GravSphere).effect(landscape.GetComponent(Transformable), Input.GetMouseButtonUp(0));
        } else if(currentSphere.GetComponent(RepSphere)) {
          currentSphere.GetComponent(RepSphere).effect(landscape.GetComponent(Transformable), Input.GetMouseButtonUp(0));
        }

      }
    }

    /* Position sphere on mouse click */
    if(Input.GetMouseButtonDown(0)) {
      Debug.Log("Fixing sphere");
      currentSphere.resizeOrigin = Input.mousePosition;
      currentSphere.resizing = true;

    }
    if(Input.GetMouseButtonUp(0)) {
      currentSphere.resizing = false;
      currentSphere = null;

    }
  }
}

function addSphere(sphere: BaseSphere) {
  if(ballCounter <= 0)
    return;
  balls[--ballCounter] = sphere;
}

function hasBalls() {
  return ballCounter > 0;
}

function OnGUI() {
  if(isActive && GUI.Button(Rect(Screen.width - 220,10,100,30), "Reset Level")) {
    resetLevel();
    cubert.Respawn();
  }
  if(isActive) GUI.Label (Rect (10, 140, 100, 20), "Balls:" + ballCounter + "/" + ballContingent);
}


function enter() {
  // Set up collision plane for balls
  ballPositionPlane.layer = 9;
  isActive = true;
}

function leave() {
  // Tear down collision plane for balls
  ballPositionPlane.layer = 8;
  isActive = false;
}

/* Getters */

function getSpawnPoint() {
  return spawnPoint;
}

function getDirection() {
  return direction;
}

function getCameraRotation() {
  return rotation;
}

function getConstraints() {
  return moveConstraints == MoveConstraint.Horizontal ?
    (RigidbodyConstraints.FreezeRotationY | RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezePositionZ) :
    (RigidbodyConstraints.FreezeRotationY | RigidbodyConstraints.FreezeRotationZ | RigidbodyConstraints.FreezePositionX);
}
