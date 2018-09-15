import { User } from '../../core/models/user.model';
import { Message } from './message.model';

export class Chat {

  id?: string;
  createdAt?: string;
  isGroup?: string;
  title?: string;
  users?: User[];
  messages?: Message[];

}
