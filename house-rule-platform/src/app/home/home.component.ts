import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HouseRuleFilled} from '../../data/house-rule-d-b';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  topRule: HouseRuleFilled;
  topDiscussedRule: HouseRuleFilled;
  topGameRule: HouseRuleFilled;

  constructor(public aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.topRule = this.aRoute.snapshot.data.top;
    this.topDiscussedRule = this.aRoute.snapshot.data.disc;
    this.topGameRule = this.aRoute.snapshot.data.game;
  }

}
