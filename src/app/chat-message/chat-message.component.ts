import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MiniMsg} from '../../../shared/view-model/miniMsg';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent implements OnInit {

  constructor() { }
  @Input()
  message: MiniMsg;
  ngOnInit() {
  }

}
