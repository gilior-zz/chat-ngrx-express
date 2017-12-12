import {AppState} from '../../store/app-state';
import {Thread} from '../../../shared/model/thread';
import * as _ from 'lodash';

export function mapStateToToRead(state:AppState): number {

  const userId = state.uiState.userId;
  return _.values<Thread>(state.storeState.threads).reduce(
    (acc, thread) => acc + thread.participants[userId]
    , 0);
}
