public enum MoveConstraint {
  Horizontal,
  Vertical
};

public var rotation: int = 0;
public var spawnPoint: Transform;
public var moveConstraints: MoveConstraint = MoveConstraint.Horizontal;
public var direction: Vector3 = Vector3.right;

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
