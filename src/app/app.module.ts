import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import * as _ from 'lodash';
import {AppComponent} from './app.component';
import {UserSelectionComponent} from './user-selection/user-selection.component';
import {ThreadSectionComponent} from './thread-section/thread-section.component';
import {MessageSectionComponent} from './message-section/message-section.component';
import {ThreadListComponent} from './thread-list/thread-list.component';
import {MessageListComponent} from './message-list/message-list.component';
import {ThreadService} from './services/thread.service';
import {HttpClientModule} from '@angular/common/http';
import {Action, ActionReducer, ActionReducerMap, combineReducers, StoreModule} from '@ngrx/store';
import {AppState, INIT_APP_STATE} from '../store/app-state';

import {Uistate} from '../store/ui-state';
import {THREAD_SELECTED_ACTION, USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction} from '../store/actions';
import {StoreState} from '../store/store-state';
import {LoadThreadsEffectService} from '../store/effects/load-threads-effect.service';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtools, StoreDevtoolsModule} from '@ngrx/store-devtools';
import {uiReducer} from '../store/reducers/uiReducer';
import {storeReducer} from '../store/reducers/storeReducer';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import {MsgsEffectService} from '../store/effects/msgs-effect.service';
import {ServerNotificationService} from '../store/effects/server-notification.service';
import {MarkAsReadEffect} from '../store/effects/mark-msg-as-read.service';

// const appStateReducer: ActionReducer<AppState> = function (state: AppState = INIT_APP_STATE, action: Action): AppState {
//   switch (action.type) {
//   }
//   return state;
// };
const reducers: ActionReducerMap<AppState> = {
  storeState: storeReducer
  , uiState: uiReducer
};
//
// const myReducers = {
//   appStateReducer
// };

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {initialState: INIT_APP_STATE}),
    EffectsModule.forRoot([LoadThreadsEffectService,MsgsEffectService,ServerNotificationService,MarkAsReadEffect]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ThreadService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
