import {Injectable} from '@angular/core';
import {ThreadService} from '../../app/services/thread.service';
import {Actions, Effect} from '@ngrx/effects';
import {
  LOAD_USER_THREADS_ACTION, LoadUserThreadsAction, USER_SELECTED_ACTION, UserSelectedAction,
  UserThreadsLoadedAction
} from '../actions';
import {AllUserData} from '../../../shared/dto/all-user-data';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

@Injectable()
export class LoadThreadsEffectService {

  constructor(private  threadService: ThreadService, private actions$: Actions) {
  }

  @Effect() userThreads$: Observable<Action> = this.actions$
    .ofType(LOAD_USER_THREADS_ACTION).debug('LOAD_USER_THREADS_ACTION ')
    .switchMap((action: LoadUserThreadsAction) =>
      this.threadService.loadUserThreads(action.userId).debug('USER_THREADS_LOADED_ACTION ')
        .map(allUserData => new UserThreadsLoadedAction(allUserData)));

  @Effect() newUserSelected$: Observable<Action> = this.actions$.ofType(USER_SELECTED_ACTION).debug('new user selected')
    .map((action: UserSelectedAction) => new LoadUserThreadsAction(action.payload));

}
