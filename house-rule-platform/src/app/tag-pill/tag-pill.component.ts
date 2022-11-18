import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../../data/tag';

@Component({
  selector: 'tag-pill',
  templateUrl: './tag-pill.component.html',
  styleUrls: ['./tag-pill.component.scss']
})
export class TagPillComponent implements OnInit {

  @Input()
  tag: Tag;

  @Input()
  active: boolean;

  @Input()
  showRemove: boolean;

  @Output()
  close = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
