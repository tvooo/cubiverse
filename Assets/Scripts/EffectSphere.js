public class EffectSphere extends ScriptableObject {
  var sphere: GameObject;
  var sphereIndicator: GameObject;
  var spherePosition: Vector3;
  var oldPosition: Vector3;
  var sphereRadius: float;

  public function EffectSphere(radius: float, position: Vector3, gravitySpherePrefab, gravitySphereIndicatorPrefab) {
    spherePosition = position;
    sphereRadius = radius;
    sphere = Instantiate(gravitySpherePrefab, spherePosition, Quaternion.identity);
    //sphere.layer = 8;

    sphereIndicator = Instantiate(gravitySphereIndicatorPrefab, spherePosition, Quaternion.identity);
    //sphereIndicator.layer = 8;

    sphere.transform.localScale *= sphereRadius;
    sphereIndicator.transform.localScale *= sphereRadius;
  }

  public function move( newPosition: Vector3 ) {
    oldPosition = spherePosition;
    spherePosition = newPosition;
    sphere.transform.position = spherePosition;
    sphereIndicator.transform.position = spherePosition;
  }

  public function getPosition() {
    return spherePosition;
  }

  public function getRadius() {
    return sphereRadius;
  }

  public function effect(landscape: Landscape, fix: boolean) {
  }

  protected function pointInSphere(pnt) {
    return (spherePosition - pnt).magnitude <= sphereRadius;
  }
}
