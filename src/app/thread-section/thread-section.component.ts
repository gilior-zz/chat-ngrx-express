import {ChangeDetectionStrategy, Component, EventEmitter, OnInit} from '@angular/core';
import {ThreadService} from '../services/thread.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app-state';
import {LoadUserThreadsAction, ThreadSelectedAction, UserThreadsLoadedAction} from '../../store/actions';
import {StoreState} from '../../store/store-state';
import 'rxjs/add/operator/skip';
import {Observable} from 'rxjs/Observable';
import {Thread} from '../../../shared/model/thread';
import * as _ from 'lodash';
import {MiniThread} from '../../../shared/view-model/miniThread';
import {Message} from '../../../shared/model/message';
import {mapStateToUserName} from './mapStateToUserName';
import {mapStateToToRead} from './mapStateToToRead';
import {mapStateToToMiniThread} from './mapStateToToMiniThread';
import {Uistate} from '../../store/ui-state';


@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ThreadSectionComponent implements OnInit {

  name$: Observable<String>;
  toRead$: Observable<number>;
  miniThreads$: Observable<MiniThread[]>;
  private uiState: Uistate;
  private selectedThreadId$: Observable<number>;


  constructor(private store: Store<AppState>) {
    store.select(i => i.uiState).subscribe(i => this.uiState = i);
    this.name$ = this.store.skip(1).map(mapStateToUserName);
    this.toRead$ = this.store.skip(1).map(mapStateToToRead);
    this.miniThreads$ = this.store.select(mapStateToToMiniThread);

  }


  ngOnInit() {
    // this.store.dispatch(new LoadUserThreadsAction());
  }

  onThreadSelected(threadId: number) {
    this.store.dispatch(
      new ThreadSelectedAction({selectedThreadId: threadId, currentUserId: this.uiState.userId}));
  }


}
