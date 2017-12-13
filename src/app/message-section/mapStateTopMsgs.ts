import {AppState} from '../../store/app-state';
import {MiniMsg} from '../../../shared/view-model/miniMsg';
import * as _ from 'lodash';
import {Message} from '../../../shared/model/message';
import {Participant} from '../../../shared/model/participant';
import {createSelector} from 'reselect';


export const msgsSelector = createSelector(getParcs, getMsgsForThread, mapMsgsToMiniMsgs);

export function mapStateTopMsgs(state: AppState): MiniMsg[] {

  // const currenthreadId = state.uiState.threadId;
  // if (!currenthreadId) return [];
  // if (!state.storeState.threads[currenthreadId]) return [];
  // const msgsIds = state.storeState.threads[currenthreadId].messageIds;
  const msgs = getMsgsForThread(state);
  const parcs = getParcs(state);
  const miniMsgs = mapMsgsToMiniMsgs(msgs, parcs);
  return miniMsgs;
}

function getMsgsForThread(state: AppState): Message[] {
  const currentThread = state.storeState.threads[state.uiState.threadId];
  if (!currentThread) return [];
  return currentThread.messageIds.map(msgId => state.storeState.msgs[msgId]);
}

function getParcs(state: AppState): { [key: number]: Participant } {
  return state.storeState.participants;
}

const msgToMiniMsg = _.memoize((msg: Message, parcName: string): MiniMsg => {
  return <MiniMsg>{
    id: msg.id
    , parcName: parcName
    , text: msg.text
    , timeStamp: msg.timestamp
  };
}, (parcName: string, msg: Message) => msg.id + parcName);

function mapMsgsToMiniMsgs(msgs: Message[], parcs: { [key: number]: Participant }) {
  return msgs.map((msg, parcs) => {
    const parcName = parcs[msg.participantId].name;
    return msgToMiniMsg(msg, parcName);
  });
}
