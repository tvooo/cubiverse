public class GravitySphere extends EffectSphere {
  public function GravitySphere(radius: float, position: Vector3, gravitySpherePrefab, gravitySphereIndicatorPrefab) {
    super(radius, position, gravitySpherePrefab, gravitySphereIndicatorPrefab);
  }

  public function effect(landscape: Landscape, fix: boolean) {
    if(!landscape) {
      return;
    }
    var vertices : Vector3[] = landscape.cloneVertices();
    var direction: Vector3;
    var vectorGlobal: Vector3;
    var newVectorGlobal: Vector3;
    var newVectorLocal: Vector3;
    var transform = landscape.getGameObject().transform;

    for (var vert: Vector3 in vertices) {
      vectorGlobal = transform.TransformPoint(vert);
      if(pointInSphere(vectorGlobal)) {
        direction = spherePosition - vectorGlobal;
        // Linear
        //newVectorGlobal = vectorGlobal + (direction * (1 - direction.magnitude / radius));
        // x^2
        newVectorGlobal = vectorGlobal + (direction * (1- Mathf.Pow(direction.magnitude / sphereRadius, 2)));
        newVectorLocal = transform.InverseTransformPoint(newVectorGlobal);
        vert = newVectorLocal;
        //Debug.DrawLine (vectorGlobal, newVectorGlobal, Color.red);
      }
    }

    landscape.update(vertices, fix);
  }
}
