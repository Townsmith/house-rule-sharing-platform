import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {HouseRuleFilled} from '../data/house-rule-d-b';
import {BackEndService} from './back-end.service';

@Injectable({
  providedIn: 'root'
})
export class SingleHrResolver implements Resolve<HouseRuleFilled> {

  constructor(public back: BackEndService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<HouseRuleFilled> {
    return this.back.getHouseRule(route.paramMap.get('id'));
  }
}
