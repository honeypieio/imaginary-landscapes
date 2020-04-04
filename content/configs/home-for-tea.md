{
  "title": "Home For Tea",
  "weight": "1",
  "key": "G",
  "scale": "minorPentatonic",
  "convolver": "dreamy-cathedral",
  "referencePitch": 432,
  "sampleRate": 22050,
  "drone": {
    "tracks": {
      "min": 3,
      "max": 6
    },
    "parts": {
      "min": 1,
      "max": 3
    },
    "changeOctave": {
      "up": {
        "chance": 1,
        "min": 2,
        "max": 2
      },
      "down": {
        "chance": 66.666,
        "min": 2,
        "max": 3
      }
    },
    "gain": {
      "min": 0.03,
      "max": 0.08,
      "dividedBy": 6
    },
    "envelope": {
      "attack": {
        "min": 7,
        "max": 15
      },
      "sustain": {
        "min": 4,
        "max": 7
      },
      "release": {
        "min": 7,
        "max": 12
      }
    },
    "delay": {
      "pre": {
        "chance": 33.333,
        "min": 0.1,
        "max": 5
      },
      "post": {
        "chance": 1,
        "min": 0.1,
        "max": 0.5
      }
    }
  },
  "twiddle": {
    "changeOctave": {
      "up": {
        "chance": 1,
        "min": 2,
        "max": 2
      },
      "down": {
        "chance": 90,
        "min": 2,
        "max": 3
      }
    },
    "gain": {
      "min": 0.01,
      "max": 0.04
    },
    "envelope": {
      "attack": {
        "min": 1,
        "max": 3
      },
      "sustain": {
        "min": 1,
        "max": 2
      },
      "release": {
        "min": 1,
        "max": 3
      }
    },
    "delay": {
      "pre": {
        "chance": 33.333,
        "min": 0.1,
        "max": 1.5
      },
      "post": {
        "chance": 1,
        "min": 0.1,
        "max": 1.5
      }
    }
  },
  "master": {
    "gain": 1,
    "eq": {
      "lp": {
        "frequency": 300,
        "Q": 0,
        "gain": 2
      }
    }
  },
  "fadeOut": 5,
  "oscWaveforms": ["sine", "triangle"]
}
