# Demo

Refer to [Capacitor](https://capacitor.ionicframework.com/docs/) for dependencies.

## Init

```
npm install -g ionic
ionic start speech-api tabs
```

Don't enable cordova for now, press N when it asks.

```
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
