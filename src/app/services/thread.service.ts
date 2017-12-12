import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AllUserData} from '../../../shared/dto/all-user-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Message} from '../../../shared/model/message';
import {SndMsgData} from '../../store/actions';

@Injectable()
export class ThreadService {

  constructor(private  http: HttpClient,) {
  }

  loadUserThreads(userId: number): Observable<AllUserData> {
    return this.http.get('/api/threads/', {headers: new HttpHeaders({'USERID': String(userId)})}).map((res: AllUserData) => {
      // console.log(res)
      return res;
    });
  }

  saveNewMsg(msg: SndMsgData): Observable<any> {
    return this.http.post('/api/threads/' + msg.threadId, {txt: msg.txt}, {headers: new HttpHeaders({'USERID': String(msg.userId)})});
  }

  loadNewMsgsForUser(userId: number): Observable<any> {
    return this.http.post<any>('/api/notification/msgs', null, {headers: new HttpHeaders({'USERID': String(userId)})}).map((res) => res.payload);
  }

  markMsgAsRead(currentUserId: number, selectedThreadId: number):Observable<any> {
    return this.http.patch('/api/threads/'+selectedThreadId,{read:true},{headers: new HttpHeaders({'USERID': String(currentUserId)})})
  }
}

