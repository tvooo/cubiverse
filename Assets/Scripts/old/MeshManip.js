/* Public variables */
var landscapeModels: GameObject[];
var gravitySpherePrefab: GravSphere;

/* Private variables */
private var ray: Ray;
private var hit: RaycastHit;
private var currentSphere: GravSphere;
private var landscapes: Landscape[];
public var cubert: PlayerMovement;

function Start() {
  /* Get landscape components */
  landscapes = new Landscape[landscapeModels.Length];

  for( var i = 0; i < landscapeModels.Length; i++ ) {
    if(landscapeModels[i]) {
      landscapes[i] = (new Landscape(landscapeModels[i]));
    }
  }
}

function Update () {
  if(Input.GetButtonDown("Spawn Gravity Sphere")) {
    currentSphere = Instantiate(gravitySpherePrefab, Vector3.zero, Quaternion.identity);
    //cubert.currentLevel.addSphere(currentSphere);
  };

  if(Input.GetButtonDown("Spawn Repulsion Sphere")) {
    // spawn sphere
    //currentSphere = new RepulsionSphere(3, Vector3.zero, gravitySpherePrefab, gravitySphereIndicatorPrefab);
  };

  if ( currentSphere ) {
    ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    var layerMask = 1 << 9;
    //layerMask = 0;
    if(Physics.Raycast(ray, hit, layerMask)) {
      currentSphere.transform.position = new Vector3(hit.point.x, hit.point.y, hit.point.z);

      for( var i = 0; i < landscapes.length; i++ ) {
        if(landscapes[i] != null && landscapes[i].isVisible()) {
          //Debug.Log(currentSphere);
          //currentSphere.effect(landscapes[i], Input.GetMouseButtonDown(0));
        }
      }

      /* Position sphere on mouse click */
      if(Input.GetMouseButtonDown(0)) {
        currentSphere = null;
      }
    }
  }
}
