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

// Just Intonation
tunings.just = {};
tunings.just.notes = [];
tunings.just.set = function() {};

// Scales.

tunings.scales = {
  majorHeptatonic: [2, 2, 1, 2, 2, 2, 1],
  majorHeptatonic: [2, 1, 2, 2, 1, 2, 2],
  majorPentatonic: [2, 2, 3, 2, 3],
  minorPentatonic: [3, 2, 2, 3, 2],
  wholeTone: [2, 2, 2, 2, 2, 2]
};

tunings.keys = {};
tunings.keys.set = function() {
  tunings[tunings.settings.tuningSystem].notes.forEach(function(note, i) {
    var noteName = Object.keys(note)[0];
    var frequency = note[Object.keys(note)[0]];
    Object.keys(tunings.scales).forEach(function(modeName, index) {
      var keyName = noteName + "_" + modeName;

      var notes = [];
      notes.push(frequency);

      var intervals = tunings.scales[modeName];
      var currentFreq = i;
      intervals.forEach(function(interval, index) {
        currentFreq += interval;
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

tunings.keys.getRandom = function(key = null, scale = null, callback) {
  var keyKey;
  if (key && scale) {
    keyKey = key + "_" + scale;
  } else if (key && !scale) {
    keyKey =
      key +
      "_" +
      shuffle(Object.keys(tunings.scales))[
        Math.floor(Math.random() * Object.keys(tunings.scales).length)
      ];
  } else if (!key && scale) {
    keyKey =
      shuffle(tunings.settings.musicalNotes)[
        Math.floor(Math.random() * tunings.settings.musicalNotes.length)
      ] +
      "_" +
      scale;
  } else {
    keyKey = shuffle(Object.keys(tunings.keys))[
      Math.floor(Math.random() * shuffle(Object.keys(tunings.keys)).length)
    ];
  }

  if (typeof key !== "function") {
    if (tunings.keys[keyKey]) {
      callback({ [keyKey]: tunings.keys[keyKey].notes });
    } else {
      tunings.keys.getRandom(null, null, callback);
    }
  } else {
    tunings.keys.getRandom(key, scale, callback);
  }
};

tunings.init = function(callback) {
  tunings.equal.set();
  tunings.keys.set();
  callback();
};
