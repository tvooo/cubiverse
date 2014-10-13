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

  public function update(vertices: Vector3[], fix: boolean) {
    mesh.vertices = vertices;
    mesh.RecalculateNormals();
    //yield;

    if(fix) {
      mesh.RecalculateBounds();
      mesh.RecalculateNormals();
      // Recalculating the collider is ****in' heavy on the CPU!
      collider.sharedMesh = null;
      collider.sharedMesh = mesh;

      originalVertices = vertices;
    }
  }

  public function cloneVertices() {
    return originalVertices.Clone();
  }

  public function getGameObject() {
    return landscape;
  }

  public function isVisible() {
    return landscape.GetComponent(MeshRenderer).isVisible;
  }
}
