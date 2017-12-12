import {INIT_UI_STATE, Uistate} from './ui-state';
import {INIT_STORE_DATA, StoreState} from './store-state';

export interface AppState {
  uiState: Uistate;
  storeState: StoreState;
}

export const INIT_APP_STATE: AppState = {
  uiState: INIT_UI_STATE,
  storeState: INIT_STORE_DATA
};
