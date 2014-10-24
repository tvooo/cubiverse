public var sphereRadius: float = 1;

public var resizing: boolean = false;
public var resizeOrigin: Vector3 = Vector3.zero;

function Start() {
  // Using "transform" here, because otherwise would be accessing prefab and not instance
  /*transform.Find("GravityBall").transform.localScale *= sphereRadius;
  transform.Find("Sphere").transform.localScale *= sphereRadius;*/
}

function getRadius() {
  return sphereRadius;
}

function pointInSphere(pnt) {
  return (transform.position - pnt).magnitude <= sphereRadius;
}

function setRadius(radius: float) {
  if(radius > 4)
    radius = 4;
  sphereRadius = radius;
  transform.localScale = Vector3.one * radius;
}
