import {Application, NextFunction, Request, Response} from 'express';
import {dbMessages, dbMessagesQueuePerUser, dbThreads} from '../db-data';
import * as _ from 'lodash';
import {Message} from '../../../shared/model/message';

export function saveNewMsg(app: Application) {
  app.route('/api/threads/:id').post((req: Request, res: Response, next: NextFunction) => {
    const userId = +req.headers['userid'];
    const threadId = req.params['id'];
    const thread = dbThreads[threadId];
    const txt = req.body.txt;

    let lastMsgId = +_.last(_.keys(dbMessages));
    lastMsgId++;
    dbMessages[lastMsgId] = <Message>{
      id: lastMsgId,
      threadId: threadId,
      participantId: userId,
      text: txt,
      timestamp: new Date().getTime()
    };
    thread.messageIds.push(lastMsgId);

    const otherParticipantIds = _.keys(thread.participants).filter(id => parseInt(id) !== userId);

    otherParticipantIds.forEach(participantId => {
      thread.participants[participantId] += 1;
      dbMessagesQueuePerUser[participantId].push(dbMessages[lastMsgId].id);

    });

    thread.participants[userId] = 0;

    res.status(200).send();
  });

}
