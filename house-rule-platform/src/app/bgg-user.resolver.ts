import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {BGGUser} from '../data/user-d-b';
import {UserService} from './user.service';
import {react} from 'plotly.js-dist-min';
import {BackEndService} from './back-end.service';

@Injectable({
  providedIn: 'root'
})
export class BggUserResolver implements Resolve<BGGUser> {

  constructor(public user: UserService, public back: BackEndService) {
  }


  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<BGGUser> {
    const bggUser = this.user.getBGGInfo();
    // Info is in local storage
    if (bggUser !== undefined) {
      return bggUser;
    } else {
      const user = this.user.getInfo();
      if (user) {
        if (user.bggUserName) {
          const bggUser2 = await this.back.getBGGUser(user.bggUserName);
          this.user.setBGGInfo(bggUser2);
          return bggUser2;
        } else {
          return undefined;
        }
      } else {
        // Not logged in
        return undefined;
      }

    }

  }
}
