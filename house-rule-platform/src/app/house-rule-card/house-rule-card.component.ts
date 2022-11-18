import {Component, Input, OnInit} from '@angular/core';
import {HouseRuleDB, HouseRuleFilled} from '../../data/house-rule-d-b';
import {styleBinderImage} from '../../data/image-d-b';
import {BGGBoardGameData} from '../../data/BGGBoardGameData';
import {BackEndService} from '../back-end.service';
import {UserService} from '../user.service';
import {GameInfoDB} from '../../data/game-info-d-b';

@Component({
  selector: 'house-rule-card',
  templateUrl: './house-rule-card.component.html',
  styleUrls: ['./house-rule-card.component.scss']
})
export class HouseRuleCardComponent implements OnInit {

  @Input()
  hr: HouseRuleFilled;

  gameInfo: GameInfoDB;

  @Input()
  preview: boolean;

  styleBinder: (HouseRuleFilled, string) => string = styleBinderImage;

  constructor(public back: BackEndService, public user: UserService) {

  }

  ngOnInit(): void {
    this.gameInfo = this.hr.gameInfoFilled;
  }

  ruleIsDisliked() {
    return this.user.info?.disliked_rules?.some(x => x.id === this.hr.id);
  }

  ruleIsLiked() {
    return this.user.info?.liked_rules?.some(x => x.id === this.hr.id);
  }

  getReviewCount() {
    const num = this.hr?.reviewsFilled?.length;
    return num;
  }
}
