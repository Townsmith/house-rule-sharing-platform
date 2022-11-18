import { Component } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {LoaderService} from './loader.service';
import {BackEndService} from './back-end.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('3s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('3s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AppComponent {
  title = 'house-rule-platform';

  constructor(public loader: LoaderService, public back: BackEndService) {
    document.addEventListener('keyup', ev => {
      if (ev.key === 'Escape') {
        this.loader.loading = false;
      }
    })
  }
}
