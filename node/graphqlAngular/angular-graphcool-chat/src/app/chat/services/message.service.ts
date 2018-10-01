import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { AllMessagesQuery, GET_CHAT_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION } from './message.graphql';
import { map } from 'rxjs/operators';
import { DataProxy } from 'apollo-cache';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private apollo: Apollo
  ) { }

  getChatMessages(chatId: string): Observable<Message[]> {
    return this.apollo.watchQuery<AllMessagesQuery>({
      query: GET_CHAT_MESSAGES_QUERY,
      variables: {
        chatId
      }
    }).valueChanges
      .pipe(
        map(res => res.data.allMessages)
      );
  }

  createMessage(message: { text: string, chatId: string, senderId: string }): Observable<Message> {
    return this.apollo.mutate({
      mutation: CREATE_MESSAGE_MUTATION,
      variables: message,
      update: (store: DataProxy, { data: { createMessage } }) => {
        const data = store.readQuery<AllMessagesQuery>({
          query: GET_CHAT_MESSAGES_QUERY,
          variables: {
            chatId: message.chatId
          }
        });
        data.allMessages = [...data.allMessages, createMessage];
        store.writeQuery({
          query: GET_CHAT_MESSAGES_QUERY,
          variables: {
            chatId: message.chatId
          },
          data
        });
      }
    })
      .pipe(
        map(res => res.data.createMessage)
      );
  }
}
