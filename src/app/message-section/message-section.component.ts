import {Component, OnInit} from '@angular/core';
import {AppState} from '../../store/app-state';
import {Store} from '@ngrx/store';
import {Uistate} from '../../store/ui-state';
import {GetMsgsPerThreadAction, SndMsgAction} from '../../store/actions';
import {Observable} from 'rxjs/Observable';
import {mapStateToParcsNames} from './mapStateToparcsNames';
import {mapStateTopMsgs} from './mapStateTopMsgs';
import {Message} from '../../../shared/model/message';
import {MiniMsg} from '../../../shared/view-model/miniMsg';


@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {
  parcsNames$: Observable<string>;
  messages$: Observable<MiniMsg[]>;

  private threadId: number;
  private userId: number;

  constructor(private store: Store<AppState>) {
    this.parcsNames$ = this.store.select(mapStateToParcsNames);
    this.messages$ = this.store.select(mapStateTopMsgs);
    this.store.subscribe(i => {
      this.threadId = i.uiState.threadId;
      this.userId = i.uiState.userId;
    });
  }


  onEnter(txt: string) {

    this.store.dispatch(new SndMsgAction({threadId: this.threadId, txt: txt, userId: this.userId}));
  }

  ngOnInit() {

  }

}
