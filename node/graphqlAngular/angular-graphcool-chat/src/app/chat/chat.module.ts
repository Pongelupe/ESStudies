import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatTabComponent } from './components/chat-tab/chat-tab.component';
import { ChatUsersComponent } from './components/chat-users/chat-users.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';


@NgModule({
  imports: [
    SharedModule,
    ChatRoutingModule
  ],
  declarations: [ChatTabComponent, ChatUsersComponent, ChatListComponent, ChatWindowComponent]
})
export class ChatModule { }
