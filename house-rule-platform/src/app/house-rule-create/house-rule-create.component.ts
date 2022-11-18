import {Component, OnInit} from '@angular/core';
import {BackEndService} from '../back-end.service';
import {UserService} from '../user.service';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Tag} from '../../data/tag';
import {HouseRuleDB, HouseRuleFilled} from '../../data/house-rule-d-b';
import {File} from '@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoaderService} from '../loader.service';
import {BGGBoardGameData, BGGSearchData, boardGameSorting} from '../../data/BGGBoardGameData';

import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {isArray} from 'rxjs/internal-compatibility';

export const awardAnimations = trigger('awardAnimations', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger('50ms', animate('400ms ease-out', style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
  ]),
]);

@Component({
  selector: 'app-house-rule-create',
  templateUrl: './house-rule-create.component.html',
  styleUrls: ['./house-rule-create.component.scss'],
  animations: [awardAnimations],
})
export class HouseRuleCreateComponent implements OnInit {

  // used for display and DB
  hr: HouseRuleFilled;
  potentialBoardGames: BGGSearchData[] = [];

  constructor(public back: BackEndService,
              public user: UserService,
              private snack: MatSnackBar,
              private loader: LoaderService,
              public aRoute: ActivatedRoute,
              public router: Router) {
  }

  thumbnail: File;
  gallery: Map<number, File> = new Map<number, File>();
  galleryIMGs: Map<number, (string | ArrayBuffer)> = new Map<number, string | ArrayBuffer>();
  thumbnailIMG: string | ArrayBuffer;
  userAddedTagsArray: Tag[] = [];
  contentTagsArray: Tag[] = [];
  houseRuleFormGroup: FormGroup;
  title: FormControl;
  BGGTitle: FormControl;
  description: FormControl;
  testing: FormControl;
  complexity: FormControl;
  tags: FormControl;
  userAddedTags: FormControl;
  video_embedding: FormControl;
  parent: FormControl;
  officialRulesLink: FormControl;
  officialRulesDescription: FormControl;
  version: FormControl;
  game_edition: FormControl;

  bggBoardGame: FormControl;

  activeStep: string;

  DBTags: Tag[];

  fr: FileReader;
  showStepError: boolean;

  ngOnInit(): void {
    if (!this.user.auth) {
      this.router.navigateByUrl('/home');
      return;
    }
    this.fr = new FileReader();
    this.fr.onload = () => {
      this.thumbnailIMG = this.fr.result;
      // @ts-ignore
      (document.getElementById('thumbnailPreview') as HTMLImageElement).src = this.thumbnailIMG;
    }

    this.DBTags = this.aRoute.snapshot.data.tags;
    this.DBTags = this.DBTags.sort((a, b) => a.name.localeCompare(b.name));
    this.activeStep = 'create';
    this.title = new FormControl(
      '',
      [
        Validators.required,
      ]
    );
    this.BGGTitle = new FormControl(
      '',
      [
        Validators.required,
      ]
    );
    this.description = new FormControl(
      '',
      [
        Validators.required,
      ]
    );
    this.testing = new FormControl(
      '',
      [
        Validators.required,
      ]
    );
    this.tags = new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    );
    this.userAddedTags = new FormControl(
      '',
      []
    );
    this.video_embedding = new FormControl(
      '',
      []
    );
    this.parent = new FormControl(
      '',
      []
    );
    this.officialRulesLink = new FormControl(
      '',
      []
    );
    this.officialRulesDescription = new FormControl(
      '',
      []
    );
    this.version = new FormControl(
        '',
        []
    );
    this.game_edition = new FormControl(
      '',
      []
    );
    this.complexity = new FormControl(
      '',
      [
        Validators.required,
      ]
    );
    this.bggBoardGame = new FormControl(
      '',
      [
        Validators.required,
      ]
    );
    this.testing.setValue(true);
    this.houseRuleFormGroup = new FormGroup({
      title: this.title,
      description: this.description,
      testing: this.testing,
      complexity: this.complexity,
      video_embedding: this.video_embedding,
      officialRulesDescription: this.officialRulesDescription,
      version: this.version,
      officialRulesLink: this.officialRulesLink,
      bggBoardGame: this.bggBoardGame,
      userAddedTags: this.userAddedTags,
      tags: this.tags,
      BGGTitle: this.BGGTitle,
      game_edition: this.game_edition
    });

    this.initByURL();

    // this.initVars();
  }

  async initByURL() {
    const gameName = this.aRoute.snapshot.paramMap.get('gameName');
    if (gameName) {
      this.BGGTitle.setValue(gameName);
      await this.searchBGGByName();
      this.selectBGGGame(this.potentialBoardGames[0]);
    }

    const parentID = this.aRoute.snapshot.paramMap.get('parent');
    if (parentID) {
      this.parent.setValue('http://localhost:4200/rule/'+parentID);
      this.parent.disable();
    }
    const version = this.aRoute.snapshot.paramMap.get('version');
    if (version) {
      this.version.setValue(version);
      this.version.disable();
      this.bggBoardGame.disable();
      this.BGGTitle.disable();
    }
    const parentName = this.aRoute.snapshot.paramMap.get('parentName');
    if (parentName) {
      let name = parentName;
      if (version) {
        name += `V${version}`
      } else {
        name += '(Variant)'
      }
      this.title.setValue(name);
    }
  }

  async initVars() {
    this.video_embedding.setValue('https://www.youtube.com/watch?v=I3QJ8Pgjj3c');
    this.officialRulesDescription.setValue('Page 16, Paragraph 3. The one about the robber.');
    this.officialRulesLink.setValue('https://www.youtube.com/watch?v=I3QJ8Pgjj3c');
    this.title.setValue('Card stacking variant');
    this.parent.setValue('http://localhost:4200/rule/71');
    this.version.setValue(2);
    this.BGGTitle.setValue('Catan');
    this.bggBoardGame.setValue({
      _id: '13',
      name: {_type: 'primary', _value: 'CATAN'},
      yearpublished: {_value: '1997'}
    });
    this.description.setValue('Whenever you roll a 7, do not move the robber. Instead take one resource from the bank.')
    this.complexity.setValue('4');
    // this.changeToPreview();
    // const testHr = new HouseRuleDB((await this.back.getHouseRuleById(6, true)));
    // console.log(this.testHr);
  }

  tagValidator() {
    return true;
  }

  async onSubmit() {
    if (this.houseRuleFormGroup.valid) {
      // await this.fillHR();
      this.loader.loading = true;
      const ruleID = await this.back.addHouseRule(this.hr);
      await this.router.navigateByUrl('/rule/' + ruleID);
      this.snack.open('House Rule successfully saved!', undefined, {duration: 2000});
      this.loader.loading = false;
    } else {
      this.houseRuleFormGroup.markAllAsTouched();
      window.scrollTo(0, 0);
    }
  }

  startFileUpload() {
    document.getElementById('imageUploader').click();
  }

  startFileUpload2() {
    document.getElementById('imageUploader2').click();
  }

  thumbnailUploaded(e: any) {
    if (e.target.files.length > 0) {
      this.thumbnail = e.target.files[0];
      this.fr.readAsDataURL(this.thumbnail as unknown as Blob);
    }
  }

  galleryUploaded(e: any) {
    if (e.target.files.length > 0) {
      let id = 0;
      this.galleryIMGs.clear();
      this.gallery.clear();
      for (const file of e.target.files) {
        const localId = id;
        const fr = new FileReader();
        fr.onload = () => {
          console.log('IMG loaded');
          this.galleryIMGs.set(localId, fr.result);
        }
        fr.readAsDataURL(file);
        this.gallery.set(id, file);
        id ++
      }
    }
  }

  addToUserTags() {
    const val = this.userAddedTags.value;
    if (val !== '') {
      this.userAddedTagsArray.push(new Tag(val));
    }
    this.userAddedTags.setValue('');
  }

  removeFromUserAddedTags(tag: Tag) {
    const ind = this.userAddedTagsArray.indexOf(tag);
    if (ind === -1) {
      console.error('This tag is not available');
    } else {
      this.userAddedTagsArray.splice(ind, 1);
    }
  }

  selectBGGGame(bg: BGGSearchData) {
    this.bggBoardGame.setValue(bg);
  }

  async changeToPreview() {
    if (this.houseRuleFormGroup.valid) {
      await this.fillHR();
      this.activeStep = 'preview';
    } else {
      this.houseRuleFormGroup.markAllAsTouched();
      this.snack.open('Please fill out all required fields', undefined, {duration: 2000});
      this.showStepError = true;
      window.scrollTo(0, 0);
    }
  }

  async fillHR() {
    this.loader.loading = true;
    const attributes = this.houseRuleFormGroup.value;

    attributes.author = this.user.getID();

    if (this.thumbnail !== undefined) {
      const thumbnailData = await this.back.uploadIMG(this.thumbnail as unknown as Blob);
      attributes.thumbnail = thumbnailData;
      if (attributes.thumbnail.data.length > 0) {
        attributes.thumbnail.data = attributes.thumbnail.data[0];
      }
      attributes.thumbnail.data.attributes = attributes.thumbnail.data;
    }

    if (this.gallery.size > 0) {
      let galleryData = [];
      for (const file of this.gallery.values()) {
        const filedata = await this.back.uploadIMG(file as unknown as Blob);
        galleryData.push(filedata);
      }
      galleryData.forEach(x => x.data = x.data[0]);
      attributes.gallery = galleryData;
      attributes.gallery.data = galleryData.map(x => x.data);
      attributes.gallery.data.attributes = galleryData;
    }

    const activeTags = this.DBTags?.filter(x => x.active);
    let arr = [];
    for (const tag of activeTags) {
      arr.push({
        id: tag.id,
        attributes: {
          name: tag.name
        }
      });
    }

    attributes.tags.data = arr;
    attributes.BGGGameID = parseInt(attributes.bggBoardGame._id, 10);
    attributes.userAddedTags = this.userAddedTagsArray;
    attributes.video_embedding = attributes.video_embedding.replace('watch?v=', 'embed/');
    if (this.parent.value) {
      debugger;
      attributes.parent = this.parent.value.split('/').at(-1);
    }


    this.hr = new HouseRuleFilled({id: undefined, attributes});

    let gameInfo;
    let gameInfoID;
    gameInfo = await this.back.getGameInfoByBGGID(this.hr.BGGGameID);
    let tooOld = false;
    if (gameInfo !== null) {
      const aMonth = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 30));
      const age = new Date(gameInfo.attributes.createdAt);
      tooOld = age < aMonth;
    }

    if (gameInfo == null || tooOld) {
      const bgInfo = await this.back.getBoardGameV1ByID(this.hr.BGGGameID);
      const categories = bgInfo.boardgamecategory;
      const catIds = await this.back.addCategories(categories);
      let designer = bgInfo.boardgamedesigner;
      if (!isArray(designer)) {
        // @ts-ignore
        designer = [designer];
      }
      // @ts-ignore
      const designerIds = await this.back.addDesigners(designer);
      const gameInfoFOrDB = {
        name: this.houseRuleFormGroup.value.bggBoardGame.name._value,
        yearpublished: bgInfo.yearpublished,
        BGGGameID: bgInfo._objectid,
        thumbnail: bgInfo.thumbnail,
        game_categories: catIds,
        game_designers: designerIds
      }
      // @ts-ignore
      this.hr.gameInfoFilled = gameInfoFOrDB;
      gameInfoID = await this.back.addGameInfo(gameInfoFOrDB);
      gameInfo = gameInfoFOrDB;
    } else {
      gameInfoID = gameInfo.id;
      gameInfo = gameInfo.attributes;
    }

    this.hr.game_info = gameInfoID;
    this.hr.gameInfoFilled = gameInfo;

    this.hr.authorFilled = this.user.getInfo();
    this.hr.complexity = parseInt(this.complexity.value);
    this.hr.tagsFilled = this.DBTags?.filter(x => x.active);
    if (this.hr.tagsFilled === undefined) {
      this.hr.tagsFilled = [];
    }

    this.loader.loading = false;
    // TODO: Remove this
    // @ts-ignore
    // this.hr.parentFilled = new HouseRuleDB({id: 14, attributes: {title: 'The first rule'}});
    // this.hr.parent = 14;
  }

  async searchBGGByName() {
    this.bggBoardGame.reset();
    this.loader.loading = true;
    let res = await this.back.getBoardGame(this.BGGTitle.value, false);
    if (res.length === undefined) {
      res = [res];
    }

    res = boardGameSorting(res, this.BGGTitle.value);

    this.potentialBoardGames = res;

    this.loader.loading = false;
  }

  togglePreview() {
    if (this.activeStep === 'create') {
      this.changeToPreview();
    } else {
      this.activeStep = 'create';
    }
  }

  getThumbnailURL() {
    return this.thumbnailIMG;
  }

  private getTagValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const activeTags = this.DBTags?.filter(x => x.active);
      if (activeTags?.length < 3) {
        return {lessThanThree: {value: activeTags?.length}}
      }
      return null;
    };
  }

  activateTag(tag: Tag) {
    tag.active = !tag.active;
    this.tags.setValue(this.DBTags.filter(x => x.active));
  }

  removeFromGallery(key: number) {
    this.gallery.delete(key);
    this.galleryIMGs.delete(key);
  }
}
