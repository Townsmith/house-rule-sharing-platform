import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackEndService} from './back-end.service';
import {HouseRuleFilled} from '../data/house-rule-d-b';

@Injectable({
  providedIn: 'root'
})
export class TopMonthHrResolver implements Resolve<HouseRuleFilled> {

  constructor(public back: BackEndService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<HouseRuleFilled> {
    return await this.back.getTopRuleOfTheMonth((a,b) => {
      return b.rating - a.rating;
    });
  }
}
