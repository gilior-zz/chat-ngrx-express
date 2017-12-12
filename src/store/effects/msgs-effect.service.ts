import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {SND_MSG_ACTION, SndMsgAction} from '../actions';
import {ThreadService} from '../../app/services/thread.service';

@Injectable()
export class MsgsEffectService {

  constructor(public actions$: Actions, private  threadService: ThreadService) {
  }

  @Effect({dispatch:false}) newMsgs: Observable<any> = this.actions$.ofType(SND_MSG_ACTION).switchMap((action: SndMsgAction) =>
    this.threadService.saveNewMsg(action.payload)
  );

}


