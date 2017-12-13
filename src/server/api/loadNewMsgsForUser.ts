import {Application, NextFunction, Request, Response} from 'express';
import {dbMessages, dbMessagesQueuePerUser} from '../db-data';

export function loadNewMsgsForUser(app: Application) {
  app.route('/api/notification/msgs').post((req: Request, res: Response, next: NextFunction) => {
    const participantId = +req.headers['userid'];

    if (!participantId) return res.status(200).json({payload: []});

    const unreadMessageIds = dbMessagesQueuePerUser[participantId];

    const unreadMessages = unreadMessageIds.map(messageId => dbMessages[messageId]);

    dbMessagesQueuePerUser[participantId] = [];

    res.status(200).json({payload: unreadMessages});
  });
}
