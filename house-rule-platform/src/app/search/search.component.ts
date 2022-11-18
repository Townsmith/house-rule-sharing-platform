import {Component, OnInit} from '@angular/core';
import {HouseRuleFilled} from '../../data/house-rule-d-b';
import {BackEndService} from '../back-end.service';
import {ActivatedRoute} from '@angular/router';
import {Tag} from '../../data/tag';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  loading: boolean;

  first = true;

  allHouseRules: HouseRuleFilled[];
  filteredList: HouseRuleFilled[];
  DBTags: Tag[];
  DBCats: Tag[];
  playtest: boolean;
  explore: boolean;

  constructor(public back: BackEndService,
              public aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadHRs();
    this.DBTags = this.aRoute.snapshot.data.tags;
    this.DBCats = this.aRoute.snapshot.data.cats;
    this.playtest = this.aRoute.snapshot.paramMap.get('playtest') == 'true';
    this.explore = this.aRoute.snapshot.paramMap.get('explore') == 'true';
  }

  private loadHRs() {
    this.allHouseRules = this.aRoute.snapshot.data.hrs;
    this.filteredList = this.allHouseRules;

  }
}
