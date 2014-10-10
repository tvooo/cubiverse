var maxHealth: int = 100;
var currentHealth: int = 100;

function Update() {
  if(currentHealth <= 0) {
    currentHealth = 0;
    Application.LoadLevel("GameOver");
  }

  if(currentHealth > maxHealth) {
    currentHealth = maxHealth;
  }

  if(maxHealth < 1) {
    maxHealth = 1;
  }
}

function OnGUI() {
  if(GUI.Button(Rect(150, 10, 100, 30), "Gesundheit")) {

  }

  GUI.Box( Rect(120,30,100,50), "");
  GUI.Label( Rect(120,30,100,50), "Health: " + currentHealth);
}
