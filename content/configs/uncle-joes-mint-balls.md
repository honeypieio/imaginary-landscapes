{
  "title": "Uncle Joe's Mint Balls (Keep You All Aglow)",
  "weight": "3",  
  "sampleRate": 22050,
  "convolver": "big-honkin-wet-dreamy-fart",
  "key": "A",
  "referencePitch": 500,
  "scale": "minorPentatonic",
  "drone": {
    "tracks": {
      "min": 2,
      "max": 3
    },
    "parts": {
      "min": 2,
      "max": 4
    },
    "changeOctave": {
      "up": {
        "chance": 50,
        "min": 2,
        "max": 2
      },
      "down": {
        "chance": 50,
        "min": 2,
        "max": 4
      }
    },
    "gain": {
      "min": 0.03,
      "max": 0.04,
      "dividedBy": 3
    },
    "envelope": {
      "attack": {
        "min": 10,
        "max": 30
      },
      "sustain": {
        "min": 5,
        "max": 10
      },
      "release": {
        "min": 10,
        "max": 30
      }
    },
    "delay": {
      "pre": {
        "chance": 10,
        "min": 5,
        "max": 20
      },
      "post": {
        "chance": 2.5,
        "min": 1,
        "max": 10
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
        "chance": 80,
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
        "min": 5,
        "max": 10
      },
      "sustain": {
        "min": 1,
        "max": 2
      },
      "release": {
        "min": 5,
        "max": 10
      }
    },
    "delay": {
      "pre": {
        "chance": 33.333,
        "min": 3,
        "max": 10
      },
      "post": {
        "chance": 1,
        "min": 1,
        "max": 5
      }
    }
  },
  "master": {
    "gain": 1,
    "eq": {
      "lp": {
        "frequency": 200,
        "Q": 1,
        "gain": 1
      }
    }
  },
  "fadeOut": 5,
  "oscWaveforms": ["sine", "triangle"]
}
