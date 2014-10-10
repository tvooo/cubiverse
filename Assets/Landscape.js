public class Landscape {
  var landscape: GameObject;
  var mesh: Mesh;
  var collider: MeshCollider;
  var originalVertices: Vector3[];

  public function Landscape(ls: GameObject) {
    landscape = ls;
    mesh = landscape.GetComponent(MeshFilter).mesh;
    collider = landscape.GetComponent(MeshCollider);
    originalVertices = mesh.vertices.Clone();
    mesh.MarkDynamic();
  }

  public function suckTowards(spherePosition: Vector3, radius, fix: boolean) {
    var vertices : Vector3[] = originalVertices.Clone();
    var direction: Vector3;
    var vectorGlobal: Vector3;
    var newVectorGlobal: Vector3;
    var newVectorLocal: Vector3;

    for (var i = 0; i < vertices.Length; i++) {
      //vectorGlobal = (landscape.transform.rotation * vertices[i]) + landscape.transform.position;
      vectorGlobal = landscape.transform.TransformPoint(vertices[i]);
      //point = landscape.transform.position + vertices[i];
      if(pointInSphere(vectorGlobal, spherePosition, radius)) {
        direction = spherePosition - vectorGlobal;
        // How strong is our sucking factor?
        // Linear
        //newVectorGlobal = vectorGlobal + (direction * (1 - direction.magnitude / radius));
        // x^2
        newVectorGlobal = vectorGlobal + (direction * (1- Mathf.Pow(direction.magnitude / radius, 2)));
        //newVectorLocal = Quaternion.Inverse(landscape.transform.rotation) * (newVectorGlobal - landscape.transform.position);
        newVectorLocal = landscape.transform.InverseTransformPoint(newVectorGlobal);
        vertices[i] = newVectorLocal;
        Debug.DrawLine (vectorGlobal, spherePosition, Color.red);
      }

    }

    mesh.vertices = vertices;
    mesh.RecalculateBounds();
    collider.sharedMesh = null;
    collider.sharedMesh = mesh;
    if(fix) {
      originalVertices = vertices.Clone();
    }
  }

  function pointInSphere(pnt, sphereCenter, sphereRadius) {
    return (sphereCenter - pnt).magnitude <= sphereRadius;
  }
}
