private var baseSphere: BaseSphere;

function Start() {
  baseSphere = GetComponent(BaseSphere);
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
    if(GetComponent(BaseSphere).pointInSphere(vectorGlobal)) {
      direction = transform.position - vectorGlobal;
      // Linear
      //newVectorGlobal = vectorGlobal + (direction * (1 - direction.magnitude / radius));
      // x^2
      newVectorGlobal = vectorGlobal + (direction * (1- Mathf.Pow(direction.magnitude / GetComponent(BaseSphere).sphereRadius, 2)));
      newVectorLocal = landscapeTransform.InverseTransformPoint(newVectorGlobal);
      vert = newVectorLocal;
      //Debug.DrawLine (vectorGlobal, newVectorGlobal, Color.red);
    }
  }

  landscape.updateMesh(vertices, fix);
}

@script RequireComponent(BaseSphere)
