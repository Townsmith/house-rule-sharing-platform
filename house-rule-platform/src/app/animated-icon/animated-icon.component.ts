import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'animated-icon',
  templateUrl: './animated-icon.component.html',
  styleUrls: ['./animated-icon.component.scss'],
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
export class AnimatedIconComponent implements OnInit {

  @Input()
  icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
