import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HouseRuleFilled} from '../data/house-rule-d-b';
import {BackEndService} from './back-end.service';

@Injectable({
  providedIn: 'root'
})
export class TopMonthDiscResolver implements Resolve<HouseRuleFilled> {

  constructor(public back: BackEndService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<HouseRuleFilled> {
    return await this.back.getTopRuleOfTheMonth((a,b) => {
      return b.reviews.length - a.reviews.length;
    });
  }
}
