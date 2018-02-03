import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: (...args) => Observable<T>;
  }
}


const debbugerOn = true;
Observable.prototype.debug = function (msg) {

  return this.do(
    loggedValue => {
      if (debbugerOn)
        console.log(msg, loggedValue);
    },
    err => {
      if (debbugerOn)
        console.error(msg, err);
    },
    () => {
      if (debbugerOn)
        console.log(msg, 'Observ Completed');
    });
};


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
