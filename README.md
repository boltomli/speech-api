# Demo

Refer to [Capacitor](https://capacitor.ionicframework.com/docs/) for dependencies.

## Init

Just some notes on how to create this repo. Don't have to repeat after clone.

```
npm install -g ionic
ionic start speech-api tabs
```

Don't enable cordova for now, press N when it asks.

```
cd speech-api
npm install --save @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap add ios
npx cap add electron
```

## Build

```
npx cap open android
npx cap open ios
cd electron && npm run electron:start
```
