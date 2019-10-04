var tunings = {};

tunings.settings = {
  referencePitch: 432,
  tuningSystem: "equal",
  musicalNotes: [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
  ]
};

// 12 Tone Equal Temperament
tunings.equal = {};
tunings.equal.notes = [];
tunings.equal.set = function() {
  for (j = 0; j < 12; j++) {
    tunings.equal.notes.push({
      [tunings.settings.musicalNotes[j]]:
        tunings.settings.referencePitch * Math.pow(2, (j - 9) / 12)
    });
  }
};

tunings.equal.set();

// Just Intonation
tunings.just = {};
tunings.just.notes = [];
tunings.just.set = function() {};

// Modes.

tunings.modes = {
  ionian: ["W", "W", "H", "W", "W", "W", "H"],
  dorian: ["W", "H", "W", "W", "W", "H", "W"],
  phrygian: ["H", "W", "W", "W", "H", "W", "W"],
  lydian: ["W", "W", "W", "H", "W", "W", "H"],
  mixolydian: ["W", "W", "H", "W", "W", "H", "W"],
  aeolian: ["W", "H", "W", "W", "H", "W", "W"],
  locrian: ["H", "W", "W", "H", "W", "W", "W"]
};

tunings.keys = {};
tunings.keys.set = function() {
  tunings[tunings.settings.tuningSystem].notes.forEach(function(note, i) {
    var noteName = Object.keys(note)[0];
    var frequency = note[Object.keys(note)[0]];
    Object.keys(tunings.modes).forEach(function(modeName, index) {
      var keyName = noteName + "_" + modeName;

      var notes = [];
      notes.push(frequency);

      var intervals = tunings.modes[modeName];
      var currentFreq = i;
      intervals.forEach(function(interval, index) {
        if (interval == "W") {
          currentFreq += 2;
        } else {
          currentFreq += 1;
        }

        // if currentFreq = 8, notes = 7

        if (
          currentFreq >
          tunings[tunings.settings.tuningSystem].notes.length - 1
        ) {
          currentFreq =
            currentFreq - tunings[tunings.settings.tuningSystem].notes.length;
        }

        notes.push(
          tunings[tunings.settings.tuningSystem].notes[currentFreq][
            Object.keys(
              tunings[tunings.settings.tuningSystem].notes[currentFreq]
            )[0]
          ]
        );
      });

      tunings.keys[keyName] = { notes: notes };
    });
  });
};

tunings.keys.set();

tunings.keys.getRandom = function(callback) {
  var keyKey = shuffle(Object.keys(tunings.keys))[
    Math.floor(Math.random() * shuffle(Object.keys(tunings.keys)).length)
  ];
  if (typeof key !== "function") {
    callback({ [keyKey]: tunings.keys[keyKey].notes });
  } else {
    tunings.keys.getRandom(callback);
  }
};
