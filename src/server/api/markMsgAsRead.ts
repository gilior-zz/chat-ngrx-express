import {Application, NextFunction, Request, Response} from 'express';
import {dbThreads} from '../db-data';
import {Thread} from '../../../shared/model/thread';
import * as _ from 'lodash';

export function markMsgAsRead(app: Application) {
  app.route('/api/threads/:id').patch((req: Request, res: Response, next: NextFunction) => {
    const participantId = +req.headers['userid'];

    const threadId = req.params['id'];

    const updatedProps = req.body;

    const allThreads: Thread[] = <any> _.values(dbThreads);

    const thread = _.find(allThreads, thread => thread.id == threadId);

    if (updatedProps.hasOwnProperty('read')) {
      thread.participants[participantId] = 0;
    }

    res.status(200).send();
  });
}
