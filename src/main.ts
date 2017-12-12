import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {Observable} from 'rxjs/Observable';

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
