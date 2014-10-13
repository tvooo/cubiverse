public class RepulsionSphere extends EffectSphere {
  public function RepulsionSphere(radius: float, position: Vector3, gravitySpherePrefab, gravitySphereIndicatorPrefab) {
    super(radius, position, gravitySpherePrefab, gravitySphereIndicatorPrefab);
  }

  public function effect(landscape: Landscape, fix: boolean) {
    var vertices : Vector3[] = landscape.cloneVertices();
    var direction: Vector3;
    var vectorGlobal: Vector3;
    var newVectorGlobal: Vector3;
    var newVectorLocal: Vector3;
    var distance: Vector3;
    var normal: Vector3;
    var transform = landscape.getGameObject().transform;

    for (var vert: Vector3 in vertices) {
      vectorGlobal = transform.TransformPoint(vert);
      if(pointInSphere(vectorGlobal)) {
        distance = (vectorGlobal - spherePosition);
        normal = distance.normalized * sphereRadius;
        direction = normal - (vectorGlobal - spherePosition);
        newVectorGlobal = vectorGlobal + (direction * (1 - Mathf.Pow(distance.magnitude / sphereRadius, 2)));
        newVectorLocal = transform.InverseTransformPoint(newVectorGlobal);
        vert = newVectorLocal;
        Debug.DrawLine (vectorGlobal, newVectorGlobal, Color.red, 5);
      }
    }

    landscape.update(vertices, fix);
  }
}
