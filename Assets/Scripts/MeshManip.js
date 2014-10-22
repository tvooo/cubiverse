/* Public variables */
var landscapeModels: GameObject[];
var gravitySpherePrefab: GameObject;
var gravitySphereIndicatorPrefab: GameObject;

/* Private variables */
private var ray: Ray;
private var hit: RaycastHit;
private var currentSphere: EffectSphere;
private var landscapes: Landscape[];

function Start() {
  /* Get landscape components */
  landscapes = new Landscape[landscapeModels.Length];

  for( var i = 0; i < landscapeModels.Length; i++ ) {
    Debug.Log(i);
    if(landscapeModels[i]) {
      landscapes[i] = (new Landscape(landscapeModels[i]));
    }
  }
}

function Update () {
  if(Input.GetButtonDown("Spawn Gravity Sphere")) {
    // spawn sphere
    currentSphere = new GravitySphere(3, Vector3.zero, gravitySpherePrefab, gravitySphereIndicatorPrefab);
  };

  if(Input.GetButtonDown("Spawn Repulsion Sphere")) {
    // spawn sphere
    currentSphere = new RepulsionSphere(3, Vector3.zero, gravitySpherePrefab, gravitySphereIndicatorPrefab);
  };

  if ( currentSphere ) {
    ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    var layerMask = 1 << 9;
    //layerMask = 0;
    if(Physics.Raycast(ray, hit, layerMask)) {
      currentSphere.move(new Vector3(hit.point.x, hit.point.y, hit.point.z));

      for( var i = 0; i < landscapes.length; i++ ) {
        if(landscapes[i] != null && landscapes[i].isVisible()) {
          //Debug.Log(currentSphere);
          currentSphere.effect(landscapes[i], Input.GetMouseButtonDown(0));
        }
      }

      /* Position sphere on mouse click */
      if(Input.GetMouseButtonDown(0)) {
        currentSphere = null;
      }
    }
  }
}
