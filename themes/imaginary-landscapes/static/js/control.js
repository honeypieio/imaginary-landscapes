// Controls: speed, warmth, quality, plink-plonk, thichness

// Default controls
const controls = {
  speed: { value: 5, min: 1, max: 10 },
  warmth: { value: 5, min: 1, max: 10 },
  quality: { value: 5, min: 1, max: 10 },
  plinkPlonk: { value: 5, min: 1, max: 10 },
  thiccness: { value: 5, min: 1, max: 10 }
}

let keys;

const setupControlListeners = function() {
  document.addEventListener("keydown", function (e) {
    const eventObject = window.event ? event : e
    
    keys = (keys || []);
    keys[e.keyCode] = true;

    // Speed s and arrow keys
    if(keys[83] && keys[38]) {
      modifyControl("speed", "up");
    } else if(keys[83] && keys[40]) {
      modifyControl("speed", "down");
    }

    // Warmth - w and arrow keys
    if(keys[87] && keys[38]) {
      modifyControl("warmth", "up");
    } else if(keys[87] && keys[40]) {
      modifyControl("warmth", "down");
    }

    // Quality - q and arrow keys
    if(keys[81] && keys[38]) {
      modifyControl("quality", "up");
    } else if(keys[81] && keys[40]) {
      modifyControl("quality", "down");
    }

    // Thiccness - t and arrow keys
    if(keys[84] && keys[38]) {
      modifyControl("thiccness", "up");
    } else if(keys[84] && keys[40]) {
      modifyControl("thiccness", "down");
    }

    // Plink plonk - p and arrow keys
    if(keys[80] && keys[38]) {
      modifyControl("plinkPlonk", "up");
    } else if(keys[80] && keys[40]) {
      modifyControl("plinkPlonk", "down");
    }
  }, false);

  document.addEventListener("keyup", function (e) {
      keys[e.keyCode]=false;
      stop();
  }, false);
}

const modifyControl = function(control, direction) {
  const controlToModify = controls[control];
  if(direction == "up" && controlToModify.value < controlToModify.max) {
    controls[control].value++;
  }

  if(direction == "down" && controlToModify.value > controlToModify.min) {
    controls[control].value--;
  }

  if(control == "speed") {
    console.log("Updated speed");
    const delay = controls[control].value * 200;
    colourscape.resetFadeDelay(delay);
  }
} 
