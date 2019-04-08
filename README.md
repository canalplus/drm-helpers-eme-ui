# 📄 Drm Environement Helpers - Canal+

> [Helpers](https://drm-helpers-eme.paulrossethings.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/5c71152d-25ad-4899-b8f9-d66a32113057/deploy-status)](https://app.netlify.com/sites/quizzical-easley-8b62ec/deploys)
[![NPM](https://nodei.co/npm/rx-player.png?compact=true)](https://nodei.co/npm/rx-player/)

# The why ?

Permit to easily detect what is supported in the current browser in term of DRM (Digital right managment) given a `MediaKeySystemConfiguration`.

for example:

```
[
  {
    "type": "com.widevine.alpha",
    "configuration": {
      "initDataTypes": [
        "cenc"
      ],
      "persistentState": "required",
      "audioCapabilities": [
        {
          "robustness": "HW_SECURE_ALL",
          "contentType": "audio/mp4;codecs=\"mp4a.40.2\""
        },
        {
          "robustness": "HW_SECURE_DECODE",
          "contentType": "audio/mp4;codecs=\"mp4a.40.2\""
        },
        {
          "robustness": "HW_SECURE_CRYPTO",
          "contentType": "audio/mp4;codecs=\"mp4a.40.2\""
        },
        {
          "robustness": "SW_SECURE_DECODE",
          "contentType": "audio/mp4;codecs=\"mp4a.40.2\""
        },
        {
          "robustness": "SW_SECURE_CRYPTO",
          "contentType": "audio/mp4;codecs=\"mp4a.40.2\""
        }
      ],
      "videoCapabilities": [
        {
          "robustness": "HW_SECURE_ALL",
          "contentType": "video/mp4;codecs=\"avc1.4d401e\""
        },
        {
          "robustness": "HW_SECURE_DECODE",
          "contentType": "video/mp4;codecs=\"avc1.4d401e\""
        },
        {
          "robustness": "HW_SECURE_CRYPTO",
          "contentType": "video/mp4;codecs=\"avc1.4d401e\""
        },
        {
          "robustness": "SW_SECURE_DECODE",
          "contentType": "video/mp4;codecs=\"avc1.4d401e\""
        },
        {
          "robustness": "SW_SECURE_CRYPTO",
          "contentType": "video/mp4;codecs=\"avc1.4d401e\""
        }
      ]
    }
  },
]
```

# How it works ?

We are using a special API called `mediaCapabilitiesProber` provided by the [rx-player](https://www.npmjs.com/package/rx-player), it's basically an abstraction of EME (Encrypted media extensions) API that work cross browsers.

# License

MIT

# Authors

Canal+
