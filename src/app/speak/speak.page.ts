import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform, ToastController, NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage';
import { File } from '@ionic-native/file/ngx';
import { xmlbuilder } from 'xmlbuilder/lib';
import { Media } from '@ionic-native/media/ngx';

@Component({
  selector: 'app-speak',
  templateUrl: 'speak.page.html',
  styleUrls: ['speak.page.scss']
})
export class SpeakPage {
  region: string;
  key: string;
  tokenUrl: string;
  voiceUrl: string;
  synthUrl: string;
  token: string;
  language: string;
  gender: string;
  voice: string;
  text: string;

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private storage: StorageService,
    private http: HttpClient,
    private file: File,
    private media: Media
  ) {
    this.platform.ready().then(() => {
      this.storage.get('region').then((region) => {
        this.region = region ? region : 'westus';
        this.tokenUrl = `https://${this.region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;
        this.voiceUrl = `https://${this.region}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
        this.synthUrl = `https://${this.region}.tts.speech.microsoft.com/cognitiveservices/v1`;
        this.storage.get('key').then((key) => {
          this.key = key;
          if (!key) {
            this.toastCtrl.create({
              message: 'No key present.',
              duration: 1000
            }).then((toast) => {
              toast.present();
              this.navCtrl.navigateRoot('tabs/settings');
            });
          } else {
            this.storage.get('token').then((token) => {
              if (!token) {
                this.getToken();
              } else {
                this.token = token;
              }
            });
          }
          this.storage.get('language').then((language) => {
            this.language = language ? language : 'en-US';
            this.storage.get('gender').then((gender) => {
              this.gender = gender ? gender : 'Female';
              this.storage.get('voice').then((voice) => {
                this.voice = voice ? voice : 'en-US-Jessa24KRUS';
              });
            });
          });
        });
      });
    });
  }

  getToken() {
    this.http.post(this.tokenUrl, '', {
      headers: {'Ocp-Apim-Subscription-Key': this.key},
      responseType: 'text'
    }).subscribe((token) => {
      this.storage.set('token', token).then(() => {
        this.token = token;
        this.toastCtrl.create({
          message: 'Token set!',
          duration: 1000
        }).then((toast) => {
          toast.present();
        });
      });
    }, (err) => {
      this.toastCtrl.create({
        message: 'Wrong key or region?\n' + err.message,
        duration: 1000
      }).then((toast) => {
        toast.present();
        this.navCtrl.navigateRoot('tabs/settings');
      });
    });
  }

  getSynth(path: string, name: string) {
    const textSSML = xmlbuilder.create('speak')
      .att('version', '1.0')
      .att('xml:lang', this.language.toLowerCase())
      .ele('voice')
      .att('xml:lang', this.language.toLowerCase())
      .att('xml:gender', this.gender)
      .att('name', this.voice)
      .txt(this.text)
      .end().toString();
    this.http.post(this.synthUrl, textSSML, {
      headers: {
        'content-type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat' : 'riff-24khz-16bit-mono-pcm',
        'Authorization': 'Bearer ' + this.token,
        'X-Search-AppId': '07D3234E49CE426DAA29772419F436CA',
        'X-Search-ClientID': '1ECFAE91408841A480F00935DC390960'
      },
      responseType: 'arraybuffer'
    }).subscribe((synth) => {
      if (this.platform.is('hybrid') && !this.platform.is('electron')) {
        this.file.resolveLocalFilesystemUrl(path).then(entry => {
          this.file.writeFile(entry.toInternalURL(), name, synth, {replace: true}).then(fileEntry => {
            this.media.create(fileEntry.toInternalURL()).play();
            this.toastCtrl.create({
              message: 'File written!',
              duration: 1000
            }).then((toast) => {
              toast.present();
            });
          }).catch(() => {
            this.toastCtrl.create({
              message: 'Err',
              duration: 1000
            }).then((toast) => {
              toast.present();
            });
          });
        });
      } else {
        const audioContext = new AudioContext();
        audioContext.decodeAudioData(synth).then((buffer) => {
          const src = audioContext.createBufferSource();
          src.buffer = buffer;
          src.connect(audioContext.destination);
          src.start(0);
        }, (err) => {
          this.toastCtrl.create({
            message: err.message,
            duration: 1000
          }).then((toast) => {
            toast.present();
          });
        });
      }
    }, (err) => {
      this.toastCtrl.create({
        message: 'Token expired? Retry.\n' + err.message,
        duration: 1000
      }).then((toast) => {
        toast.present();
        this.getToken();
      });
    });
  }

  saveSettings() {
    this.storage.set('region', this.region).then(() => {
      this.storage.set('key', this.key).then(() => {
        this.getToken();
      });
    });
  }

  speakText() {
    if (!this.text) {
      this.toastCtrl.create({
        message: 'No text to speak.',
        duration: 1000
      }).then((toast) => {
        toast.present();
      });
    } else {
      this.getSynth(this.file.cacheDirectory, 'synth.wav');
    }
  }
}
