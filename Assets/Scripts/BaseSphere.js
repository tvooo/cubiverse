public var sphereRadius: float = 3;

function Start() {
  // Using "transform" here, because otherwise would be accessing prefab and not instance
  transform.Find("GravityBall").transform.localScale *= sphereRadius;
  transform.Find("Sphere").transform.localScale *= sphereRadius;
}

function getRadius() {
  return sphereRadius;
}

function pointInSphere(pnt) {
  return (transform.position - pnt).magnitude <= sphereRadius;
}
