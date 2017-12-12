import {Application, Request, Response, NextFunction} from 'express';
import {findDbThreadsPerUse} from '../persistance/findDbThreadsPerUser';
import {dbMessages, dbParticipants} from '../db-data';
import {Message} from '../../../shared/model/message';
import {Participant} from '../../../shared/model/participant';
import {AllUserData} from '../../../shared/dto/all-user-data';
import * as _ from 'lodash';

export function getUserAllThreades(app: Application) {

  app.route('/api/threads').get((req: Request, res: Response, next: NextFunction) => {
    const paraticipantId:number = +req.headers['userid'];
    const threadsPerUser = findDbThreadsPerUse(paraticipantId);

    let messgaes: Message[] = [],
      paraticipants: Participant[] = [];

    threadsPerUser.forEach(thread => {
      const threadMessages: Message[] = _.filter(dbMessages, (msg: Message) => msg.threadId == thread.id);
      messgaes.concat(threadMessages);
      const threadParcs: Participant[] = _.filter(dbParticipants, (parc: Participant) => _.includes(_.keys(thread.participants), parc.id.toString()));
      messgaes = messgaes.concat(threadMessages);
      paraticipants = paraticipants.concat(threadParcs);

    });

    const allUserData: AllUserData = {
      messages: _.uniqBy(messgaes,(i:Message)=>i.id),
      participants: _.uniqBy(paraticipants,(i:Participant)=>i.id),
      threads: threadsPerUser
    };
    res.status(200).json(allUserData);
  });


}
