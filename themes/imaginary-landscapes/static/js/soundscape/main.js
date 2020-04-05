// Create soundscape parent object - contains methods and configs.
var soundscape = {};

soundscape.tracks = {};
soundscape.convolvers = {};
soundscape.settings = {};

soundscape.generateDroneTracks = function() {
  var currentMaxDroneTracks;
  if (
    Object.keys(soundscape.tracks).length < soundscape.settings.drone.tracks.max
  ) {
    currentMaxDroneTracks =
      soundscape.settings.drone.tracks.max -
      Object.keys(soundscape.tracks).length;
  } else {
    currentMaxDroneTracks = Object.keys(soundscape.tracks).length;
  }

  var numberOfTracks = randomInRange(
    soundscape.settings.drone.tracks.min,
    currentMaxDroneTracks
  );

  if (isNaN(numberOfTracks)) {
    numberOfTracks = soundscape.settings.drone.tracks.max;
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
      Array(
        randomInRange(
          soundscape.settings.drone.parts.min,
          soundscape.settings.drone.parts.max
        )
      )
    );

    parts.forEach(function(part) {
      var partId = createRandomId(soundscape.tracks[trackId].parts);

      var oscillator = soundscape.context.createOscillator();
      oscillator.frequency.value = frequency;

      if (
        Math.random() <=
        soundscape.settings.drone.changeOctave.down.chance / 100
      ) {
        oscillator.frequency.value =
          oscillator.frequency.value /
          randomInRange(
            soundscape.settings.drone.changeOctave.down.min,
            soundscape.settings.drone.changeOctave.down.max
          );
      } else if (
        Math.random() <=
        soundscape.settings.drone.changeOctave.up.chance / 100
      ) {
        oscillator.frequency.value =
          oscillator.frequency.value *
          randomInRange(
            soundscape.settings.drone.changeOctave.up.min,
            soundscape.settings.drone.changeOctave.up.max
          );
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
          Object.keys(soundscape.tracks).length - 1 <
          soundscape.settings.drone.tracks.max
        ) {
          soundscape.generateDroneTracks();
        }
      };

      var gainNode = soundscape.context.createGain();

      var now = soundscape.context.currentTime;

      var panner = new StereoPannerNode(soundscape.context, {
        pan: randomInRange(0, 2000) / 1000 - 1
      });

      var attack = randomInRange(
        soundscape.settings.drone.envelope.attack.min,
        soundscape.settings.drone.envelope.attack.max,
        (isInt = false)
      );
      var sustain = randomInRange(
        soundscape.settings.drone.envelope.sustain.min,
        soundscape.settings.drone.envelope.sustain.max,
        (isInt = false)
      );
      var release = randomInRange(
        soundscape.settings.drone.envelope.release.min,
        soundscape.settings.drone.envelope.release.max,
        (isInt = false)
      );
      var preDelay = 0,
        postDelay = 0;

      if (Math.random() <= soundscape.settings.drone.delay.pre.chance / 100) {
        preDelay = randomInRange(
          soundscape.settings.drone.delay.pre.min,
          soundscape.settings.drone.delay.pre.max,
          (isInt = false)
        );
      }

      if (Math.random() <= soundscape.settings.drone.delay.post.chance / 100) {
        postDelay = randomInRange(
          soundscape.settings.drone.delay.post.min,
          soundscape.settings.drone.delay.post.max,
          (isInt = false)
        );
      }

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(
        randomInRange(
          soundscape.settings.drone.gain.min,
          soundscape.settings.drone.gain.max,
          (isInt = false)
        ) / (soundscape.settings.drone.gain.dividedBy || 1),
        now + preDelay + attack
      );
      gainNode.gain.linearRampToValueAtTime(
        0,
        now + preDelay + attack + sustain + release
      );

      oscillator.start(now + preDelay);
      oscillator.stop(
        now + preDelay + attack + sustain + release + postDelay + 0.01
      );

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

  var frequency = shuffle(Object.values(soundscape.key))[0][
    randomInRange(0, shuffle(Object.values(soundscape.key))[0].length - 1)
  ];
  if (
    Math.random() <=
    soundscape.settings.twiddle.changeOctave.down.chance / 100
  ) {
    frequency =
      frequency /
      randomInRange(
        soundscape.settings.twiddle.changeOctave.down.min,
        soundscape.settings.twiddle.changeOctave.down.max
      );
  } else if (
    Math.random() <=
    soundscape.settings.twiddle.changeOctave.up.chance / 100
  ) {
    frequency =
      frequency *
      randomInRange(
        soundscape.settings.twiddle.changeOctave.up.min,
        soundscape.settings.twiddle.changeOctave.up.max
      );
  }

  var attack = randomInRange(
    soundscape.settings.twiddle.envelope.attack.min,
    soundscape.settings.twiddle.envelope.attack.max,
    (isInt = false)
  );
  var sustain = randomInRange(
    soundscape.settings.twiddle.envelope.sustain.min,
    soundscape.settings.twiddle.envelope.sustain.max,
    (isInt = false)
  );
  var release = randomInRange(
    soundscape.settings.twiddle.envelope.release.min,
    soundscape.settings.twiddle.envelope.release.max,
    (isInt = false)
  );
  var preDelay = 0,
    postDelay = 0;

  if (Math.random() <= soundscape.settings.twiddle.delay.pre.chance / 100) {
    preDelay = randomInRange(
      soundscape.settings.twiddle.delay.pre.min,
      soundscape.settings.twiddle.delay.pre.max,
      (isInt = false)
    );
  }

  if (Math.random() <= soundscape.settings.twiddle.delay.post.chance / 100) {
    preDelay = randomInRange(
      soundscape.settings.twiddle.delay.post.min,
      soundscape.settings.twiddle.delay.post.max,
      (isInt = false)
    );
  }

  soundscape.tracks[twiddleTrackId].parts[
    twiddlePartId
  ].oscillator.frequency.setValueAtTime(frequency, currentTime);
  soundscape.tracks[twiddleTrackId].parts[
    twiddlePartId
  ].gainNode.gain.setValueAtTime(0, currentTime + preDelay);
  soundscape.tracks[twiddleTrackId].parts[
    twiddlePartId
  ].gainNode.gain.linearRampToValueAtTime(
    randomInRange(
      soundscape.settings.twiddle.gain.min,
      soundscape.settings.twiddle.gain.max,
      (isInt = false)
    ),
    currentTime + preDelay + attack
  );

  soundscape.tracks[twiddleTrackId].parts[
    twiddlePartId
  ].gainNode.gain.linearRampToValueAtTime(
    0,
    currentTime + preDelay + attack + sustain + release
  );

  soundscape.tracks[twiddleTrackId].parts[
    twiddlePartId
  ].panner.pan.setValueAtTime(randomInRange(1, 20) / 10 - 1, currentTime);

  currentTime = currentTime + preDelay + attack + sustain + release + postDelay;

  soundscape.tracks[twiddleTrackId].parts[
    twiddlePartId
  ].oscillator.onended = function() {
    delete soundscape.tracks[twiddleTrackId];
    soundscape.generateTwiddleTracks();
  };

  soundscape.tracks[twiddleTrackId].parts[twiddlePartId].oscillator.start(
    soundscape.context.currentTime + preDelay
  );

  soundscape.tracks[twiddleTrackId].parts[twiddlePartId].oscillator.stop(
    currentTime
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
      ].oscillator.onended = function() {};

      soundscape.tracks[trackId].parts[
        partId
      ].gainNode.gain.linearRampToValueAtTime(
        0,
        now + soundscape.settings.fadeOut
      );
      soundscape.tracks[trackId].parts[partId].oscillator.stop(
        now + soundscape.settings.fadeOut + 0.01
      );
    });
  });
  soundscape.tracks = {};

  setTimeout(function() {
    callback();
  }, soundscape.settings.fadeOut * 1200);
};

soundscape.getConvolver = function(convolver, callback) {
  var convolverBin = availableConvolvers["none"];

  if (availableConvolvers[convolver]) {
    convolverBin = availableConvolvers[convolver];
  }

  var audioData = Base64Binary.decodeArrayBuffer(convolverBin);
  soundscape.context.decodeAudioData(
    audioData,
    function(buffer) {
      //soundscape.convolvers.cathedral = soundscape.context.createBufferSource();
      soundscape.convolvers.cathedral = buffer;

      callback();
    },
    function(e) {
      callback(e.err);
    }
  );
};

soundscape.init = function() {
  if (soundscape.settings.referencePitch) {
    tunings.settings.referencePitch = soundscape.settings.referencePitch;
  }

  tunings.init(function() {
    soundscape.context = new AudioContext({
      sampleRate: soundscape.settings.sampleRate
    });

    soundscape.getConvolver(soundscape.settings.convolver, function() {
      soundscape.master = {};

      soundscape.master.gainNode = soundscape.context.createGain();
      soundscape.master.gainNode.gain.setValueAtTime(
        soundscape.settings.master.gain,
        soundscape.context.currentTime
      );

      soundscape.master.reverb = soundscape.context.createConvolver();
      soundscape.master.reverb.buffer = soundscape.convolvers.cathedral;

      soundscape.master.compressor = soundscape.context.createDynamicsCompressor();

      soundscape.master.filters = {
        lowpass: soundscape.context.createBiquadFilter({
          type: "lowpass"
        })
      };

      soundscape.master.filters.lowpass.frequency.value =
        soundscape.settings.master.eq.lp.frequency;

      soundscape.master.filters.lowpass.Q.value =
        soundscape.settings.master.eq.lp.Q;

      soundscape.master.filters.lowpass.gain.value =
        soundscape.settings.master.eq.lp.gain;

      soundscape.master.reverb.connect(soundscape.master.gainNode);
      soundscape.master.gainNode.connect(soundscape.master.filters.lowpass);
      soundscape.master.filters.lowpass.connect(soundscape.master.compressor);
      soundscape.master.compressor.connect(soundscape.context.destination);

      tunings.keys.getRandom(
        soundscape.settings.key || null,
        soundscape.settings.scale || null,
        function(key) {
          soundscape.key = key;
          soundscape.generateDroneTracks();
          soundscape.generateTwiddleTracks();
        }
      );
    });
  });
};
