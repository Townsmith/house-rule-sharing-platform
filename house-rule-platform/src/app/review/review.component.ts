import {Component, Input, OnInit} from '@angular/core';
import {ReviewDB} from '../../data/review-d-b';
import {UserService} from '../user.service';
import {BackEndService} from '../back-end.service';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input()
  rev: ReviewDB;

  @Input()
  preview: boolean;

  @Input()
  forProf: boolean;

  constructor(public user: UserService, public back: BackEndService) {
    this.forProf = false;
  }

  ngOnInit(): void {
  }

  reviewIsDisliked(rev: ReviewDB) {
    if (this.user.info == null) {
      return false;
    }
    return this.user.info.disliked_reviews?.some(x => x.id === rev.id);
  }

  reviewIsLiked(rev: ReviewDB) {
    if (this.user.info == null) {
      return false;
    }
    return this.user.info.liked_reviews?.some(x => x.id === rev.id);
  }

  async downvoteRev(rev: ReviewDB) {
    const alreadyIn = this.user.info.disliked_reviews.find(x => x.id === rev.id);
    if (alreadyIn === undefined) {
      this.user.info.disliked_reviews.push(rev);
      rev.rating--;
      const alreadyInLiked = this.user.info.liked_reviews.find(x => x.id === rev.id);
      if (alreadyInLiked) {
        this.user.info.liked_reviews.splice(this.user.info.liked_reviews.indexOf(alreadyInLiked), 1);
        rev.rating--;
      }
    } else {
      this.user.info.disliked_reviews.splice(this.user.info.disliked_reviews.indexOf(alreadyIn), 1);
      rev.rating++;
    }
    await this.back.updateLikesDislikes(this.user.info);
  }

  async upvoteRev(rev: ReviewDB) {
    const alreadyIn = this.user.info.liked_reviews.find(x => x.id === rev.id);
    if (alreadyIn === undefined) {
      this.user.info.liked_reviews.push(rev);
      rev.rating++;
      const alreadyInDis = this.user.info.disliked_reviews.find(x => x.id === rev.id);
      if (alreadyInDis) {
        this.user.info.disliked_reviews.splice(this.user.info.disliked_reviews.indexOf(alreadyInDis), 1);
        rev.rating++;
      }
    } else {
      this.user.info.liked_reviews.splice(this.user.info.liked_reviews.indexOf(alreadyIn), 1);
      rev.rating--;
    }
    await this.back.updateLikesDislikes(this.user.info);
  }

}
