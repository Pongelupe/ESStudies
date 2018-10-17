import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Chat } from '../models/chat.model';
import { Apollo } from 'apollo-angular';
import { AuthService } from '../../core/services/auth.service';
import { USER_CHATS_QUERY, AllChatsQuery, CHAT_BY_ID_OR_BY_USERS_QUERY, ChatQuery, CREATE_PRIVATE_CHAT_MUTATION } from './chat.graphql';
import { map } from 'rxjs/operators';
import { DataProxy } from 'apollo-cache';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chats$: Observable<Chat[]>;

  constructor(
    private apollo: Apollo,
    private authService: AuthService
  ) { }

  startChatsMonitoring(): void {
    this.chats$ = this.getUserChats();
    this.chats$.subscribe();
  }

  getUserChats(): Observable<Chat[]> {
    return this.apollo.watchQuery<AllChatsQuery>({
      query: USER_CHATS_QUERY,
      variables: {
        loggedUserId: this.authService.authUser.id
      }
    }).valueChanges
      .pipe(
        map(res => res.data.allChats),
        map((chats: Chat[]) => {
          const chatsToSort = chats.slice();
          return chatsToSort.sort((a, b) => {
            const valueA = (a.messages.length > 0) ? new Date(a.messages[0].createdAt).getTime()
              : new Date(a.createdAt).getTime();
            const valueB = (b.messages.length > 0) ? new Date(b.messages[0].createdAt).getTime()
              : new Date(b.createdAt).getTime();

            return valueB - valueA;
          });
        })
      );
  }

  getChatByIdOrUser(chatOrUserId: string): Observable<Chat> {
    return this.apollo.query<ChatQuery | AllChatsQuery>({
      query: CHAT_BY_ID_OR_BY_USERS_QUERY,
      variables: {
        chatId: chatOrUserId,
        targetUserId: chatOrUserId,
        loggedUserId: this.authService.authUser.id
      }
    }).
      pipe(
        map(res => res.data['Chat'] ? res.data['Chat'] : res.data['allChats'][0])
      );
  }

  createPrivateChat(targetUserId: string): Observable<Chat> {
    return this.apollo.mutate({
      mutation: CREATE_PRIVATE_CHAT_MUTATION,
      variables: {
        loggedUserId: this.authService.authUser.id,
        targetUserId
      },
      update: (store: DataProxy, { data: { createChat } }) => {

        const userChatsVariables = { loggedUserId: this.authService.authUser.id };
        const userChatsData = store.readQuery<AllChatsQuery>({
          query: USER_CHATS_QUERY,
          variables: userChatsVariables
        });

        userChatsData.allChats = [createChat, ...userChatsData.allChats];
        store.writeQuery({
          query: USER_CHATS_QUERY,
          variables: userChatsVariables,
          data: userChatsData
        });


        const variables = {
          chatId: targetUserId,
          loggedUserId: this.authService.authUser.id,
          targetUserId
        };

        const data = store.readQuery<AllChatsQuery>({
          query: CHAT_BY_ID_OR_BY_USERS_QUERY,
          variables
        });

        data.allChats = [createChat];

        store.writeQuery({
          query: CHAT_BY_ID_OR_BY_USERS_QUERY,
          variables,
          data
        });
      }
    })
      .pipe(
        map(res => res.data.createChat)
      );
  }

}
