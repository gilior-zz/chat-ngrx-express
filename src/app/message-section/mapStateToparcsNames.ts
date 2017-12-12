import {AppState} from '../../store/app-state';
import {buildParcsNamesPerThread} from './buildParcsNamesPerThread';

export function mapStateToParcsNames(state: AppState): string {
  let currentThreadId = state.uiState.threadId;
  if (!currentThreadId) return '';
  const currentThread = state.storeState.threads[currentThreadId];
  if (!currentThread) return '';

  return buildParcsNamesPerThread(state, currentThread);

}
