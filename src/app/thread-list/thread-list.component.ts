import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Thread} from '../../../shared/model/thread';
import {MiniThread} from '../../../shared/view-model/miniThread';

@Component({
  selector: 'thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css  '],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ThreadListComponent implements OnInit {
  @Input() Threads: MiniThread[];
  @Output() threadSelected: EventEmitter<number> = new EventEmitter();
  @Input() selectedThreadId: number;

  constructor() {
  }

  onThreadSelected(threadId: number) {
    this.threadSelected.emit(threadId);
  }

  ngOnInit() {

  }

}
