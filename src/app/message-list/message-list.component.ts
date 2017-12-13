import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MiniMsg} from '../../../shared/view-model/miniMsg';
import * as _ from 'lodash';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MessageListComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages'] && !changes['messages'].isFirstChange()) {
      const prev = <MiniMsg[]>(changes['messages'].previousValue);
      const added = <MiniMsg[]>(changes['messages'].currentValue);
      if (added.length > prev.length) {
        setTimeout(() => {
          const items = this.list['nativeElement'].querySelectorAll('li');
          const lastLi = <HTMLLIElement>_.last(items);
          if (lastLi)
            lastLi.scrollIntoView();
        }, 0);
      }
    }

  }

  @Input() messages: MiniMsg[];
  @ViewChild('list') list: HTMLUListElement;

  constructor() {

  }

  ngOnInit() {
  }

}
