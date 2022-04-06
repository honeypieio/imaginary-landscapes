// Controls: speed, warmth, quality, plink-plonk, thiccness

// Default controls
const controls = {
  plinkPlonk: { value: 5, min: 0, max: 9 },
  quality: { value: 5, min: 0, max: 9 },
  speed: { value: 5, min: 0, max: 9 },
  thiccness: { value: 5, min: 0, max: 9 },
  warmth: { value: 5, min: 0, max: 9 }
}

let key;
let control;

// TODO
// Remove or rework min/max values? as can only change to single digit, also is 0 actually lower than 1?
// Add keypress to draw current values on visualisation

const setupControlListeners = function() {
  document.addEventListener("keydown", function (e) {
    const eventObject = window.event ? event : e

    key = e.keyCode;

    switch(key) {
	/* p */	case 80:
      control = "plinkPlonk";
			break;
	/* q */	case 81:
			control = "quality";
			break;
	/* s */	case 83:
			control = "speed";
			break;
	/* t */	case 84:
			control = "thiccness";
			break;
	/* w */	case 87:
			control = "warmth";
      break;
  /* . */ case 190:
      toggleSettingsDialog();
      break;
		default:
		  //anything else into control func, let it sort
			modifyControl(control,key);
			break;
	}

  }, false);

//might need this in future
/*
  document.addEventListener("keyup", function (e) {
      keys[e.keyCode]=false;
      stop();
  }, false);
*/

}

  // TODO
  // Add code to modify state program
  // fix speed visualisation
  // tell Isy what state program is

const modifyControl = function(control, value) {
  let adjValue = value - 48 	//adjust value by offset

  //if not num key, gtfo
  if((adjValue > 9) || (adjValue < 0)){
	  return;
  }

  controls[control].value = (adjValue);
  
  if(control == "speed") {
    const delay = 1900 - (controls[control].value * 200);
    colourscape.resetFadeDelay(delay);
  }

  updateSettingsDialog(false);
}

let settingsDialogOpen = false;
let settingsDialog = document.getElementById("settingsDialog");

const updateSettingsDialog = function(create = false) {
  Object.keys(controls).forEach(function(control) {
    let controlValue, controlLine;
    if(create) {
      if(!document.getElementById("settingsDialog")) {
        settingsDialog = document.createElement("div");
        settingsDialog.id = "settingsDialog";
        document.body.appendChild(settingsDialog);
      }

      settingsDialog = document.getElementById("settingsDialog");
      controlLine = document.createElement("p");
      controlLine.textContent = control + ": ";
      
      controlValue = document.createElement("span");
      controlValue.id = control + "_control";
    } else {
      controlValue = document.getElementById(control + "_control");
    }
    
    controlValue.textContent = controls[control].value;

    if(create) {
      controlLine.appendChild(controlValue);
      settingsDialog.appendChild(controlLine);
    }
  });
}

const toggleSettingsDialog = function() {
  if(settingsDialogOpen) {
    settingsDialog.style.display = "none";
    settingsDialogOpen = false;
  } else {
    settingsDialog.style.display = "block";
    settingsDialogOpen = true;
  }
}
