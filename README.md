# Demo

Refer to [Capacitor](https://capacitor.ionicframework.com/docs/) for dependencies.

## Init

Just some notes on how to create this repo. Don't have to repeat after clone.

```
npm install -g ionic
ionic start speech-api tabs --type=angular
```

Don't enable cordova for now, press N when it asks.

```
cd speech-api
npm install --save @capacitor/core @capacitor/cli
npx cap init
```

## Setup

Run once.

```
git clone https://github.com/boltomli/speech-api.git && cd speech-api
npm install && npm run build
```

Run `npm run build && npx cap sync` regularly during development.

### Web

Try in browser with `ionic serve`.

### Mobile

Note that iOS is supported on macOS only.

```
npx cap add android
npx cap add ios
npx cap open android
npx cap open ios
```

### Desktop

Due to a capacitor [issue](https://github.com/ionic-team/capacitor/issues/1037), `npx cap add electron` result is not usable directly yet. Have to change base in index.html to an empty string and copy js files from app folder to tabs folder. Then run `cd electron && npm run electron:start`. Working release packages for Windows or macOS might be updated when there's progress.

## Limitations

This is just a demo. The list of Speech Services regions and corresponding TTS languages/genders/voices are not complete. Always refer to official Azure [document](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/regions#text-to-speech). Also, the selection is not made in a way that can filter per availability. Please feel free to contribute.
