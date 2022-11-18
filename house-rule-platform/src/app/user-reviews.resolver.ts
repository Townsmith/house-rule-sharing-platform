import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ReviewDB} from '../data/review-d-b';
import {BackEndService} from './back-end.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserReviewsResolver implements Resolve<ReviewDB[]> {

  constructor(public back: BackEndService, public user: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ReviewDB[]> {
    let userId = this.user.getID();
    // load current user
    if (userId == undefined) {
      userId = this.user.getID();
    }
    if (userId === undefined) {
      // not logged in and trying to access his own profile TODO
    }
    return this.back.getReviewsOfUser(userId);
  }
}
