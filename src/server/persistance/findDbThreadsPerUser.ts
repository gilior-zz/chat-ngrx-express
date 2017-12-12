import {Thread} from '../../../shared/model/thread';
import {dbThreads} from '../db-data';
import * as _ from 'lodash';

export function findDbThreadsPerUse(partId) {
  const allThreads: Thread[] = _.values<Thread>(dbThreads);
  console.log(allThreads);
  return _.filter(allThreads, (thread) => _.includes(_.keys(thread.participants), partId.toString()));
}
