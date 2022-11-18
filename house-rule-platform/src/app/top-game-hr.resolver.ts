import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {BackEndService} from './back-end.service';
import {HouseRuleFilled} from '../data/house-rule-d-b';

@Injectable({
  providedIn: 'root'
})
export class TopGameHrResolver implements Resolve<HouseRuleFilled> {
  constructor(public back: BackEndService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<HouseRuleFilled> {
    return (await this.back.getTopRuleForLatestGame())[0];
  }
}
