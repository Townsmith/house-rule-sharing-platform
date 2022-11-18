import {UserDB} from './user-d-b';

export class CommentDB {
  id: number;
  text: string;
  house_rule: number;
  author: UserDB;
  createdAt: string;
  createdAtDate: Date;

  constructor(id: number, attributes: CommentDB) {
    this.id = id;
    this.text = attributes.text;
    this.house_rule = attributes.house_rule;
    this.createdAt = attributes.createdAt;
    this.createdAtDate = new Date(this.createdAt);
    if (attributes.author) {
      // @ts-ignore
      this.author = new UserDB(attributes.author.data?.id, attributes.author.data?.attributes);
    } else {
      this.author = undefined;
    }
  }
}

export class ReviewDB {
  id: number;
  title: string;
  description: string;
  playtesting: boolean;
  quality: number;
  complexity: number;

  user_likes: UserDB[];
  user_dislikes: UserDB[];
  house_rule: number;
  house_rule_title: string;
  author: UserDB;

  rating: number;
  createdAt: string;

  constructor(id: number,attributes: ReviewDB) {
    this.id = id;
    this.createdAt = attributes.createdAt;
    this.title = attributes.title;
    this.description = attributes.description;
    this.playtesting = attributes.playtesting;
    this.quality = attributes.quality;
    this.complexity = attributes.complexity;
    if (attributes.author) {
      // @ts-ignore
      this.author = new UserDB(attributes.author.data?.id, attributes.author.data?.attributes);
    } else {
      this.author = undefined;
    }

    // @ts-ignore
    if (attributes.house_rule?.data) {
      // @ts-ignore
      this.house_rule = attributes.house_rule.data.id;
    }

    // @ts-ignore
    if (attributes.house_rule?.data) {
      // @ts-ignore
      this.house_rule_title = attributes.house_rule.data.attributes.title;
    }


    if (attributes.user_likes == null) {
      // @ts-ignore
      attributes.user_likes = {data: []};
    }
    this.user_likes = [];
    // @ts-ignore
    if (attributes.user_likes.data) {
      // @ts-ignore
      for (const usr of attributes.user_likes.data) {
        this.user_likes.push(new UserDB(usr.id, usr));
      }
    }


    if (attributes.user_dislikes == null) {
      // @ts-ignore
      attributes.user_dislikes = {data: []};
    }
    this.user_dislikes = [];

    // @ts-ignore
    if (attributes.user_dislikes.data) {
      // @ts-ignore
      for (const usr of attributes.user_dislikes.data) {
        this.user_dislikes.push(new UserDB(usr.id, usr));
      }
    }


    this.rating = this.user_likes.length - this.user_dislikes.length;
  }

}
