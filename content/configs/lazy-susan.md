{
  "title": "Lazy Susan",
  "weight": "2",
  "sampleRate": 22050,
  "convolver": "dreamy-cathedral",
  "referencePitch": 432,
  "key": "C",
  "scale": "majorPentatonic",
  "drone": {
    "tracks": {
      "min": 1,
      "max": 2
    },
    "parts": {
      "min": 3,
      "max": 6
    },
    "changeOctave": {
      "up": {
        "chance": 5,
        "min": 2,
        "max": 2
      },
      "down": {
        "chance": 90,
        "min": 2,
        "max": 4
      }
    },
    "gain": {
      "min": 0.03,
      "max": 0.07,
      "dividedBy": 4
    },
    "envelope": {
      "attack": {
        "min": 0.1,
        "max": 0.5
      },
      "sustain": {
        "min": 0.1,
        "max": 0.2
      },
      "release": {
        "min": 4,
        "max": 8
      }
    },
    "delay": {
      "pre": {
        "chance": 0,
        "min": 0.1,
        "max": 0.1
      },
      "post": {
        "chance": 0,
        "min": 0.1,
        "max": 0.1
      }
    }
  },
  "twiddle": {
    "changeOctave": {
      "up": {
        "chance": 0,
        "min": 2,
        "max": 2
      },
      "down": {
        "chance": 22,
        "min": 2,
        "max": 2
      }
    },
    "gain": {
      "min": 0.01,
      "max": 0.03
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
        "frequency": 1500,
        "Q": 1,
        "gain": 1
      }
    }
  },
  "fadeOut": 5,
  "oscWaveforms": ["sine", "triangle"]
}
