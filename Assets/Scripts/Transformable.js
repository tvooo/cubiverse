#pragma strict

private var mesh: Mesh;
private var coll: MeshCollider;
private var originalVertices: Vector3[];
private var currentVertices: Vector3[];

function Start() {
  mesh = GetComponent(MeshFilter).mesh;
  coll = GetComponent(MeshCollider);
  originalVertices = mesh.vertices.Clone();
  currentVertices = originalVertices.Clone();
  mesh.MarkDynamic();
}

function updateMesh(vertices: Vector3[], fix: boolean) {
  mesh.vertices = vertices;
  mesh.RecalculateNormals();

  if(fix) {
    mesh.RecalculateBounds();
    mesh.RecalculateNormals();
    // Recalculating the collider is ****in' heavy on the CPU!
    coll.mesh = null;
    coll.mesh = mesh;

    currentVertices = vertices;
  }
}

function reset() {
  updateMesh(originalVertices.Clone(), true);
}

function cloneVertices() {
  return currentVertices.Clone();
}

function isVisible() {
  return GetComponent(MeshRenderer).isVisible;
}

@script RequireComponent(MeshCollider)
