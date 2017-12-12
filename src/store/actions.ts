import {Action} from '@ngrx/store';
import {AllUserData} from '../../shared/dto/all-user-data';
import {ThreadService} from '../app/services/thread.service';
import {Uistate} from './ui-state';
import {Message} from '../../shared/model/message';

export const USER_THREADS_LOADED_ACTION: string = 'USER_THREADS_LOADED_ACTION';
export const LOAD_USER_THREADS_ACTION: string = 'LOAD_USER_THREADS_ACTION';
export const THREAD_SELECTED_ACTION: string = 'THREAD_SELECTED_ACTION';
export const USER_SELECTED_ACTION: string = 'USER_SELECTED_ACTION';
export const GET_MSGS_PER_THREAD_ACTION: string = 'GET_MSGS_PER_THREAD_ACTION';
export const SND_MSG_ACTION: string = 'SND_MSG_ACTION';
export const NEW_MSG_RCVD_ACTION: string = 'NEW_MSG_RCVD_ACTION';


export class UserThreadsLoadedAction implements Action {
  readonly type = USER_THREADS_LOADED_ACTION;

  constructor(public payload: AllUserData) {
  }
}

export class LoadUserThreadsAction implements Action {
  readonly type = LOAD_USER_THREADS_ACTION;

  constructor(public userId: number) {
  }
}

export interface ThreadSelectedActionPayload {
  selectedThreadId: number;
  currentUserId: number;

}

export class ThreadSelectedAction implements Action {
  readonly type = THREAD_SELECTED_ACTION;

  constructor(public payload?: ThreadSelectedActionPayload) {

  }
}

export class UserSelectedAction implements Action {
  readonly type = USER_SELECTED_ACTION;

  constructor(public payload: number) {

  }
}

export class GetMsgsPerThreadAction implements Action {
  readonly type = GET_MSGS_PER_THREAD_ACTION;

  constructor(public payload: number) {

  }


}


export interface SndMsgData {
  txt: string;
  threadId: number,
  userId: number
}

export class SndMsgAction implements Action {
  readonly type = SND_MSG_ACTION;

  constructor(public payload: SndMsgData) {

  }

}


export interface NewMsgData {
  msgs: Message[];
  threadId: number,
  userId: number
}
export class HandleNewMsgReceivedAction {
  readonly type = NEW_MSG_RCVD_ACTION;

  constructor(public payload: NewMsgData) {

  }
}

