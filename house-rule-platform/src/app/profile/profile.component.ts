import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BackEndService} from '../back-end.service';
import {LoaderService} from '../loader.service';
import {BGGUser, UserDB, UserFilled} from '../../data/user-d-b';
import {HouseRuleFilled} from '../../data/house-rule-d-b';
import {Tag} from '../../data/tag';
import {ReviewDB} from '../../data/review-d-b';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  self: boolean;
  notFound: boolean;

  userData: UserFilled;
  bggUserData: BGGUser;

  bggUserName: string = 'shanev316';
  userHrs: HouseRuleFilled[];
  filteredUserHrs: HouseRuleFilled[];

  filteredUserBookmarks: HouseRuleFilled[];

  DBTags: Tag[];
  DBCats: Tag[];
  reviews: ReviewDB[];
  reviewScore: number;
  bggUserNameInput: string;

  constructor(public user: UserService,
              public backEnd: BackEndService,
              public router: Router,
              public actived: ActivatedRoute,
              public loading: LoaderService) { }

  ngOnInit(): void {
    this.userData = this.actived.snapshot.data.user;
    this.reviews = this.actived.snapshot.data.reviews;
    this.reviewScore = 0;
    for (const review of this.reviews) {
      this.reviewScore += review.rating;
    }
    this.filteredUserBookmarks = this.userData.favorite_rules;
    this.filteredUserBookmarks.forEach(x => x.authorFilled = this.userData);
    this.bggUserName = this.actived.snapshot.data.bgg;
    this.userHrs = this.actived.snapshot.data.hrs;
    this.DBTags = this.actived.snapshot.data.tags;
    this.DBCats = this.actived.snapshot.data.cats;
    this.filteredUserHrs = this.userHrs;
    const userId = this.actived.snapshot.paramMap.get('id');
    if (userId == null) {
      this.self = true;
    }
  }

  async connectToBGG() {
    this.loading.loading = true;
    // Update Data
    if (this.bggUserName) {
      const user = await this.backEnd.getBGGUser(this.bggUserName);
      this.user.setBGGInfo(user);
      if (user !== undefined) {
        await this.backEnd.linkUserToBGG(this.user.getID(), this.bggUserName)
      }
    } else {
      // link new one
      if (this.bggUserNameInput) {
        await this.backEnd.linkUserToBGG(this.user.getID(), this.bggUserNameInput)
        this.bggUserName = this.bggUserNameInput;
      }
    }

    window.location.reload();

    this.loading.loading = false;
  }
}
