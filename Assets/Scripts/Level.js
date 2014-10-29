public enum MoveConstraint {
  Horizontal,
  Vertical
};

public enum SpawnProgress {
  Initiate,
  Position,
  Zoom,
  Fix,
  Idle
}

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
public var balls: BaseSphere[];
public var ballCounter: int;
private var landscapes: Component[];
private var spawnProgress: SpawnProgress = SpawnProgress.Idle;
private var spawnZoomInverse: boolean = true;

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

private var touchSpawning: boolean = false;

function Update() {
  var ray: Ray;
  var hit: RaycastHit;
  var hitZero: RaycastHit;
  var hitOne: RaycastHit;
  var hitVector: Vector3;
  var layerMask = 1 << 9;
  var size: float;

  if(!isActive)
    return;

  if(hasBalls() && spawnProgress == SpawnProgress.Idle && Input.GetButtonDown("Spawn Gravity Sphere")) {
    currentSphere = Instantiate(gravitySpherePrefab, Vector3.zero, Quaternion.identity).GetComponent(BaseSphere);
    addSphere(currentSphere);
    spawnProgress = SpawnProgress.Position;
  };

  if(hasBalls() && spawnProgress == SpawnProgress.Idle && repulsionSpherePrefab && Input.GetButtonDown("Spawn Repulsion Sphere")) {
    currentSphere = Instantiate(repulsionSpherePrefab, Vector3.zero, Quaternion.identity).GetComponent(BaseSphere);
    addSphere(currentSphere);
    spawnProgress = SpawnProgress.Position;
  };

  #if UNITY_ANDROID
    if (Input.touchCount == 2 && !cubert.moving) {
      // Store both touches.
      var touchZero = Input.GetTouch(0);
      var touchOne = Input.GetTouch(1);
      var rayZero: Ray = Camera.main.ScreenPointToRay(touchZero.position);
      var rayOne: Ray = Camera.main.ScreenPointToRay(touchOne.position);

      var touchZeroPrevPos = touchZero.position - touchZero.deltaPosition;
      var touchOnePrevPos = touchOne.position - touchOne.deltaPosition;

      // Find the magnitude of the vector (the distance) between the touches in each frame.
      var prevTouchDeltaMag = (touchZeroPrevPos - touchOnePrevPos).magnitude;
      var touchDeltaMag = (touchZero.position - touchOne.position).magnitude;

      // Find the position in the previous frame of each touch.
      if(hasBalls() && spawnProgress == SpawnProgress.Idle) {
        // Just started touching!
        spawnProgress = SpawnProgress.Initiate;
      }
      if(spawnProgress == SpawnProgress.Initiate && prevTouchDeltaMag > touchDeltaMag) {
        currentSphere = Instantiate(gravitySpherePrefab, Vector3.zero, Quaternion.identity).GetComponent(BaseSphere);
        addSphere(currentSphere);
        spawnProgress = SpawnProgress.Zoom;
        spawnZoomInverse = true;
      }
      if(spawnProgress == SpawnProgress.Initiate && prevTouchDeltaMag < touchDeltaMag) {
        currentSphere = Instantiate(repulsionSpherePrefab, Vector3.zero, Quaternion.identity).GetComponent(BaseSphere);
        addSphere(currentSphere);
        spawnProgress = SpawnProgress.Zoom;
        spawnZoomInverse = false;
      }
      if(spawnProgress == SpawnProgress.Zoom) {
        // Resize
        if(spawnZoomInverse) {
          //size = Mathf.Clamp(currentSphere.maxSize - touchDeltaMag / 150, 1.0, currentSphere.maxSize);
          if(Physics.Raycast(rayZero, hitZero, layerMask) && Physics.Raycast(rayOne, hitOne, layerMask)) {

            size = Mathf.Clamp(currentSphere.maxSize - ((hitZero.point - hitOne.point).magnitude / 4), 1.0, currentSphere.maxSize);
          }
        } else {
          //size = Mathf.Clamp(1 + touchDeltaMag / 150, 1.0, currentSphere.maxSize);
          if(Physics.Raycast(rayZero, hitZero, layerMask) && Physics.Raycast(rayOne, hitOne, layerMask)) {

            size = (hitZero.point - hitOne.point).magnitude / 4;
          }
        }
        currentSphere.setRadius(size);

        // Position
        var middle: Vector3 = Vector2.Lerp(touchZero.position, touchOne.position, 0.5);


        ray = Camera.main.ScreenPointToRay(middle);

        if(Physics.Raycast(ray, hit, layerMask)) {
          if(gameObject.name == "Level 1")
            hitVector = new Vector3(hit.point.x, hit.point.y, ballPositionPlane.transform.position.z);
          if(gameObject.name == "Level 2")
            hitVector = new Vector3(ballPositionPlane.transform.position.x, hit.point.y, hit.point.z);
          if(gameObject.name == "Level 3")
            hitVector = new Vector3(hit.point.x, hit.point.y, ballPositionPlane.transform.position.z);

          currentSphere.transform.position = hitVector;
        }
      }
    }
  #endif

  #if UNITY_STANDALONE
    ray = Camera.main.ScreenPointToRay(Input.mousePosition);

    if(spawnProgress == SpawnProgress.Zoom) {
      size = 1 + ((Input.mousePosition - currentSphere.resizeOrigin).magnitude / 100);
      currentSphere.setRadius(size);
    } else if(spawnProgress == SpawnProgress.Position) {
      // Moving
      if(Physics.Raycast(ray, hit, layerMask)) {
        if(gameObject.name == "Level 1")
          hitVector = new Vector3(hit.point.x, hit.point.y, ballPositionPlane.transform.position.z);
        if(gameObject.name == "Level 2")
          hitVector = new Vector3(ballPositionPlane.transform.position.x, hit.point.y, hit.point.z);
        if(gameObject.name == "Level 3")
          hitVector = new Vector3(hit.point.x, hit.point.y, ballPositionPlane.transform.position.z);

        currentSphere.transform.position = hitVector;
      }
    }
  #endif

  #if UNITY_ANDROID
    if(Input.touchCount == 0 && spawnProgress == SpawnProgress.Zoom) {
      spawnProgress = SpawnProgress.Fix;
    }
  #endif

  #if UNITY_STANDALONE
    if(Input.GetMouseButtonDown(0)) {
      currentSphere.resizeOrigin = Input.mousePosition;
      spawnProgress = SpawnProgress.Zoom;
    }
    if(spawnProgress == SpawnProgress.Zoom && Input.GetMouseButtonUp(0)) {
      spawnProgress = SpawnProgress.Fix;
    }
  #endif

  if(currentSphere) {
    for(var landscape: Component in landscapes) {
      if(currentSphere.GetComponent(GravSphere)) {
        currentSphere.GetComponent(GravSphere).effect(landscape.GetComponent(Transformable), spawnProgress == SpawnProgress.Fix);
      } else if(currentSphere.GetComponent(RepSphere)) {
        currentSphere.GetComponent(RepSphere).effect(landscape.GetComponent(Transformable), spawnProgress == SpawnProgress.Fix);
      }
    }
  }

  if(spawnProgress == SpawnProgress.Fix) {
    currentSphere = null;
    spawnProgress = SpawnProgress.Idle;
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
