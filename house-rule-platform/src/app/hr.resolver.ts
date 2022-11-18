import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackEndService} from './back-end.service';
import {HouseRuleFilled} from '../data/house-rule-d-b';

@Injectable({
  providedIn: 'root'
})
export class HrResolver implements Resolve<HouseRuleFilled[]> {

  constructor(public back: BackEndService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<HouseRuleFilled[]> {
    return this.back.getHouseRules();
  }
}
