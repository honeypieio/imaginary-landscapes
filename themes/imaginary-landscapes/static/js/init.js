var urlParams = new URLSearchParams(window.location.search);

// Initialises sound and/or vision.
function init() {
  document.body.addEventListener(
    "contextmenu",
    function(e) {
      e.preventDefault();
      colourscape.stopAllLoops();
      document.getElementById("scene").innerHTML = "";
      colourscape.initiateScene();
      console.log("Colourscape initiated");
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

  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);
  var xDown = null;
  var yDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        soundscape.stopAll(function() {
          soundscape.init();
        });
      } else {
        colourscape.stopAllLoops();
        document.getElementById("scene").innerHTML = "";
        colourscape.initiateScene();
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
      } else {
        /* down swipe */
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }

  // Get options from URL query string.
  //colourscape.delay = urlParams.get("delay") || 1000;
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

function randomInRange(min, max, isInt = true) {
  var rand =
    Math.random() < 0.5
      ? (1 - Math.random()) * (max - min) + min
      : Math.random() * (max - min) + min;
  var power = Math.pow(10, 10);
  if (isInt) {
    return Math.floor((rand * power) / power);
  } else {
    return Math.floor(rand * power) / power;
  }
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
