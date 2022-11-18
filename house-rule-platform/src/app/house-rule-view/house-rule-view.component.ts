import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {HouseRuleFilled} from '../../data/house-rule-d-b';
import {DomSanitizer} from '@angular/platform-browser';
import {BackEndService} from '../back-end.service';
import {ImageDBOptions, styleBinderImage} from '../../data/image-d-b';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReviewDB} from '../../data/review-d-b';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoaderService} from '../loader.service';
import {GameInfoDB} from '../../data/game-info-d-b';
import {environment} from '../../environments/environment';

@Component({
	selector: 'house-rule-view',
	templateUrl: './house-rule-view.component.html',
	styleUrls: ['./house-rule-view.component.scss']
})

export class HouseRuleViewComponent implements OnInit {

	@Input()
	hr: HouseRuleFilled;

	gameInfo: GameInfoDB;

	environment;

	@Input()
	preview: boolean;

	styleBinder: (HouseRuleFilled, string) => string = styleBinderImage;
	showReviewForm: boolean = false;
	showCommentForm: boolean = false;
	qualityDisplay: boolean[] = [false, false, false, false, false];
	complexityDisplay: boolean[] = [false, false, false, false, false];

	reviewFormGroup: FormGroup;
	titleFormControl: FormControl;
	descriptionFormControl: FormControl;
	qualityFormControl: FormControl;
	complexityFormControl: FormControl;

	commentFormGroup: FormGroup;
	commentFormControl: FormControl;

	ascending: boolean = false;
	sorting: string = 'Date';
	currentDate = new Date();


	constructor(public router: Router, public loading: LoaderService, public sanatizer: DomSanitizer, public back: BackEndService, public aRoute: ActivatedRoute, public user: UserService, public snack: MatSnackBar) {
	}

	ngOnInit(): void {
		this.environment = environment;
		if (this.hr == null) {
			this.hr = this.aRoute.snapshot.data.hr;
		}
		this.gameInfo = this.hr.gameInfoFilled;

		this.commentFormControl = new FormControl(
			'',
			[
				Validators.required,
			]
		);

		this.commentFormGroup = new FormGroup({
			text: this.commentFormControl
		});

		this.titleFormControl = new FormControl(
			'',
			[
				Validators.required,
			]
		);

		this.descriptionFormControl = new FormControl(
			'',
			[
				Validators.required,
			]
		);

		this.qualityFormControl = new FormControl(
			'',
			[
				Validators.required,
			]
		);

		this.complexityFormControl = new FormControl(
			'',
			[
				Validators.required,
			]
		);

		this.reviewFormGroup = new FormGroup({
			title: this.titleFormControl,
			description: this.descriptionFormControl,
			quality: this.qualityFormControl,
			complexity: this.complexityFormControl
		});

		this.sort();
	}

	ruleIsBookMarked() {
		if (this.user.info == null) {
			return false;
		}
		return this.user.getInfo().favorite_rules.some(x => x.id === this.hr.id);
	}


	ruleIsDisliked() {
		if (this.user.info == null) {
			return false;
		}
		return this.user.info.disliked_rules.some(x => x.id === this.hr.id);
	}

	ruleIsLiked() {
		if (this.user.info == null) {
			return false;
		}
		return this.user.info.liked_rules.some(x => x.id === this.hr.id);
	}

	async bookmarkHouseRule() {
		const alreadyIn = this.user.info.favorite_rules.find(x => x.id === this.hr.id);
		if (alreadyIn === undefined) {
			this.user.info.favorite_rules.push(this.hr);
		} else {
			this.user.info.favorite_rules.splice(this.user.info.favorite_rules.indexOf(alreadyIn), 1);
		}
		await this.back.updateLikesDislikes(this.user.info);
		this.snack.open('House Rule bookmarked', undefined, {duration: 2000});
	}

	async upvote() {
		const alreadyIn = this.user.info.liked_rules.find(x => x.id === this.hr.id);
		if (alreadyIn === undefined) {
			this.user.info.liked_rules.push(this.hr);
			this.hr.rating++;
			const alreadyInDis = this.user.info.disliked_rules.find(x => x.id === this.hr.id);
			if (alreadyInDis) {
				this.user.info.disliked_rules.splice(this.user.info.disliked_rules.indexOf(alreadyInDis), 1);
				this.hr.rating++;
			}
		} else {
			this.user.info.liked_rules.splice(this.user.info.liked_rules.indexOf(alreadyIn), 1);
			this.hr.rating--;
		}
		await this.back.updateLikesDislikes(this.user.info);
	}

	async downvote() {
		const alreadyIn = this.user.info.disliked_rules.find(x => x.id === this.hr.id);
		if (alreadyIn === undefined) {
			this.user.info.disliked_rules.push(this.hr);
			this.hr.rating--;
			const alreadyInDis = this.user.info.liked_rules.find(x => x.id === this.hr.id);
			if (alreadyInDis) {
				this.user.info.liked_rules.splice(this.user.info.liked_rules.indexOf(alreadyInDis), 1);
				this.hr.rating--;
			}
		} else {
			this.user.info.disliked_rules.splice(this.user.info.disliked_rules.indexOf(alreadyIn), 1);
			this.hr.rating++;
		}
		await this.back.updateLikesDislikes(this.user.info);
	}

	setVal(num: number, arr: boolean[], control: FormControl) {
		for (let x = 0; x < 5; x++) {
			arr[x] = x <= num;
		}
		control.setValue(arr.filter(x => x).length);
	}

	async saveReview() {
		this.loading.loading = true;
		if (this.reviewFormGroup.valid) {
			let data = {
				id: undefined,
				title: this.titleFormControl.value,
				description: this.descriptionFormControl.value,
				playtesting: this.hr.testing,
				quality: this.qualityFormControl.value,
				complexity: this.complexityFormControl.value,
				house_rule: this.hr.id,
				author: this.user.getID()
			};

			await this.back.addReview(data);

			window.location.reload();
			// await this.router.navigateByUrl('/rule/' + this.hr.id);
			// this.snack.open('Review posted!')

		} else {
			this.reviewFormGroup.markAllAsTouched();
			this.snack.open('Please fill out all required fields', undefined, {duration: 2000});
		}
		this.loading.loading = false;

	}

	shareRule() {
		navigator.clipboard.writeText('http://localhost:4200/rule/' + this.hr.id);
		this.snack.open('Share link copied to clipboard!', undefined, {duration: 2000});
	}

	sort() {
		this.hr.reviewsFilled = this.hr.reviewsFilled.filter(x => x.playtesting === this.hr.testing);
		this.hr.reviewsFilled = this.hr.reviewsFilled.sort(this.getSortingFct(this.sorting, this.ascending));
	}

	private getSortingFct(sorting: string, ascending: boolean) {
		switch (sorting) {
			case 'Rating':
				return (a: ReviewDB, b: ReviewDB) => (ascending ? 1 : -1) * Math.sign(a.rating - b.rating);
			case 'Date':
				return (a: ReviewDB, b: ReviewDB) => {
					const dateA = Date.parse(a.createdAt);
					const dateB = Date.parse(b.createdAt);
					return (ascending ? 1 : -1) * Math.sign(dateA - dateB);
				};
			default:
				return (a, b) => 0;
		}
	}

	editRule() {
	}

	async deleteRule() {
		await this.back.deleteRule(this.hr);
		this.router.navigateByUrl('/home');
	}

	async saveComment() {
		this.loading.loading = true;
		if (this.commentFormGroup.valid) {
			let data = {
				id: undefined,
				text: this.commentFormControl.value,
				author: this.user.getID(),
				house_rule: this.hr.id
			};
			await this.back.addComment(data);
			window.location.reload();
		} else {
			this.commentFormGroup.markAllAsTouched();
			this.snack.open('Please fill out all required fields', undefined, {duration: 2000});
		}
		this.loading.loading = false;
	}

	getBestImg(img: ImageDBOptions) {
		if (img.large) {
			return img.large.url;
		}
		if (img.medium) {
			return img.medium.url;
		}
		if (img.small) {
			return img.small.url;
		}
		if (img.thumbnail) {
			return img.thumbnail.url;
		}
		return '';
	}
}


@Pipe({

	name: 'safe'

})

export class SafePipe implements PipeTransform {

	constructor(private sanitizer: DomSanitizer) {
	}

	transform(url) {

		return this.sanitizer.bypassSecurityTrustResourceUrl(url);

	}

}
