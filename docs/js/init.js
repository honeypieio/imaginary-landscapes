document.addEventListener("keypress", function(event) {
  if (event.key == "m") {
    var menu = document.getElementById("settingsMenu");
    if (menu.style.display) {
      menu.style.display = "";
    } else {
      menu.style.display = "block";
    }
  }
});

// Initialises sound and/or vision.
function init() {
  document.body.addEventListener(
    "contextmenu",
    function(e) {
      e.preventDefault();
      colourscape.stopAllLoops();
      document.getElementById("scene").innerHTML = "";
      colourscape.initiateScene();
    },
    false
  );

  document.body.addEventListener(
    "click",
    function(e) {
      soundscape.stopAll(function() {
        soundscape.init();
      });
    },
    false
  );

  // Get options from URL query string.
  var urlParams = new URLSearchParams(window.location.search);
  colourscape.delay = urlParams.get("delay") || 1000;
  //var quality = urlParams.get('quality') || "lossy";
  var vision = urlParams.get("vision") || "on";
  var sound = urlParams.get("sound") || "on";

  if (vision == "on") {
    colourscape.initiateScene();
  }
  if (sound == "on") {
    soundscape.init();
  }
  if (sound != "on" && vision != "on") {
    window.location.href = "/";
  }
}

// Fisher-Yates shuffle algorithim.
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function randomInRange(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function createRandomId(obj) {
  var id = Math.random()
    .toString(36)
    .substring(7);
  if (obj[id]) {
    createRandomId(obj);
  } else {
    return id;
  }
}
