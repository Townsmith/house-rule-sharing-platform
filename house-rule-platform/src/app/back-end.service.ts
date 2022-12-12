import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import axios from 'axios';
import {HouseRuleDB, HouseRuleFilled} from '../data/house-rule-d-b';
import * as X2JS from 'x2js';
import {Tag} from '../data/tag';
import {UserDB, UserFilled} from '../data/user-d-b';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReviewDB} from '../data/review-d-b';
import {BGGV1, BGGV1Data} from '../data/BGGBoardGameData';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  xml = new X2JS();
  targetURL = 'http://localhost:1337/api/';
  myBackURL = 'http://localhost:8000';

  constructor(public user: UserService,
              public snack: MatSnackBar) {
    this.initUserData();
  }

  async initUserData() {
    this.user.info = await this.getUser(this.user.getID());
    if (this.user.info) {
      this.user.bggInfo = await this.getBGGUser(this.user.info.bggUserName);
      this.user.bggCollection = await this.getBGGUserCollection(this.user.info.bggUserName);
    }

  }

  // BGG REQUESTS
  async getBGGUser(bggUserName: string) {
    let response;
    try {
      const url = `${this.myBackURL}/bggUser/${bggUserName}`;
      response = await axios.get(url,{
        headers: {
          'Access-Control-Allow-Origin': true
        }
      });
    } catch (e) {
      console.log('An error occurred:', e.response);
    }
    return response.data.user;
  }

  async getBoardGameV1ByID(id: string | number): Promise<BGGV1> {
    let response;
    try {
      const url = `${this.myBackURL}/boardgameV1/${id}`;
      response = await axios.get(url,{
        headers: {
          'Access-Control-Allow-Origin': true
        }
      });
    } catch (e) {
      console.log('An error occurred:', e.response);
    }
    console.log(response);
    return response.data;
  }

  async getBoardGame(name: string, exact: boolean): Promise<any> {
    let response;
    console.log(exact);
    try {
      const url = `${this.myBackURL}/boardgame/${name}&${exact ? 1 : 0}`;
      response = await axios.get(url, {
        headers: {
          'Access-Control-Allow-Origin': true
        }
      });
    } catch (e) {
      console.log('An error occurred:', e.response);
    }
    console.log(response);
    return response.data;
  }

  async getBGGUserCollection(bggUserName: string) {
    let response;
    try {
      let status = '202';
      const url = `${this.myBackURL}/bggUserCollection/${bggUserName}`;
      while (status == '202') {
        response = await axios.get(url,{
          headers: {
            'Access-Control-Allow-Origin': true
          }
        });
        status = response.status;
      }
    } catch (e) {
      console.log('An error occurred:', e.response);
    }
    return response.data.items.item;
  }

  // END BGG REQUESTS

  async getHouseRules(): Promise<HouseRuleFilled[]> {
    try {
      const response = await axios.get(`${this.targetURL}house-rules?populate=deep,3`, {});
      let hrs = [];
      for (const data of response.data.data) {
        // @ts-ignore
        const hr = new HouseRuleFilled(data);
        hr.reviewsFilled = hr.reviewsFilled.filter(x => x.playtesting === hr.testing);
        hrs.push(hr);
      }
      return hrs;
    } catch (error) {
      console.log('An error occurred:', error);
      return undefined;
    }
  }

  async getHouseRule(id: string): Promise<HouseRuleFilled> {
    try {
      const response = await axios.get(`${this.targetURL}house-rules/${id}?&populate=deep,3`, {});
      let res = new HouseRuleFilled(response.data.data);
      return res;
    } catch (error) {
      console.log('An error occurred:', error);
      return undefined;
    }
  }

  async getTags(): Promise<Tag[]> {
    try {
      const res = (await axios.get(`${this.targetURL}tags`, {})).data.data;
      return res.map(x => new Tag(x.attributes.name, x.id));
    } catch (error) {
      console.log('An error occurred:', error.response);
      return null;
    }
  }

  async getCats(): Promise<Tag[]> {
    try {
      const res = (await axios.get(`${this.targetURL}game-categories`, {})).data.data;
      return res.map(x => new Tag(x.attributes.name, x.id));
    } catch (error) {
      console.log('An error occurred:', error.response);
      return null;
    }
  }

  async getHouseRuleById(id: number, pop: boolean) {
    let response = undefined;
    try {
      const url = `${this.targetURL}house-rules/${id}${pop ? '?populate=*' : ''}`;
      console.log(url);
      response = await axios.get(url, {});
      console.log(response);
    } catch (e) {
      console.log('An error occurred:', e.response);
    }
    return response?.data.data;
  }

  async addHouseRule(hr: HouseRuleDB): Promise<number> {
    try {
      const response = await axios.post(`${this.targetURL}house-rules`, {data: hr}, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`
        }
      });
      // @ts-ignore
      return response.data.data.id;
    } catch (e) {
      console.log('An error occurred:', e.response);
    }
    return 0;
  }

  async uploadIMG(thumbnail: Blob) {
    let response;
    try {
      const fD = new FormData();
      fD.append('files', thumbnail);
      const fileUpload = await axios.post(`${this.targetURL}upload`, fD, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      response = fileUpload;
    } catch (e) {
      console.error(e);
    }
    return response;

  }

  async linkUserToBGG(id: number, bggUserName: string) {
    try {
      const response = await axios.put(`${this.targetURL}users/${id}`, {bggUserName}, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response);
    } catch (e) {
      console.log('An error occurred:', e.response);
    }
  }

  async getUser(userId: number): Promise<UserFilled> {
    let res;
    try {
      res = await axios.get(`${this.targetURL}users/${userId}?populate=deep,3`);
    } catch (error) {
      console.log('An error occurred:', error);
      return undefined;
    }
    if (res.status == 204) {
      return null;
    }
    return new UserFilled(res.data.id, res.data);
  }

  async updateLikesDislikes(user: UserFilled) {
    try {
      const response = await axios.put(`${this.targetURL}users/${user.id}`, {
        favorite_rules: user.favorite_rules,
        liked_rules: user.liked_rules,
        disliked_rules: user.disliked_rules,
        disliked_reviews: user.disliked_reviews,
        liked_reviews: user.liked_reviews,
      }, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response);
    } catch (e) {
      console.log('An error occurred:', e.response);
    }
  }

  async addReview(data: { playtesting: boolean; complexity: any; author: number; description: any; house_rule: number; id: undefined; title: any; quality: any }) {
    const response = await axios.post(`${this.targetURL}reviews`, {data}, {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
  }

  async getHouseRulesOfUser(userID: number): Promise<HouseRuleFilled[]> {
    let res;
    try {
      res = await axios.get(`${this.targetURL}house-rules?populate=deep,3&filters[author][id][$eq]=${userID}`);
      let hrs = [];
      for (const data of res.data.data) {
        // @ts-ignore
        const hr = new HouseRuleFilled(data);
        hr.reviewsFilled = hr.reviewsFilled.filter(x => x.playtesting === hr.testing);
        hrs.push(hr);
      }
      return hrs;
    } catch (error) {
      console.log('An error occurred:', error);
      return undefined;
    }
  }

  async getReviewsOfUser(userID: number) {
    let res;
    try {
      res = await axios.get(`${this.targetURL}reviews?populate=*&filters[author][id][$eq]=${userID}`);
      let reviews = [];
      for (const data of res.data.data) {
        // @ts-ignore
        const rev = new ReviewDB(data.id, data.attributes);
        reviews.push(rev);
      }
      return reviews;
    } catch (error) {
      console.log('An error occurred:', error);
      return undefined;
    }
  }

  async getTopRuleOfTheMonth(sorter): Promise<HouseRuleFilled> {
    let res;
    try {
      const aMonth = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 30));
      const date = `${aMonth.getFullYear()}-${aMonth.getMonth()}-${aMonth.getDay()}`;
      res = await axios.get(`${this.targetURL}house-rules?populate=deep,3&filters[created_at][$gt]=${date}`);
      const hrs = [];
      for (const data of res.data.data) {
        // @ts-ignore
        const hr = new HouseRuleFilled(data);
        hr.reviewsFilled = hr.reviewsFilled.filter(x => x.playtesting === hr.testing);
        hrs.push(hr);
      }
      hrs.sort(sorter);
      return hrs[0];
    } catch (error) {
      console.log('An error occurred:', error);
      return undefined;
    }
  }

  async addCategories(categories: BGGV1Data[]) {
    const arr = [];
    for (const cat of categories) {
      arr.push({id: undefined, name: cat.__text});
    }
    const ids = [];
    for (const obj of arr) {
      try {
        const response = await axios.post(`${this.targetURL}game-categories`, {data: obj}, {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem('token')}`
          }
        });
        // @ts-ignore
        ids.push(response.data.data.id);
      } catch (e) {
        const info = await axios.get(`${this.targetURL}game-categories?filters[name][$eq]=${obj.name}`, {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem('token')}`
          }
        });
        ids.push(info.data.data[0].id);
      }
    }

    return ids;
  }

  async addDesigners(designers: BGGV1Data[]) {
    const arr = [];
    for (const cat of designers) {
      arr.push({id: undefined, name: cat.__text});
    }
    const ids = [];
    for (const obj of arr) {
      try {
        const response = await axios.post(`${this.targetURL}game-designers`, {data: obj}, {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem('token')}`
          }
        });
        // @ts-ignore
        ids.push(response.data.data.id);
      } catch (e) {
        const info = await axios.get(`${this.targetURL}game-designers?filters[name][$eq]=${obj.name}`, {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem('token')}`
          }
        });
        ids.push(info.data.data[0].id);
      }
    }

    return ids;
  }

  async addGameInfo(gameInfo: any) {
    try {
      const response = await axios.post(`${this.targetURL}game-infos`, {data: gameInfo}, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`
        }
      });
      // @ts-ignore
      return response.data.data.id;
    } catch (e) {
      console.error(e);
    }
  }

  async updateGameInfo(gameInfo: any) {
    try {
      const response = await axios.put(`${this.targetURL}game-infos/${gameInfo.id}`, {data: gameInfo}, {
        headers: {
          Authorization:
              `Bearer ${localStorage.getItem('token')}`
        }
      });
      // @ts-ignore
      return response.data.data.id;
    } catch (e) {
      console.error(e);
    }
  }

  async getGameInfoByBGGID(bggID: any) {
    try {
      const response = await axios.get(`${this.targetURL}game-infos?filters[BGGGameID][$eq]=${bggID}`, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`
        }
      });
      // @ts-ignore
      return response.data.data[0];
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async deleteRule(hr: HouseRuleFilled) {
    try {
      const response = await axios.delete(`${this.targetURL}house-rules/${hr.id}`, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (e) {
      console.error(e);
      return null;
    }
    for (const rev of hr.reviews) {
      try {
        const response = await axios.delete(`${this.targetURL}reviews/${rev}`, {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem('token')}`
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  async login(value: any): Promise<UserDB> {
    let res;
    try {
      res = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: value.user,
        password: value.pw,
      });
      localStorage.setItem('token', res.data.jwt);
      localStorage.setItem('id', res.data.user.id);
      this.initUserData();
      this.user.auth = true;
    } catch (error) {
      this.snack.open(error.response.data.error.message, undefined, {duration: 2000});
      console.log('An error occurred:', error.response);
      return undefined;
    }
    return res.data.user;
  }

  async register(value: any) {
    let res;
    try {
      res = await axios.post('http://localhost:1337/api/auth/local/register', {
        username: value.usernameReg,
        email: value.emailReg,
        password: value.pwReg,
        title: 'Hobbyist Board Gamer'
      });
      localStorage.setItem('token', res.data.jwt);
      localStorage.setItem('id', res.data.user.id);
      this.initUserData();
      this.user.auth = true;
    } catch (error) {
      this.snack.open(error.response.data.error.message, undefined, {duration: 2000});
      console.log('An error occurred:', error.response);
      return undefined;
    }
    return res.data.user;
  }

  async getTopRuleForLatestGame() {
    let res;
    const hrs = [];
    try {
      res = await axios.get(`${this.targetURL}game-infos?sort=createdAt:desc`);
      const latest = res.data.data[0];
      const res2 = await axios.get(`${this.targetURL}house-rules?populate=deep,3&filters[BGGGameID][$eq]=${latest.attributes.BGGGameID}`)
      for (const data of res2.data.data) {
        // @ts-ignore
        const hr = new HouseRuleFilled(data);
        hr.reviewsFilled = hr.reviewsFilled.filter(x => x.playtesting === hr.testing);
        hrs.push(hr);
      }
      hrs.sort((a,b) => {return b.rating - a.rating});
    } catch (error) {
      console.log('An error occurred:', error);
      return undefined;
    }
    return hrs;
  }

  async addComment(data: {author: number; house_rule: number; id: undefined; text: any}) {
    const response = await axios.post(`${this.targetURL}comments`, {data}, {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
  }
}
