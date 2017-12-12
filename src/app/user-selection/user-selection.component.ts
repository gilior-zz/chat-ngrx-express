import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app-state';
import {UserSelectedAction} from '../../store/actions';

@Component({
  selector: 'user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {

  constructor(public  store: Store<AppState>) {
  }

  ngOnInit() {
  }

  onUserSelected(userId: number) {
    this.store.dispatch(new UserSelectedAction(userId));
  }

}
