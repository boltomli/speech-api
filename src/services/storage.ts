import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage as LocalStorage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  protected nativeStorage: NativeStorage;
  protected localStorage: LocalStorage;

  constructor() {
    this.nativeStorage = new NativeStorage();
    this.localStorage = new LocalStorage({});
  }

  async set(key: string, value: any) {
    try {
      return await this.nativeStorage.setItem(key, value);
    } catch (err) {
      console.warn(err);
      console.warn('Native storage not available, using local storage instead');
      return await this.localStorage.set(key, value);
    }
  }

  async get(key: string) {
    try {
      return await this.nativeStorage.getItem(key);
    } catch (err) {
      console.warn(err);
      if (err.indexOf('cordova_not_available') > -1) {
        console.warn('Native storage not available, using local storage instead');
        return await this.localStorage.get(key);
      } else {
        throw err;
      }
    }
  }
}
