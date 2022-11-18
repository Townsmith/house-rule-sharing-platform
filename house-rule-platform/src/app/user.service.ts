import {Injectable} from '@angular/core';
import {BGGUser, UserDB, UserFilled} from '../data/user-d-b';
import {BackEndService} from './back-end.service';
import {BGGBoardGameData} from '../data/BGGBoardGameData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth: boolean;
  admin: boolean;

  info: UserFilled;
  bggInfo: BGGUser;
  bggCollection: BGGBoardGameData[] = [];

  constructor() {
    this.auth = localStorage.getItem('token') != null;
    this.admin = false;
  }

  logout() {
    this.auth = false;
    this.admin = false;
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('info');
    localStorage.removeItem('BGGInfo');
  }

  getID() {
    return parseInt(localStorage.getItem('id'));
  }

  getInfo(): UserFilled {
    return this.info;
  }

  setInfo(user: UserFilled) {
    this.info = user;
  }

  setBGGInfo(user: any) {
    this.bggInfo = user;
  }

  getBGGInfo(): BGGUser {
    return this.bggInfo;
  }
}
