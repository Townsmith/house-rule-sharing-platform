import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserDB} from '../data/user-d-b';
import {UserService} from './user.service';
import {BackEndService} from './back-end.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserDB> {

  constructor(public user: UserService, public back: BackEndService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UserDB> {
    let userId = this.user.getID();
    let data;
    // load current user
    if (userId == undefined) {
      userId = this.user.getID();
      data = this.user.getInfo();
    } else {
      data = await this.back.getUser(userId);
    }
    if (userId === undefined) {
      // not logged in and trying to access his own profile TODO
    }
    return data;

  }
}
