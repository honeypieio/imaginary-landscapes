{
  "title": "Wasn't That Great (?)",
  "weight": "5",
  "sampleRate": 22050,
  "convolver": "big-honkin-wet-dreamy-fart",
  "referencePitch": 612,
  "key": "F#",
  "scale": "majorPentatonic",
  "drone": {
    "tracks": {
      "min": 1,
      "max": 2
    },
    "parts": {
      "min": 2,
      "max": 3
    },
    "changeOctave": {
      "up": {
        "chance": 50,
        "min": 2,
        "max": 4
      },
      "down": {
        "chance": 50,
        "min": 2,
        "max": 4
      }
    },
    "gain": {
      "min": 0.1,
      "max": 0.2,
      "dividedBy": 4
    },
    "envelope": {
      "attack": {
        "min": 2,
        "max": 5
      },
      "sustain": {
        "min": 2,
        "max": 4
      },
      "release": {
        "min": 2,
        "max": 5
      }
    },
    "delay": {
      "pre": {
        "chance": 50,
        "min": 0.4,
        "max": 2
      },
      "post": {
        "chance": 80,
        "min": 0.2,
        "max": 0.5
      }
    }
  },
  "twiddle": {
    "changeOctave": {
      "up": {
        "chance": 50,
        "min": 2,
        "max": 4
      },
      "down": {
        "chance": 50,
        "min": 2,
        "max": 4
      }
    },
    "gain": {
      "min": 0.02,
      "max": 0.05
    },
    "envelope": {
      "attack": {
        "min": 1,
        "max": 5
      },
      "sustain": {
        "min": 1,
        "max": 2.5
      },
      "release": {
        "min": 2,
        "max": 4
      }
    },
    "delay": {
      "pre": {
        "chance": 10,
        "min": 2,
        "max": 5
      },
      "post": {
        "chance": 0,
        "min": 0,
        "max": 0
      }
    }
  },
  "master": {
    "gain": 1,
    "eq": {
      "lp": {
        "frequency": 150,
        "Q": 0,
        "gain": 1
      }
    }
  },
  "fadeOut": 5,
  "oscWaveforms": ["sine", "triangle"]
}
