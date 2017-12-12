import * as express from 'express';
import {Application} from 'express';
import {getUserAllThreades} from './api/userThreads';
import {saveNewMsg} from './api/saveNewMsg';
import {loadNewMsgsForUser} from './api/loadNewMsgsForUser';
import {markMsgAsRead} from './api/markMsgAsRead';


var parser = require('body-parser');

const app: Application = express();
app.use(parser.json());
getUserAllThreades(app);
saveNewMsg(app);


markMsgAsRead(app)


loadNewMsgsForUser(app);
app.listen(3000, () => {
  console.log('sever listening on port ' + 8090);
});


