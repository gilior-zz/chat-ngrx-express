import {
  HandleNewMsgReceivedAction, NEW_MSG_RCVD_ACTION, SND_MSG_ACTION, SndMsgAction, THREAD_SELECTED_ACTION, ThreadSelectedAction,
  USER_THREADS_LOADED_ACTION,
  UserThreadsLoadedAction
} from '../actions';
import {Action, ActionReducer} from '@ngrx/store';
import {INIT_STORE_DATA, StoreState} from '../store-state';
import * as _ from 'lodash';
import {Message} from '../../../shared/model/message';
import {stat} from 'fs';
import {AppState} from '../app-state';

const uuidv4 = require('uuid/v4');


export const storeReducer: ActionReducer<StoreState> = function (state: StoreState = INIT_STORE_DATA, action: Action): StoreState {
  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
      return load_user_app_state(state, <UserThreadsLoadedAction>action);
    case SND_MSG_ACTION:
      return handleNewMsg(state, <SndMsgAction>action);
    case NEW_MSG_RCVD_ACTION:
      return handleNewMsgReceived(state, <HandleNewMsgReceivedAction>action);
    case THREAD_SELECTED_ACTION:
      return thread_selected_action(state, <ThreadSelectedAction>action);
    default:
      return state;
  }

};

function thread_selected_action(state: StoreState, threadSelectedAction: ThreadSelectedAction) {
  const newState: StoreState = {
    participants: {...state.participants},
    threads: {...state.threads},
    msgs: {...state.msgs}
  };
  newState.threads[threadSelectedAction.payload.selectedThreadId] = {...newState.threads[threadSelectedAction.payload.selectedThreadId]};
  const thread = newState.threads[threadSelectedAction.payload.selectedThreadId];
  thread.participants = {...thread.participants};
  thread.participants[threadSelectedAction.payload.currentUserId] = 0;

  return newState;
}

function handleNewMsg(state: StoreState, action: SndMsgAction): StoreState {

  let newStoreState: StoreState = {
    threads: {...state.threads},
    msgs: {...state.msgs},
    participants: state.participants
  };
  newStoreState.threads[action.payload.threadId] = {...state.threads[action.payload.threadId]};
  const thread = newStoreState.threads[action.payload.threadId];
  const newMsg: Message = {
    timestamp: new Date().getTime(),
    text: action.payload.txt,
    participantId: action.payload.userId,
    id: uuidv4(),
    threadId: action.payload.threadId
  };

  thread.messageIds = thread.messageIds.slice(0);
  thread.messageIds.push(newMsg.id);
  newStoreState.msgs[newMsg.id] = newMsg;
  return newStoreState;
}


function handleNewMsgReceived(state: StoreState, action: HandleNewMsgReceivedAction): StoreState {
  let newStoreState: StoreState = {
    threads: {...state.threads},
    msgs: {...state.msgs},
    participants: state.participants
  };
  const newMsgs = action.payload.msgs;

  newMsgs.forEach(msg => {
    newStoreState.msgs[msg.id] = msg;
    newStoreState.threads[msg.threadId] = {...state.threads[msg.threadId]};
    newStoreState.threads[msg.threadId].messageIds = newStoreState.threads[msg.threadId].messageIds.slice(0);
    newStoreState.threads[msg.threadId].messageIds.push(msg.id);

    if (msg.threadId != action.payload.threadId) {

      newStoreState.threads[msg.threadId].participants = {...newStoreState.threads[msg.threadId].participants};
      newStoreState.threads[msg.threadId].participants[action.payload.userId] += 1;
    }
  });
  return newStoreState;
}

function load_user_app_state(state: StoreState, action: UserThreadsLoadedAction): StoreState {
  const userData = action.payload;
  const newState: StoreState = {
    ...state,

    threads: _.keyBy(userData.threads, 'id')
    , msgs: _.keyBy(userData.messages, 'id')
    , participants: _.keyBy(userData.participants, 'id')
  };

  return newState;
}
