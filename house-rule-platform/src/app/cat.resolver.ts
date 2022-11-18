import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {BackEndService} from './back-end.service';
import {Tag} from '../data/tag';

@Injectable({
  providedIn: 'root'
})
export class CatResolver implements Resolve<Tag[]> {

  constructor(public back: BackEndService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Tag[]> {
    return (await this.back.getCats()).sort((a,b) => a.name.localeCompare(b.name));
  }
}
