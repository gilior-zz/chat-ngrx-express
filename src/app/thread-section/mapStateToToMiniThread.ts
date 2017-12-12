import {AppState} from '../../store/app-state';
import {Thread} from '../../../shared/model/thread';
import * as _ from 'lodash';
import {Participant} from '../../../shared/model/participant';
import {MiniThread} from '../../../shared/view-model/miniThread';
import {Observable} from 'rxjs/Observable';
import {StoreState} from '../../store/store-state';

export function mapStateToToMiniThread(state: AppState): MiniThread[] {


  const threads = _.values<Thread>(state.storeState.threads);
  return threads.map(thread => {
    let names = _.keys(thread.participants).map(id =>
      state.storeState.participants[id].name
    );

    let lastMsgId = _.last(thread.messageIds);

    let lastMsg = state.storeState.msgs[lastMsgId];
    return <MiniThread>{
      id: thread.id,
      parcs: _.join(names, ','),
      text: lastMsg.text,
      timestamp: lastMsg.timestamp,
      read: thread.id === state.uiState.threadId || thread.participants[state.uiState.userId] === 0
    };
  });

}

function threadToMiniThread(appStateReducer, thread: Thread): MiniThread {

  let names = _.keys(thread.participants).map(id =>
    appStateReducer.storeState.participants[id].name
  );

  let lastMsgId = _.last(thread.messageIds);

  let lastMsg = appStateReducer.storeState.msgs[lastMsgId];
  return <MiniThread>{
    id: thread.id,
    parcs: _.join(names, ','),
    text: lastMsg.text,
    timestamp: lastMsg.timestamp,
    read: thread.id === appStateReducer
  };
}
