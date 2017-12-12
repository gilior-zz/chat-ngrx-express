import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {ThreadService} from '../../app/services/thread.service';
import {THREAD_SELECTED_ACTION, ThreadSelectedAction} from '../actions';

@Injectable()

export class MarkAsReadEffect {
  constructor(public actions$: Actions, private  threadService: ThreadService) {

  }

  @Effect({dispatch: false}) markAsRead = this.actions$.ofType(THREAD_SELECTED_ACTION).switchMap((action: ThreadSelectedAction) => this.threadService.markMsgAsRead(action.payload.currentUserId, action.payload.selectedThreadId));
}
