import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Chat } from '../../models/chat.model';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Injectable()
export class ChatWindowResolver implements Resolve<Chat> {

  constructor(private chatService: ChatService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Chat> {
      const chatOrUserId = route.paramMap.get('id');
      return this.chatService.getChatByIdOrUser(chatOrUserId);
    }

}
