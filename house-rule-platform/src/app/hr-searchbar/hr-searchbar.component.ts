import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HouseRuleFilled} from '../../data/house-rule-d-b';
import {LoaderService} from '../loader.service';
import {BackEndService} from '../back-end.service';
import {BGGSearchData, boardGameSorting} from '../../data/BGGBoardGameData';
import {Tag} from '../../data/tag';
import {UserService} from '../user.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'hr-searchbar',
  templateUrl: './hr-searchbar.component.html',
  styleUrls: ['./hr-searchbar.component.scss']
})
export class HrSearchbarComponent implements OnInit {


  showNoResults: boolean = false;

  constructor(public loader: LoaderService, public back: BackEndService, public user: UserService) { }

  @Input()
  fullList: HouseRuleFilled[];

  @Input()
  forProfile: boolean = false;

  @Input()
  DBTags: Tag[];

  @Input()
  DBCats: Tag[];

  @Input()
  professional: boolean = false;

  @Input()
  owned: boolean = false;

  @Input()
  explore: boolean = false;

  lastFilter: HouseRuleFilled[];

  potentialBoardGames: BGGSearchData[] = [];

  @Output()
  filteredList = new EventEmitter<HouseRuleFilled[]>();

  ascending: boolean = false;
  sorting: string;

  @Input()
  playtesting: boolean = false;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  textSearch: string;
  bggSearch: string;
  authorSearch: string;
  designerSearch: string;

  filteredGame: BGGSearchData;


  ngOnInit(): void {
    this.sorting = 'Rating';
    if (this.explore || this.forProfile) {
      this.filter(true);
    } else {
      this.filteredList.emit([]);
    }
  }

  filter(explore: boolean = false) {
    let res = this.fullList;
    if (this.textSearch) {
      res = res.filter(x => x.title.includes(this.textSearch));
    }
    if (this.filteredGame) {
      res = res.filter(x => x.BGGGameID === parseInt(this.filteredGame._id));
    }
    res = res.filter(x => x.testing === this.playtesting);
    if (this.professional) {
      res = res.filter(x => x.authorFilled.professional === this.professional);
    }
    if (this.DBTags.some(x => x.active)) {
      res = res.filter(x => x.tags.some(x => this.DBTags.filter(z => z.active).some(y => y.id === x)));
    }
    if (this.DBCats.some (x => x.active)) {
      res = res.filter(x => x.gameInfoFilled.game_categories.some(x => this.DBCats.filter(z => z.active).some(y => y.name === x.name)));
    }
    if (this.authorSearch) {
      res = res.filter(x => x.authorFilled.username.includes(this.authorSearch));
    }
    if (this.designerSearch) {
      res = res.filter(x => x.gameInfoFilled.game_designers.some(x => x.name.includes(this.designerSearch)));
    }
    if (this.owned) {
      res = res.filter(x => this.user.bggCollection.some(y => y._objectid == x.BGGGameID));
    }
    this.lastFilter = res;
    this.sort(explore);
  }

  sort(explore: boolean = false) {
    this.lastFilter = this.lastFilter.sort(this.getSortingFct(this.sorting, this.ascending));
    const filt = [];
    if (explore) {
      let length = 4;
      if (this.lastFilter.length < 4) {
        length = this.lastFilter.length;
      }
      for (let x = 0; x < length; x ++) {
        const randrule = this.lastFilter[Math.floor(Math.random() * this.lastFilter.length)];
        if (!filt.some(x => x.id === randrule.id)) {
          filt.push(randrule);
        } else {
          x --;
        }
      }
      this.lastFilter = filt;
    }
    this.filteredList.emit(this.lastFilter);
  }

  private getSortingFct(sorting: string, ascending: boolean) {
    switch (sorting) {
      case 'Rating':
        return (a: HouseRuleFilled,b: HouseRuleFilled) => (ascending ? 1 : -1) * Math.sign(a.rating - b.rating);
      case 'Reviews':
        return (a: HouseRuleFilled,b: HouseRuleFilled) => (ascending ? 1 : -1) * Math.sign(a.reviews.length - b.reviews.length);
      case 'Complexity':
        return (a: HouseRuleFilled,b: HouseRuleFilled) => (ascending ? 1 : -1) * Math.sign(a.complexity - b.complexity);
      case 'Date':
        return (a: HouseRuleFilled,b: HouseRuleFilled) => {
          const dateA = Date.parse(a.createdAt);
          const dateB = Date.parse(b.createdAt);
          return (ascending ? 1 : -1) * Math.sign(dateA - dateB);
        }
      default:
        return (a,b) => 0;
    }
  }

  async searchBGGByName() {
    this.loader.loading = true;
    let res = await this.back.getBoardGame(this.bggSearch, false);
    if (res.length === undefined) {
      res = [res];
    }

    res = boardGameSorting(res, this.bggSearch);

    this.potentialBoardGames = res;

    if (this.potentialBoardGames.length > 0) {
      this.selectBGGGame(res[0]);
    } else {
      this.showNoResults = true;
    }

    this.loader.loading = false;
  }

  selectBGGGame(bg: BGGSearchData) {
    if (this.filteredGame === bg) {
      this.filteredGame = undefined;
    } else {
      this.filteredGame = bg;
    }
    this.filter();
  }

  activateTag(tag: Tag) {
    tag.active = !tag.active;
    this.filter();
  }
}
