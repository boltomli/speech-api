import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import xmlbuilder from 'xmlbuilder';
import { File, Entry } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  region: string
  key: string;
  language: string;
  gender: string;
  voice: string;
  text: string;
  tokenUrl: string;
  token: string;
  synthUrl: string;

  constructor(public navCtrl: NavController, private storage: Storage, private http: HttpClient, private toastCtrl: ToastController, private file: File, private media: Media) {
    this.storage.get('language').then((val) => {
      this.language = val ? val : 'en-US';
    })
    this.storage.get('gender').then((val) => {
      this.gender = val ? val : 'Female';
    })
    this.storage.get('voice').then((val) => {
      this.voice = val ? val : 'Microsoft Server Speech Text to Speech Voice (en-US, Jessa24KRUS)';
    })
  }

  speakText() {
    this.storage.get('region').then((val) => {
      this.region = val;
      this.tokenUrl = `https://${this.region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;
      this.synthUrl = `https://${this.region}.tts.speech.microsoft.com/cognitiveservices/v1`;
      this.storage.get('key').then((val) => {
        this.key = val;
        let headers = new HttpHeaders();
        headers = headers.set('Ocp-Apim-Subscription-Key', this.key);

        let toast = this.toastCtrl.create({
          duration: 1000
        });

        this.http.post(this.tokenUrl, '', {headers: headers, responseType: 'text'}).subscribe((val) => {
          this.token = val;
          headers = new HttpHeaders({
            'content-type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat' : 'riff-24khz-16bit-mono-pcm',
            'Authorization': 'Bearer ' + this.token,
            'X-Search-AppId': '07D3234E49CE426DAA29772419F436CA',
            'X-Search-ClientID': '1ECFAE91408841A480F00935DC390960',
            'User-Agent': 'speech-api-demo'
          });
          const ssml_doc = xmlbuilder.create('speak')
            .att('version', '1.0')
            .att('xml:lang', this.language.toLowerCase())
            .ele('voice')
            .att('xml:lang', this.language.toLowerCase())
            .att('xml:gender', this.gender)
            .att('name', this.voice)
            .txt(this.text)
            .end().toString();
          this.http.post(this.synthUrl, ssml_doc, {headers: headers, responseType: 'blob'}).subscribe((val) => {
            toast = toast.setMessage(val.size.toString());
            toast.present();
            let synthFile = 'synth.wav';
            this.file.resolveLocalFilesystemUrl(this.file.cacheDirectory).then(dir => {
              this.file.writeFile(dir.toInternalURL(), synthFile, val.slice(0), {replace: true}).then((res: Entry) => {
                const synth: MediaObject = this.media.create(res.toInternalURL());
                synth.play();
              }, err => {
                toast = toast.setMessage(err);
                toast.present();
              });
            }, err => {
              toast = toast.setMessage(err);
              toast.present();
            });
          },
          (err: HttpErrorResponse) => {
            toast = toast.setMessage(err.message);
            toast.present();
          });
        },
        (err: HttpErrorResponse) => {
          toast = toast.setMessage(err.message);
          toast.present();
        });
      });
    });
  }
}
