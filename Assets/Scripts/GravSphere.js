public var sphereRadius: float = 3;

function Start() {
  // Using "transform" here, because otherwise would be accessing prefab and not instance
  transform.Find("GravityBall").transform.localScale *= sphereRadius;
  transform.Find("Sphere").transform.localScale *= sphereRadius;
}

function getRadius() {
  return sphereRadius;
}

function effect(landscape: Transformable, fix: boolean) {
  if(!landscape) {
    return;
  }
  var vertices : Vector3[] = landscape.cloneVertices();
  var direction: Vector3;
  var vectorGlobal: Vector3;
  var newVectorGlobal: Vector3;
  var newVectorLocal: Vector3;
  var landscapeTransform = landscape.transform;

  for (var vert: Vector3 in vertices) {
    vectorGlobal = landscapeTransform.TransformPoint(vert);
    if(pointInSphere(vectorGlobal)) {
      direction = transform.position - vectorGlobal;
      // Linear
      //newVectorGlobal = vectorGlobal + (direction * (1 - direction.magnitude / radius));
      // x^2
      newVectorGlobal = vectorGlobal + (direction * (1- Mathf.Pow(direction.magnitude / sphereRadius, 2)));
      newVectorLocal = landscapeTransform.InverseTransformPoint(newVectorGlobal);
      vert = newVectorLocal;
      //Debug.DrawLine (vectorGlobal, newVectorGlobal, Color.red);
    }
  }

  landscape.updateMesh(vertices, fix);
}

function pointInSphere(pnt) {
  return (transform.position - pnt).magnitude <= sphereRadius;
}
