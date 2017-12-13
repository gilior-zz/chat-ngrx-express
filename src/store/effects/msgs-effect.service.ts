import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {ErrorAction, SND_MSG_ACTION, SndMsgAction} from '../actions';
import {ThreadService} from '../../app/services/thread.service';

@Injectable()
export class MsgsEffectService {

  constructor(public actions$: Actions, private  threadService: ThreadService) {
  }

  @Effect() newMsgs: Observable<any> = this.actions$.ofType(SND_MSG_ACTION).switchMap((action: SndMsgAction) =>
    this.threadService.saveNewMsg(action.payload)
      .catch((res) => Observable.of(new ErrorAction('fa-q on msg save...')))
  );

}


