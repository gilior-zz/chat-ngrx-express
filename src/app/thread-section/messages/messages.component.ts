import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app-state';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public message: string;

  constructor(public store: Store<AppState>) {
    this.store.select(i => i.uiState).subscribe(i => this.message = i.currentError);
  }

  ngOnInit() {
  }

  close(){
    this.message='';
  }

}
