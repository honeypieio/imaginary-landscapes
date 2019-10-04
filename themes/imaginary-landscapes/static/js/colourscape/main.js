// Create colourscape parent object - contains methods and configs.
var colourscape = {};

// Settings
colourscape.delay = 1000;

// Create global scene object.
colourscape.scene = {};
colourscape.activeLoops = [];

// HSL component property names in array to make iterations more readable
colourscape.hsl = ["h", "s", "l", "a"];

colourscape.forbiddenShapeCombos = {
  background: [],
  "middle-horizontal-stripe": ["center-vertical-stripe"],
  "center-vertical-stripe": ["middle-horizontal-stripe"],
  "center-square": [],
  "left-vertical-stripe": [],
  "center-vertical-stripe-offset-top": [],
  "center-vertical-stripe-offset-bottom": [],
  "right-vertical-stripe": [],
  "middle-horizontal-stripe-offset-right": [],
  "middle-horizontal-stripe-offset-left": []
};

colourscape.shapes = Object.keys(colourscape.forbiddenShapeCombos);

// Create empty arrays for each HSL component.
colourscape.hueOptions = [];
colourscape.satOptions = [];
colourscape.lumOptions = [];
colourscape.alpOptions = [];

// Populate HSL arrays.
for (i = 0; i < 360; i++) {
  if (i >= 0 && i < 79) {
    colourscape.hueOptions.push(i);
    colourscape.hueOptions.push(i);
    colourscape.hueOptions.push(i);
  }

  if (i >= 79 && i <= 160) {
    colourscape.hueOptions.push(i);
  }

  if (i > 161) {
    colourscape.hueOptions.push(i);
    colourscape.hueOptions.push(i);
    colourscape.hueOptions.push(i);
  }

  if (i > 49 && i < 86) {
    colourscape.satOptions.push(i);
  }

  if (i >= 80 && i < 96) {
    colourscape.lumOptions.push(i);
  }

  if (i >= 10 && i <= 100) {
    colourscape.alpOptions.push(i / 100);
  }
}

// Creates scene
colourscape.generateSceneElements = function() {
  colourscape.scene.elements = {};
  var maxElements = 5; //5
  var minElements = 2; // 2
  var numberOfElements =
    Math.floor(Math.random() * (maxElements - minElements + 1)) + minElements;

  for (i = 0; i < numberOfElements; i++) {
    let element = {};

    if (i == 0) {
      element.id = "background";
      element.DOMObject = document.createElement("div");
      element.DOMObject.id = element.id;
    } else {
      element.shape = colourscape.generateShape();
      element.id = element.shape;
      element.DOMObject = document.createElement("div");
      element.DOMObject.id = element.shape;
    }

    element.DOMObject.className += " scene-element";
    document.getElementById("scene").appendChild(element.DOMObject);

    let numberOfColours = 1;

    if (Math.random() >= 0.5) {
      numberOfColours = 2;
    }

    element.colours = [];
    element.colours.numberOfColours = numberOfColours;

    for (j = 0; j < numberOfColours; j++) {
      element.colours[j] = {};
      element.colours[j].currentColour = colourscape.generateColour();
      element.colours[j].targetColour = colourscape.generateColour();

      if (element.id == "background") {
        element.colours[j].currentColour.a = 1;
        element.colours[j].targetColour.a = 1;
      } else {
        element.colours[j].currentColour.a =
          element.colours[j].currentColour.a / 3;
        element.colours[j].targetColour.a =
          element.colours[j].targetColour.a / 3;
      }
    }

    if (element.colours.length > 1) {
      element.currentAngle = colourscape.generateAngle();
      element.targetAngle = colourscape.generateAngle();
    }

    colourscape.scene.elements[element.id] = element;
  }
};

colourscape.generateShape = function() {
  let shape =
    colourscape.shapes[Math.floor(Math.random() * colourscape.shapes.length)];
  if (colourscape.scene.elements !== undefined) {
    if (colourscape.scene.elements[shape]) {
      colourscape.generateShape();
    } else {
      var forbiddenPair = false;

      Object.keys(colourscape.scene.elements).forEach(function(elementId) {
        if (elementId) {
          if (colourscape.forbiddenShapeCombos[elementId]) {
            if (colourscape.forbiddenShapeCombos[elementId].includes(shape)) {
              forbiddenPair = true;
            }
          }
        }
      });

      if (forbiddenPair == true) {
        colourscape.generateShape();
      } else {
        return shape;
      }
    }
  } else {
    return shape;
  }
};

colourscape.stopAllLoops = function() {
  for (i = 0; i < colourscape.activeLoops.length; i++) {
    clearInterval(colourscape.activeLoops[i]);
  }
};

colourscape.generateDOMId = function(elements) {
  let elementId = Math.random()
    .toString(36)
    .substring(7);
  if (elements[elementId] == undefined) {
    return elementId;
  } else {
    generateDOMId(elements);
  }
};

// Create a colour.
colourscape.generateColour = function() {
  var h, s, l, a;

  colourscape.hueOptions = shuffle(colourscape.hueOptions);
  h =
    colourscape.hueOptions[
      Math.floor(Math.random() * colourscape.hueOptions.length)
    ];

  colourscape.satOptions = shuffle(colourscape.satOptions);
  s =
    colourscape.satOptions[
      Math.floor(Math.random() * colourscape.satOptions.length)
    ];

  colourscape.lumOptions = shuffle(colourscape.lumOptions);
  l =
    colourscape.lumOptions[
      Math.floor(Math.random() * colourscape.lumOptions.length)
    ];

  colourscape.alpOptions = shuffle(colourscape.alpOptions);
  a =
    colourscape.alpOptions[
      Math.floor(Math.random() * colourscape.alpOptions.length)
    ];

  return {
    h: h,
    s: s,
    l: l,
    a: a
  };
};

// Creates an angle (for gradient CSS property)
colourscape.generateAngle = function() {
  return Math.floor(Math.random() * 180) + 1;
};

// Slowly transitions from one colour scheme to another.
colourscape.fade = function(element) {
  let fadeLoop = function() {
    let allTargetsMet = true;

    for (i = 0; i < element.colours.length; i++) {
      for (j = 0; j < colourscape.hsl.length; j++) {
        if (
          element.colours[i].currentColour[colourscape.hsl[j]] !=
          element.colours[i].targetColour[colourscape.hsl[j]]
        ) {
          allTargetsMet = false;
        }
      }
    }

    if (element.currentAngle && element.currentAngle != element.targetAngle) {
      allTargetsMet = false;
    }

    if (allTargetsMet) {
      clearInterval(intervalId);

      for (i = 0; i < element.colours.length; i++) {
        element.colours[i].targetColour = colourscape.generateColour();
      }

      if (element.colours.length > 1) {
        element.targetAngle = colourscape.generateAngle();
      }

      colourscape.fade(element);
    } else {
      if (element.currentAngle > element.targetAngle) {
        element.currentAngle -= +1;
      } else if (element.currentAngle < element.targetAngle) {
        element.currentAngle += +1;
      }

      for (i = 0; i < element.colours.length; i++) {
        let colour = element.colours[i];

        for (j = 0; j < colourscape.hsl.length; j++) {
          let hslProperty = colourscape.hsl[j];
          if (
            colour.currentColour[hslProperty] > colour.targetColour[hslProperty]
          ) {
            if (hslProperty == "a") {
              colour.currentColour[hslProperty] = Number(
                parseFloat(
                  colour.currentColour[hslProperty] - parseFloat(0.01)
                ).toFixed(2)
              );
            } else {
              colour.currentColour[hslProperty] -= +1;
            }
          } else if (
            colour.currentColour[hslProperty] < colour.targetColour[hslProperty]
          ) {
            if (hslProperty == "a") {
              colour.currentColour[hslProperty] = Number(
                parseFloat(
                  colour.currentColour[hslProperty] + parseFloat(0.01)
                ).toFixed(2)
              );
            } else {
              colour.currentColour[hslProperty] += +1;
            }
          }
        }
      }
    }
    colourscape.updateDisplay(element);
  };

  let intervalId = setInterval(fadeLoop, colourscape.delay);
  colourscape.activeLoops.push(intervalId);
};

// Updates the DOM.
colourscape.updateDisplay = function(element) {
  let colours = element.colours;
  let colourString = "";
  if (colours.length > 1) {
    if (element.id == "background") {
      colourString =
        "linear-gradient(" +
        element.currentAngle +
        "deg, hsla(" +
        colours[0].currentColour.h +
        ", " +
        colours[0].currentColour.s +
        "%, " +
        colours[0].currentColour.l +
        "%, " +
        colours[0].currentColour.a +
        "), hsla(" +
        colours[1].currentColour.h +
        ", " +
        colours[1].currentColour.s +
        "%, " +
        colours[1].currentColour.l +
        "%, " +
        colours[1].currentColour.a +
        "))";
    } else {
      colourString =
        "linear-gradient(" +
        element.currentAngle +
        "deg, hsla(" +
        colours[0].currentColour.h +
        ", " +
        colours[0].currentColour.s +
        "%, " +
        colours[0].currentColour.l +
        "%, 0" +
        "), hsla(" +
        colours[1].currentColour.h +
        ", " +
        colours[1].currentColour.s +
        "%, " +
        colours[1].currentColour.l +
        "%, " +
        colours[1].currentColour.a +
        "))";
    }
  } else {
    colourString =
      "hsla(" +
      colours[0].currentColour.h +
      ", " +
      colours[0].currentColour.s +
      "%, " +
      colours[0].currentColour.l +
      "%, " +
      colours[0].currentColour.a +
      ")";
  }

  document.getElementById(element.id).style.background = colourString;

  // Update "theme-color" meta attribute (coloured navigation bar on mobile devices).
  var header =
    document.querySelector("meta[name='theme-color']") ||
    document.createElement("meta");
  header.name = "theme-color";
  header.setAttribute(
    "content",
    "hsl(" +
      colourscape.scene.elements.background.colours[0].currentColour.h +
      ", " +
      colourscape.scene.elements.background.colours[0].currentColour.s +
      "%, " +
      colourscape.scene.elements.background.colours[0].currentColour.l +
      "%)"
  );

  // Update favicon colour.
  var canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  var ctx = canvas.getContext("2d");
  ctx.fillStyle =
    "hsl(" +
    colourscape.scene.elements.background.colours[0].currentColour.h +
    ", 60%, 80%)";
  ctx.fillRect(0, 0, 16, 16);
  var link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = canvas.toDataURL("image/x-icon");
  document.getElementsByTagName("head")[0].appendChild(link);
  document.getElementsByTagName("head")[0].appendChild(header);
};

colourscape.initiateScene = function() {
  colourscape.generateSceneElements();
  Object.keys(colourscape.scene.elements).forEach(function(elementId) {
    let element = colourscape.scene.elements[elementId];
    colourscape.updateDisplay(element);
    colourscape.fade(element);
  });
};
