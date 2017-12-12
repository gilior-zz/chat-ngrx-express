import {Injectable} from '@angular/core';
import {ThreadService} from '../../app/services/thread.service';
import {Observable} from 'rxjs/Observable';
import {Effect} from '@ngrx/effects';
import {HandleNewMsgReceivedAction} from '../actions';
import {Message} from '../../../shared/model/message';
import {Store} from '@ngrx/store';
import {map, filter} from 'rxjs/operators';
import {AppState} from '../app-state';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';

@Injectable()
export class ServerNotificationService {

  constructor(public  threadService: ThreadService, private  store: Store<AppState>) {
  }

  @Effect() newMsgs$ = Observable.interval(3000)
    .withLatestFrom(this.store.select(i=>i.uiState))
    .map(([any, uiState]) => uiState)
    .filter((uiState: any) => uiState.userId)
    .switchMap(uiState => this.threadService.loadNewMsgsForUser(uiState.userId).debug('post loadNewMsgsForUser'))
    .withLatestFrom(this.store.select(i=>i.uiState))
    .map(([res,uiState]) => new HandleNewMsgReceivedAction({msgs:res,threadId:uiState.threadId,userId:uiState.userId}));
}
