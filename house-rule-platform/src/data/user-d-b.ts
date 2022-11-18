import {ImageDBOptions} from './image-d-b';
import {HouseRuleDB, HouseRuleFilled} from './house-rule-d-b';
import {ReviewDB} from './review-d-b';

export class UserDB {
  id: number;
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  updatedAt: string;
  username: string;
  title: string;
  professional: boolean;
  bggUserName: string;

  // Ids
  avatar: number;

  constructor(id: number, attributes: UserDB) {
    this.id = id;
    this.blocked = attributes?.blocked;
    this.confirmed = attributes?.confirmed;
    this.createdAt = attributes?.createdAt;
    this.email = attributes?.email;
    this.professional = attributes?.professional;
    this.title = attributes?.title;
    this.username = attributes?.username;
    this.updatedAt = attributes?.updatedAt;
    this.bggUserName = attributes?.bggUserName;


  }

}

export class UserFilled extends UserDB {

  favorite_rules: HouseRuleFilled[] = [];
  liked_rules: HouseRuleDB[] = [];
  disliked_rules: HouseRuleDB[] = [];

  liked_reviews: ReviewDB[] = [];
  disliked_reviews: ReviewDB[] = [];

  constructor(id: number, attributes: UserDB) {
    super(id, attributes);


    // @ts-ignore
    if (attributes.favorite_rules == null) {
      // @ts-ignore
      attributes.favorite_rules = {data: []};
    }
    // @ts-ignore
    if (attributes.favorite_rules.data == null) {
      // @ts-ignore
      attributes.favorite_rules.data = attributes.favorite_rules;
    }
    this.favorite_rules = [];
    // @ts-ignore
    for (const rule of attributes.favorite_rules.data) {
      this.favorite_rules.push(new HouseRuleFilled({id: rule.id, attributes: rule}))
    }

    // @ts-ignore
    if (attributes.liked_rules == null) {
      // @ts-ignore
      attributes.liked_rules = {data: []};
    }
    // @ts-ignore
    if (attributes.liked_rules.data == null) {
      // @ts-ignore
      attributes.liked_rules.data = attributes.liked_rules;
    }
    this.liked_rules = [];
    // @ts-ignore
    for (const rule of attributes.liked_rules.data) {
      this.liked_rules.push(new HouseRuleDB({id: rule.id, attributes: rule}))
    }

    // @ts-ignore
    if (attributes.disliked_rules == null) {
      // @ts-ignore
      attributes.disliked_rules = {data: []};
    }
    // @ts-ignore
    if (attributes.disliked_rules.data == null) {
      // @ts-ignore
      attributes.disliked_rules.data = attributes.disliked_rules;
    }
    this.disliked_rules = [];
    // @ts-ignore
    for (const rule of attributes.disliked_rules.data) {
      this.disliked_rules.push(new HouseRuleDB({id: rule.id, attributes: rule}))
    }


    // @ts-ignore
    if (attributes.liked_reviews == null) {
      // @ts-ignore
      attributes.liked_reviews = {data: []};
    }
    // @ts-ignore
    if (attributes.liked_reviews.data == null) {
      // @ts-ignore
      attributes.liked_reviews.data = attributes.liked_reviews;
    }
    this.liked_reviews = [];
    // @ts-ignore
    for (const rev of attributes.liked_reviews.data) {
      // @ts-ignore
      this.liked_reviews.push(new ReviewDB(rev.id, rev))
    }

    // @ts-ignore
    if (attributes.disliked_reviews == null) {
      // @ts-ignore
      attributes.disliked_reviews = {data: []};
    }
    // @ts-ignore
    if (attributes.disliked_reviews.data == null) {
      // @ts-ignore
      attributes.disliked_reviews.data = attributes.disliked_reviews;
    }
    this.disliked_reviews = [];
    // @ts-ignore
    for (const rev of attributes.disliked_reviews.data) {
      // @ts-ignore
      this.disliked_reviews.push(new ReviewDB(rev.id, rev))
    }

  }
}


export interface BGGUser {
  avatarlink: string;
  battlenetaccount: string;
  country: string;
  firstname: string;
  hot: {item: bggListItem[]};
  top: {item: bggListItem[]};
  lastlogin: string;
  lastname: string;
  psnaccount: string;
  stateorprovince: string;
  steamaccount: string;
  traderating: string;
  webaddress: string;
  wiiaccount: string;
  xboxaccount: string;
  yearregistered: string;
  _id: string;
  _name: string;
  _termsofuse: string;
}

interface bggListItem {
  _rank: string;
  _type: string;
  _id: string;
  _name: string;
}


