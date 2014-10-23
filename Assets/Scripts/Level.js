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

private var test = {
  "Movement": "hallo",
  "b": "hallo"
};

private var balls;

function Start() {
  resetLevel();
}

function resetLevel() {
  // Remove gravity balls, reset checkpoints
  //balls =
}

function enter() {
  // Set up collision plane for balls
  ballPositionPlane.layer = 9;
}

function leave() {
  // Tear down collision plane for balls
  ballPositionPlane.layer = 8;
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
