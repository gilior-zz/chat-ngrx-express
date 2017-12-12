import {AppState} from '../../store/app-state';
import {Thread} from '../../../shared/model/thread';
import * as _ from 'lodash';

export function buildParcsNamesPerThread(state: AppState, thread: Thread): string {

  const names = _.keys(thread.participants).map(id =>
    (state.storeState.participants[id]).name
  );

  return _.join(names, ',');
}
