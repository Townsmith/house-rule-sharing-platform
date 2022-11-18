import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HouseRuleFilled} from '../data/house-rule-d-b';
import {BackEndService} from './back-end.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserHrsResolver implements Resolve<HouseRuleFilled[]> {

  constructor(public back: BackEndService, public user: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<HouseRuleFilled[]> {
    let userId = this.user.getID();
    // load current user
    if (userId == undefined) {
      userId = this.user.getID();
    }
    if (userId === undefined) {
      // not logged in and trying to access his own profile TODO
    }
    return this.back.getHouseRulesOfUser(userId);
  }
}
