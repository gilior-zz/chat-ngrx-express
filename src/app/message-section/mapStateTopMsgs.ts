import {AppState} from '../../store/app-state';
import {MiniMsg} from '../../../shared/view-model/miniMsg';
import * as _ from 'lodash';

export function mapStateTopMsgs(state: AppState): MiniMsg[] {

  const currenthreadId = state.uiState.threadId;
  if (!currenthreadId) return [];
  if (!state.storeState.threads[currenthreadId]) return [];
  const msgsIds = state.storeState.threads[currenthreadId].messageIds;
  const msgs = msgsIds.map(id => state.storeState.msgs[id]);
  const miniMsgs = msgs.map(msg => <MiniMsg>{
    id: msg.id
    , parcName: state.storeState.participants[msg.participantId].name
    , text: msg.text
    , timeStamp: msg.timestamp
  });
  return miniMsgs;
}
