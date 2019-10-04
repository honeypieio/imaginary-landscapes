// Create soundscape parent object - contains methods and configs.
var soundscape = {};

soundscape.tracks = {};
soundscape.convolvers = {};
soundscape.settings = {
  sampleRate: 44100,
  minDroneTracks: 1,
  maxDroneTracks: 16,
  minPartsPerDroneTrack: 1,
  maxPartsPerDroneTrack: 8,
  fadeOut: 5,
  oscWaveforms: ["sine", "triangle"]
};

soundscape.generateDroneTracks = function() {
  var currentMaxDroneTracks;
  if (
    Object.keys(soundscape.tracks).length < soundscape.settings.maxDroneTracks
  ) {
    currentMaxDroneTracks =
      soundscape.settings.maxDroneTracks -
      Object.keys(soundscape.tracks).length;
  } else {
    Object.keys(soundscape.tracks).length;
  }

  var numberOfTracks = randomInRange(
    soundscape.settings.minDroneTracks,
    currentMaxDroneTracks
  );

  if (isNaN(numberOfTracks)) {
    numberOfTracks = soundscape.settings.maxDroneTracks;
  }

  var tracks = Array.apply(null, Array(numberOfTracks));
  tracks.forEach(function(track) {
    var trackId = createRandomId(soundscape.tracks);
    soundscape.tracks[trackId] = {
      parts: {}
    };

    var frequency = shuffle(Object.values(soundscape.key))[0][
      randomInRange(0, shuffle(Object.values(soundscape.key))[0].length - 1)
    ];

    var parts = Array.apply(
      null,
      Array(randomInRange(1, soundscape.settings.maxPartsPerDroneTrack))
    );

    parts.forEach(function(part) {
      var partId = createRandomId(soundscape.tracks[trackId].parts);

      var oscillator = soundscape.context.createOscillator();
      oscillator.frequency.value = frequency;

      if (Math.random() >= 0.33) {
        oscillator.frequency.value =
          oscillator.frequency.value / randomInRange(2, 3);
      } else if (Math.random() <= 0.05) {
        oscillator.frequency.value = oscillator.frequency.value * 2;
      }

      oscillator.type =
        soundscape.settings.oscWaveforms[
          randomInRange(0, soundscape.settings.oscWaveforms.length - 1)
        ];

      oscillator.onended = function() {

        if (soundscape.tracks[trackId]) {
          delete soundscape.tracks[trackId].parts[partId];

          if (Object.keys(soundscape.tracks[trackId].parts).length == 0) {
            delete soundscape.tracks[trackId];
          }
        }

        if (
          Object.keys(soundscape.tracks).length <
          soundscape.settings.maxDroneTracks
        ) {
          soundscape.generateDroneTracks();
        }
      };

      var gainNode = soundscape.context.createGain();

      var now = soundscape.context.currentTime;

      var panner = new StereoPannerNode(soundscape.context, {
        pan: randomInRange(0, 2000) / 1000 - 1
      });

      var attack = randomInRange(7, 15);
      var sustain = randomInRange(4, 7);
      var release = randomInRange(7, 12);
      var preDelay = 0;
      var postDelay = 0;

      if (Math.random() >= 0.01) {
        preDelay = randomInRange(1, 5) / 10;
      }

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(
        randomInRange(1, 35) / 1000 / soundscape.settings.maxDroneTracks,
        now + preDelay + attack
      ); // Base modifier on number of tracks...
      gainNode.gain.linearRampToValueAtTime(
        0,
        now + preDelay + attack + sustain + release
      );

      oscillator.start(now + preDelay);
      oscillator.stop(now + preDelay + attack + sustain + release + 0.01);

      oscillator.connect(gainNode);
      gainNode.connect(panner);
      panner.connect(soundscape.master.reverb);

      soundscape.tracks[trackId].parts[partId] = {
        oscillator: oscillator,
        gainNode: gainNode,
        panner: panner
      };
    });
  });
};

soundscape.generateTwiddleTracks = function() {
  var twiddleTrackId = createRandomId(soundscape.tracks);
  soundscape.tracks[twiddleTrackId] = {
    parts: {}
  };
  var twiddlePartId = createRandomId(soundscape.tracks[twiddleTrackId].parts);
  soundscape.tracks[twiddleTrackId].parts[twiddlePartId] = {
    oscillator: soundscape.context.createOscillator(),
    gainNode: soundscape.context.createGain(),
    panner: soundscape.context.createStereoPanner()
  };

  var currentTime = soundscape.context.currentTime;

  for (i = 0; i < 100; i++) {
    var frequency = shuffle(Object.values(soundscape.key))[0][
      randomInRange(0, shuffle(Object.values(soundscape.key))[0].length - 1)
    ];
    if (Math.random() >= 0.33) {
      frequency = frequency / randomInRange(1, 2);
    } else if (Math.random() <= 0.05) {
      frequency = frequency * 2;
    }

    var attack = randomInRange(5, 20) / 10;
    var sustain = randomInRange(5, 20) / 10;
    var decay = randomInRange(5, 20) / 10;
    var preDelay = randomInRange(1, 15) / 10;
    var postDelay = randomInRange(1, 15) / 10;

    soundscape.tracks[twiddleTrackId].parts[
      twiddlePartId
    ].oscillator.frequency.setValueAtTime(frequency, currentTime);
    soundscape.tracks[twiddleTrackId].parts[
      twiddlePartId
    ].gainNode.gain.setValueAtTime(0, currentTime);
    soundscape.tracks[twiddleTrackId].parts[
      twiddlePartId
    ].gainNode.gain.linearRampToValueAtTime(
      randomInRange(1, 80) / 100 / soundscape.settings.maxDroneTracks,
      currentTime + preDelay + attack
    );

    soundscape.tracks[twiddleTrackId].parts[
      twiddlePartId
    ].gainNode.gain.linearRampToValueAtTime(
      0,
      currentTime + preDelay + attack + sustain + decay
    );

    soundscape.tracks[twiddleTrackId].parts[
      twiddlePartId
    ].panner.pan.setValueAtTime(randomInRange(1, 20) / 10 - 1, currentTime);

    currentTime = currentTime + attack + sustain + decay + preDelay + postDelay;
  }

  soundscape.tracks[twiddleTrackId].parts[
    twiddlePartId
  ].oscillator.onended = function() {
    delete soundscape.tracks[twiddleTrackId].parts[twiddlePartId];
    soundscape.generateTwiddleTracks();
  };

  soundscape.tracks[twiddleTrackId].parts[twiddlePartId].oscillator.start(
    soundscape.context.currentTime
  );

  soundscape.tracks[twiddleTrackId].parts[twiddlePartId].oscillator.connect(
    soundscape.tracks[twiddleTrackId].parts[twiddlePartId].gainNode
  );

  soundscape.tracks[twiddleTrackId].parts[twiddlePartId].gainNode.connect(
    soundscape.tracks[twiddleTrackId].parts[twiddlePartId].panner
  );

  soundscape.tracks[twiddleTrackId].parts[twiddlePartId].panner.connect(
    soundscape.master.reverb
  );
};

soundscape.stopAll = function(callback) {
  Object.keys(soundscape.tracks).forEach(function(trackId) {
    Object.keys(soundscape.tracks[trackId].parts).forEach(function(partId) {
      var now = soundscape.context.currentTime;

      soundscape.tracks[trackId].parts[
        partId
      ].gainNode.gain.cancelScheduledValues(now);

      soundscape.tracks[trackId].parts[
        partId
      ].oscillator.onended = function(){}

      soundscape.tracks[trackId].parts[
        partId
      ].gainNode.gain.linearRampToValueAtTime(0, now + soundscape.settings.fadeOut);
      soundscape.tracks[trackId].parts[partId].oscillator.stop(now + soundscape.settings.fadeOut + 0.01);
    });
  });
  soundscape.tracks = {}

  setTimeout(function(){
    callback();
  }, soundscape.settings.fadeOut * 1200)

};

soundscape.getConvolver = function(callback) {
  ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open("GET", "/js/soundscape/convolvers/cathedral.mp3", true);
  ajaxRequest.responseType = "arraybuffer";

  ajaxRequest.onload = function() {
    var audioData = ajaxRequest.response;
    soundscape.context.decodeAudioData(
      audioData,
      function(buffer) {
        soundscape.convolvers.cathedral = soundscape.context.createBufferSource();
        soundscape.convolvers.cathedral = buffer;
        callback();
      },
      function(e) {
        callback(e.err);
      }
    );
  };

  ajaxRequest.send();
};

soundscape.init = function() {
  // Create audio context;
  soundscape.context = new AudioContext();

  soundscape.getConvolver(function() {
    soundscape.master = {};

    soundscape.master.gainNode = soundscape.context.createGain();
    soundscape.master.gainNode.gain.setValueAtTime(
      0.6,
      soundscape.context.currentTime
    );

    soundscape.master.reverb = soundscape.context.createConvolver();
    soundscape.master.reverb.buffer = soundscape.convolvers.cathedral;

    soundscape.master.reverb.connect(soundscape.master.gainNode);
    soundscape.master.gainNode.connect(soundscape.context.destination);

    // Select key and mode.
    tunings.keys.getRandom(function(key) {
      soundscape.key = key;
      soundscape.generateDroneTracks();
      soundscape.generateTwiddleTracks();
    });
  });
};
