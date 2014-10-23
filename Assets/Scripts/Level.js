public enum MoveConstraint {
  Horizontal,
  Vertical
};

public var rotation: int = 0;
public var spawnPoint: Transform;
public var moveConstraints: MoveConstraint = MoveConstraint.Horizontal;
public var direction: Vector3 = Vector3.right;
public var ballPositionPlane: GameObject;
public var checkPoints: CheckPoint[];
public var ballContingent: int = 5;
public var cubert: PlayerMovement;
public var gravitySpherePrefab: GravSphere;
private var currentSphere: GravSphere;

public var startState: State;
private var isActive: boolean = false;

public var balls: GravSphere[];
private var ballCounter: int = 0;
private var landscapes: Component[];

function Start() {
  landscapes = GetComponentsInChildren(Transformable);
  //resetLevel();
  balls = new GravSphere[ballContingent];
}

function resetLevel() {
  // Remove gravity balls, reset checkpoints
  if(balls) {
    for (var ball: GravSphere in balls) {
      if(ball) {
        Debug.Log("Destroying sphere");
        Destroy(ball.gameObject);
      }
    }
  }
  ballCounter = 0;

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
    for (var ball: GravSphere in balls) {
      Debug.Log(ball);
    }
  }

  if(Input.GetButtonDown("Spawn Gravity Sphere")) {
    Debug.Log("Spawing");
    currentSphere = Instantiate(gravitySpherePrefab, Vector3.zero, Quaternion.identity);
    cubert.currentLevel.addSphere(currentSphere);
  };

  if (currentSphere ) {
    ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    var layerMask = 1 << 9;
    //layerMask = 0;
    if(Physics.Raycast(ray, hit, layerMask)) {
      currentSphere.transform.position = new Vector3(hit.point.x, hit.point.y, hit.point.z);

      for(var landscape: Component in landscapes) {
        if(/*isVisible()*/ true) {
          currentSphere.effect(landscape.GetComponent(Transformable), Input.GetMouseButtonDown(0));
        }
      }

      /* Position sphere on mouse click */
      if(Input.GetMouseButtonDown(0)) {
        Debug.Log("Fixing sphere");
        currentSphere = null;
      }
    }
  }
}

function addSphere(sphere: GravSphere) {
  balls[ballCounter++] = sphere;
}

function OnGUI() {
  if(isActive && GUI.Button(Rect(10,50,100,30), "Reset Level")) {
    resetLevel();
    cubert.Respawn();
  }
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
