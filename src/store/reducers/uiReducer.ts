import {Action, ActionReducer} from '@ngrx/store';
import {INIT_UI_STATE, Uistate} from '../ui-state';
import {
  GetMsgsPerThreadAction, THREAD_SELECTED_ACTION, USER_SELECTED_ACTION, UserSelectedAction,
  UserThreadsLoadedAction
} from '../actions';

export const uiReducer: ActionReducer<Uistate> = function (state: Uistate = INIT_UI_STATE, action: any): Uistate {
  switch (action.type) {

    case THREAD_SELECTED_ACTION:
      const newState: Uistate = {...state, threadId: action.payload.selectedThreadId};
      return newState;
    case USER_SELECTED_ACTION:

      return handleSeleceduserAction(state, action);
    default:
      return state;
  }

};

function handleSeleceduserAction(state: Uistate, action: UserSelectedAction): Uistate {
  const newState: Uistate = {...state, userId: action.payload, threadId: undefined};
  return newState;
}

