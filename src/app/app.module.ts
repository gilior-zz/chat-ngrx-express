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
import {Action, ActionReducer, ActionReducerMap, combineReducers, StoreModule,MetaReducer} from '@ngrx/store';
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
import { MessagesComponent } from './thread-section/messages/messages.component';
import { storeFreeze } from 'ngrx-store-freeze';
import {environment} from '../environments/environment';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ChatMsgComponent } from './chat-msg/chat-msg.component';

// const appStateReducer: ActionReducer<AppState> = function (state: AppState = INIT_APP_STATE, action: Action): AppState {
//   switch (action.type) {
//   }
//   return state;
// };
const reducers: ActionReducerMap<AppState> = {
  storeState: storeReducer
  , uiState: uiReducer
};
const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze]: [];

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
    ChatMessageComponent,
    MessagesComponent,
    HomeComponent,
    AboutComponent,
    ChatMsgComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {initialState: INIT_APP_STATE,metaReducers:metaReducers}),
    EffectsModule.forRoot([LoadThreadsEffectService,MsgsEffectService,ServerNotificationService,MarkAsReadEffect]),
    StoreDevtoolsModule.instrument(),
    RouterModule.forRoot(routes)
  ],
  providers: [ThreadService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
