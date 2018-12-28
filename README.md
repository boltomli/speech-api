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
