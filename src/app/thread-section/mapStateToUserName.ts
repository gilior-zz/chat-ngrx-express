import {AppState} from '../../store/app-state';

export function mapStateToUserName(state: AppState): string {
if (!state.storeState.participants[state.uiState.userId]) return '';
  return state.storeState.participants[state.uiState.userId].name;
}
