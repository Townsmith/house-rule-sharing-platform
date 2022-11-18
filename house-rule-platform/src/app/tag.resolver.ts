import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Tag} from '../data/tag';
import {BackEndService} from './back-end.service';

@Injectable({
  providedIn: 'root'
})
export class TagResolver implements Resolve<Tag[]> {

  constructor(public back: BackEndService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Tag[]> {
    return (await this.back.getTags()).sort((a,b) => a.name.localeCompare(b.name));
  }
}
