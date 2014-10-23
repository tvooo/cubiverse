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
      distance = (vectorGlobal - transform.position);
      normal = distance.normalized * GetComponent(BaseSphere).sphereRadius;
      direction = normal - (vectorGlobal - transform.position);
      newVectorGlobal = vectorGlobal + (direction * (1 - Mathf.Pow(distance.magnitude / GetComponent(BaseSphere).sphereRadius, 2)));
      newVectorLocal = landscapeTransform.InverseTransformPoint(newVectorGlobal);
      vert = newVectorLocal;
      //Debug.DrawLine (vectorGlobal, newVectorGlobal, Color.red, 5);
    }
  }

  landscape.updateMesh(vertices, fix);
}

@script RequireComponent(BaseSphere)
