import {Participant} from '../../shared/model/participant';
import {Thread} from '../../shared/model/thread';
import {Message} from '../../shared/model/message';

export interface StoreState { //per user
  participants: { [key: number]: Participant };
  threads: { [key: number]: Thread }
  msgs: { [key: number]: Message }
}

export const INIT_STORE_DATA: StoreState = {
  msgs: {},
  participants: {},
  threads: {}
};
