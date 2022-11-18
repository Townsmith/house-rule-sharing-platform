import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {
	Agreement,
	Annotation,
	blacklist,
	delay,
	originalOrder,
	questionCodeToNameMapper,
	Response
} from '../../assets/Data/Data';
import {HttpClient} from '@angular/common/http';
import * as ss from 'simple-statistics';
import {BackEndService} from '../back-end.service';
import * as X2JS from 'x2js';


@Component({
	selector: 'app-analysis',
	templateUrl: './analysis.component.html',
	styleUrls: ['./analysis.component.scss']
})

export class AnalysisComponent implements OnInit {

	likertCodes: string;
	textCodes: string;

	annotationCodes: string;
	responseCodes: string;
	bggCodes: string;

	originalOrder = originalOrder;

	filteredResponses: Response[];

	houseRuleFilteredResponses: Response[];

	appFilteredResponses: Response[];


	responses: Map<string, Response>;
	annotations: Map<string, Annotation>;
	bggs: Map<string, any>;

	content: string;

	// display string to any for html
	numbers = new Map<string, any>();

	// Question Code to map of answer option to count
	codeMapper = new Map<string, Map<string, number>>();

	// Participant ID to Map of trait name to score
	bfiMapper = new Map<string, Map<string, number>>();

	// Participant ID to Map of trait name to score
	IMGMapper = new Map<string, Map<string, number>>();

	// Participant ID to Map of trait name to score
	HCIMapper = new Map<string, Map<string, number>>();

	// likert mapper
	likertMapper = new Map<string, Map<string, Agreement>>();

	// Flat likert mapper
	flatLikertMapper = new Map<string, Agreement>();

	// Question code to mapping function
	outputMapperMap = new Map<string, (string) => number>();
	includeBFI = true;

	resultMap = new Map<string, any>();

	xml = new X2JS();

	queryRes;
	diff: Response[];

	constructor(public httpClient: HttpClient, public backEnd: BackEndService) {
	}

	ngOnInit(): void {
		this.readData();
		// this.testXLM([
		//   "S01_E02_new"
		// ]);
	}

	async testXLM(filenames: string[]) {
		for (const filename of filenames) {
			fetch(`assets/NTFLX/${filename}.xml`).then(response => response.text()).then(text => {
				const js = this.xml.xml2js(text);
				// @ts-ignore
				const ps = js.tt.body.div.p;

				let str = '';

				for (const tag of ps) {
					if (tag.span !== undefined) {
						if (tag.span.length > 0) {
							for (const subtag of tag.span) {
								str += `${subtag.__text}\n`;
							}
							str += '\n';
						} else {
							str += `${tag.span.__text}\n\n`;
						}
					} else {
						str += `${tag.__text}\n\n`;
					}
				}

				this.download(`${filename}_converted.txt`, str);
			});
		}
	}

	async readData() {
		const res = await d3.csv('./../assets/Data/dailyData.csv');
		let participants = [];
		for (let r of res) {
			// Remove potential empty lines and remove the gender (attack helicopter) blacklisted participants
			if (r['id'] !== '' && r['id'] !== '1716') {
				participants.push(r as unknown as Response);
			}
		}


		this.numbers.set('# Responses', participants.length);
		this.filteredResponses = participants;


		const beforeSkip = this.filteredResponses.length;

		// Remove the ones that skipped the survey
		this.filteredResponses = this.filteredResponses.filter(participant => {
			return participant['G2Q00005'] !== 'Skip to the end and get the asset pack';
		});
		this.numbers.set('# Skippers', beforeSkip - this.filteredResponses.length);


		const beforeNoWilling = this.filteredResponses.length;
		// Remove the ones that don't want their data used
		this.filteredResponses = this.filteredResponses.filter(participant => {
			return participant['G12Q00002'] === 'Yes';
		});
		this.numbers.set('# Non Research OKs', beforeNoWilling - this.filteredResponses.length);

		const beforeBlackListing = this.filteredResponses.length;
		// Remove the ones that were ID blacklisted from annotation
		this.filteredResponses = this.filteredResponses.filter(participant => {
			return !blacklist.some(x => x === participant.id);
		});
		this.numbers.set('# Blacklisted', beforeBlackListing - this.filteredResponses.length);

		const beforeBgs = this.filteredResponses.length;
		// Remove the ones that answered they don't play any board games
		this.filteredResponses = this.filteredResponses.filter(participant => {
			return !(participant['G3Q00002'] === 'Never' && participant['G3Q00003'] === 'No');
		});
		this.numbers.set('# Non Board Gamers', beforeBgs - this.filteredResponses.length);


		// Remove the ones that were too fast or slow
		const times = this.filteredResponses.map(x => parseFloat(x.interviewtime));
		const q1 = ss.quantile(times, 0.25);
		const q3 = ss.quantile(times, 0.75);
		const kOut = 1.5;
		const kFar = 3;

		const outMin = q1 - kOut * (q3 - q1);
		const outMax = q3 + kOut * (q3 - q1);

		const farMin = q1 - kFar * (q3 - q1);
		const farMax = q3 + kFar * (q3 - q1);

		let outCount = 0;
		let farCount = 0;

		// Ich möchte nicht danach filtern da 0 zu kurze und nur zu lange gefiltert werden, aber die wollen wir eigentlich durchaus betrachtetn (pause gemacht, ist schon eine lange Survey)
		this.filteredResponses = this.filteredResponses.filter(participant => {
			// Interview Time in minutes
			const time = parseFloat(participant['interviewtime']);
			if (time < outMin || time > outMax) {
				outCount++;
			}
			if (time < farMin || time > farMax) {
				farCount++;
			}
			return true;
		});


		this.numbers.set('# Outliers', outCount);
		this.numbers.set('# Fars', farCount);

		this.numbers.set('# Responses filtered', this.filteredResponses.length);

		this.generateCountMap(this.filteredResponses, 'G3Q00005');
		// this.generateCountMap(this.filteredResponses, 'G3Q00005');
		// this.generateCountMap(this.filteredResponses, 'G3Q00003');
		// this.generateCountMap(this.filteredResponses, 'G3Q00004');
		// this.generateCountMap(this.filteredResponses, 'G3Q00005');


		// Anyone in filtered has answered these measures
		for (const res of this.filteredResponses) {
			this.bfiCalc(res);
			this.IMGCalc(res);
			this.HCICalc(res);
		}

		const beforeHRS = this.filteredResponses.length;

		// Filter people that didn't name any house rules
		this.houseRuleFilteredResponses = this.filteredResponses.filter(response => {
			return response['G5Q00001'] === 'Yes';
		});
		this.numbers.set('# House Rule Responses Filtered', this.houseRuleFilteredResponses.length);
		this.numbers.set('# NOT AN HR USED EVER', beforeHRS - this.houseRuleFilteredResponses.length);
		this.numbers.set('# So many coded responses', this.houseRuleFilteredResponses.length);

		const beforeApp = this.filteredResponses.length;

		// Filter people that were not interested in our app idea
		this.appFilteredResponses = this.filteredResponses.filter(response => {
			const positiveNeutralAnswers = ['Agree', 'Somewhat agree', 'Neither agree nor disagree'];
			let res = positiveNeutralAnswers.some(x => x === response['G7Q00001[SQ001]']);
			res = res || positiveNeutralAnswers.some(x => x === response['G7Q00001[SQ002]']);
			res = res || positiveNeutralAnswers.some(x => x === response['G7Q00001[SQ003]']);
			return res;
		});
		this.numbers.set('# No interest in app', beforeApp - this.appFilteredResponses.length);
		this.numbers.set('# Interested in App', this.appFilteredResponses.length);

		const fullfilter = this.houseRuleFilteredResponses.filter(response => {
			const positiveNeutralAnswers = ['Agree', 'Somewhat agree', 'Neither agree nor disagree'];
			let res = positiveNeutralAnswers.some(x => x === response['G7Q00001[SQ001]']);
			res = res || positiveNeutralAnswers.some(x => x === response['G7Q00001[SQ002]']);
			res = res || positiveNeutralAnswers.some(x => x === response['G7Q00001[SQ003]']);
			return res;
		});

		this.diff = [];
		for (const res of this.houseRuleFilteredResponses) {
			if (!fullfilter.some(x => x.id === res.id)) {
				this.diff.push(res);
			}
		}
		this.numbers.set('# of coding todo', this.diff.length);

		this.responses = new Map();
		for (const res of this.appFilteredResponses) {
			this.responses.set(res.id, res);
		}

		// None: 0.18,4 or less: 3.03,5-10: 15.15,11-20: 21.93,21-50: 29.06,51-100: 15.69,101-150: 5.7,151-200: 2.32,more than 200: 6.95


		this.generateCountMap(this.houseRuleFilteredResponses, 'G6Q00003');
		// this.generateCountMap(this.appFilteredResponses, 'G3Q00005');
		// this.generateCountMap(this.appFilteredResponses, 'G4Q00004');
		// this.generateCountMap(this.appFilteredResponses, 'G4Q00006');


		const creatorFilteredResponses = this.appFilteredResponses.filter(res => res['G6Q00003'] === 'Yes, I created this house rule.');

		this.generateAgreementInfo(creatorFilteredResponses, 'G6Q00004[SQ002]', 'House Rule Likerts');
		this.generateAgreementInfo(creatorFilteredResponses, 'G6Q00004[SQ003]', 'House Rule Likerts');
		this.generateAgreementInfo(creatorFilteredResponses, 'G6Q00004[SQ004]', 'House Rule Likerts');

		this.generateAgreementInfo(this.houseRuleFilteredResponses, 'G6Q00007[SQ001]', 'House Rule Likerts');
		this.generateAgreementInfo(this.houseRuleFilteredResponses, 'G6Q00007[SQ002]', 'House Rule Likerts');
		this.generateAgreementInfo(this.houseRuleFilteredResponses, 'G6Q00007[SQ003]', 'House Rule Likerts');
		this.generateAgreementInfo(this.houseRuleFilteredResponses, 'G6Q00013[SQ001]', 'House Rule Likerts');


		// Only work with fully filtered from now on

		// House Rule likerts can only be measured from people that answered the house rule prequestion positively
		this.generateAgreementInfo(this.houseRuleFilteredResponses, 'G4Q00001[SQ001]', 'House Rule Interest');
		this.generateAgreementInfo(this.houseRuleFilteredResponses, 'G4Q00001[SQ002]', 'House Rule Interest');
		this.generateAgreementInfo(this.houseRuleFilteredResponses, 'G4Q00001[SQ003]', 'House Rule Interest');
		this.generateAgreementInfo(this.houseRuleFilteredResponses, 'G4Q00001[SQ004]', 'House Rule Interest');

		// // Feature Statement Likerts
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ001]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ002]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ003]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ004]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ005]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ006]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ007]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ008]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ009]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ010]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ011]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ012]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ013]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ014]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ015]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ016]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ017]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ018]', 'Features');
		this.generateAgreementInfo(this.appFilteredResponses, 'G8Q00004[SQ019]', 'Features');

		// App Interest can be measured from all
		this.generateAgreementInfo(this.appFilteredResponses, 'G7Q00001[SQ001]', 'App Interest');
		this.generateAgreementInfo(this.appFilteredResponses, 'G7Q00001[SQ002]', 'App Interest');
		this.generateAgreementInfo(this.appFilteredResponses, 'G7Q00001[SQ003]', 'App Interest');

		// this.generateCountMap(this.appFilteredResponses, 'G2Q00002');
		// this.generateCountMap(this.filteredResponses, 'G2Q00004');

		await this.loadAnnotations();

		// this.likertCodes = 'G4Q00001[SQ001]|G4Q00001[SQ002]|G4Q00001[SQ003]|G4Q00001[SQ004]|G6Q00004[SQ002]|G6Q00004[SQ003]|G6Q00004[SQ004]|G6Q00007[SQ001]|G6Q00007[SQ002]|G6Q00007[SQ003]|G6Q00013[SQ001]|G7Q00001[SQ001]|G7Q00001[SQ002]|G7Q00001[SQ003]';
		// this.downloadLikertTranslationsCodes();

		// let newHead = 'id,';
		//
		// for (let x = 1; x < 22; x ++) {
		//   if (x !== 7 && x !== 12 && x!== 13) {
		//     newHead += `G6Q00008[SQ${x < 10 ? '00' : '0'}${x}]${x === 21 ? '\n' : ','}`;
		//   }
		// }
		//
		// let str = newHead;
		//
		// for (const res of this.appFilteredResponses) {
		//   // @ts-ignore
		//   str += `${res.id},`
		//   for (let x = 1; x < 22; x ++) {
		//     if (x !== 7 && x !== 12 && x!== 13) {
		//       const code = `G6Q00008[SQ${x < 10 ? '00' : '0'}${x}]`;
		//       if (code === 'G6Q00008[SQ007]') {
		//         debugger;
		//       }
		//       const parsed = this.yesNoParser(res[code]);
		//       str += parsed + ',';        }
		//   }
		//   str += '\n'
		// }


		// for (let x = 1; x < 16; x++) {
		//   newHead += `G6Q00010[SQ${x < 10 ? '00' : '0'}${x}]${x === 15 ? '\n' : ','}`;
		// }
		//
		// let str = newHead;
		//
		// for (const res of this.appFilteredResponses) {
		//   // @ts-ignore
		//   str += `${res.id},`;
		//   for (let x = 1; x < 16; x++) {
		//     const code = `G6Q00010[SQ${x < 10 ? '00' : '0'}${x}]`;
		//     const parsed = this.yesNoParser(res[code]);
		//     str += parsed + ',';
		//
		//   }
		//   str += '\n';
		// }


		const bggMap = await d3.csv('./../assets/Data/AllBGDataWithCodes.csv');

		const occuranceCounter = new Map<string, { occ: number, codes: number[], rating: number, complexity: number }>();

		for (const mapentry of bggMap) {
			if (mapentry.id != '1716') {
				const bggId = mapentry.bgg_id;
				if (!occuranceCounter.has(bggId)) {
					occuranceCounter.set(bggId, {
						occ: 0,
						codes: [],
						rating: parseFloat(mapentry.average),
						complexity: parseFloat(mapentry.averageweight)
					});
				}
				const entry = occuranceCounter.get(bggId);
				entry.occ++;
				entry.codes.push(parseInt(mapentry.codes));
			}
		}
		console.log(occuranceCounter);
		occuranceCounter.delete('');
		console.log(occuranceCounter);

		const newHead = 'bgg_id,name,average,averageweight,occ,codesM,codesMdn,codesSD\n';
		let str = newHead;

		const mapArr = Array(...occuranceCounter.entries());
		console.log(mapArr);

		for (let i = 0; i < mapArr.length; i++) {
			const entry = mapArr[i];
			const bggId = entry[0];
			const info = await this.backEnd.getBoardGameV1ByID(bggId);
			console.log(info);
			console.log(i);
			if (info.name.length == null) {
				// @ts-ignore
				info.name = [info.name];
			}
			// @ts-ignore
			str += `${bggId},"${info.name.find(x => x._primary).__text.replaceAll('"', '\'').replaceAll('#', 'HASH')}",${info.statistics.ratings.average},${info.statistics.ratings.averageweight},${entry[1].occ},${ss.mean(entry[1].codes)}, ${ss.median(entry[1].codes)}, ${ss.standardDeviation(entry[1].codes)}\n`;
		}
		this.download('ratings.csv', str);


		// let str = '';
		// let header = '';
		//
		// header += 'id,Hoarder,Player,Diversity\n';
		//
		// str += header;
		//
		// for (const res of this.houseRuleFilteredResponses) {
		//   str += res.id + ',';
		//   if (['51-100', '101-150', '151-200', 'more than 200'].some(x => x === res.G3Q00001)) {
		//     str += '1,';
		//   } else {
		//     str += '0,';
		//   }
		//   if (['Multiple times a month', 'Once a week', 'Multiple times a week'].some(x => x === res.G3Q00002)) {
		//     str += '1,';
		//   } else {
		//     str += '0,';
		//   }
		//   if (['2 or less'].some(x => x === res.G3Q00005)) {
		//     str += '0\n';
		//   } else {
		//     str += '1\n';
		//   }
		// }
		// this.download('Labels.csv', str);


		this.bggs = new Map<string, any>();
		for (const val of bggMap) {
			this.bggs.set(val.id, val);
		}

		this.populateOutputMapperMap();


		this.content = 'Main';
	}

	async loadAnnotations() {
		const res = await d3.csv('./../assets/Data/AnnotatedData.csv');
		this.annotations = new Map();
		for (let r of res) {
			// Remove potential empty lines and remove blacklisted participants
			this.annotations.set(r.id, r as unknown as Annotation);
		}
	}

	downloadCombined() {
		const annoCodes = this.annotationCodes.split('|');
		const resCodes = this.responseCodes.split('|');
		const bggCodes = this.bggCodes.split('|');
		let str = '';
		let header = '';

		header += 'id,';

		if (this.includeBFI) {
			const bfi = this.bfiMapper.values().next();
			for (const key of bfi.value.keys()) {
				header += key;
				header += ',';
			}
		}

		for (let x = 0; x < annoCodes.length; x++) {
			const code = annoCodes[x];
			header += code;
			header += ',';
		}
		for (let x = 0; x < resCodes.length; x++) {
			const code = resCodes[x];
			header += code;
			header += x === resCodes.length - 1 ? '\n' : ',';
		}
		for (let x = 0; x < bggCodes.length; x++) {
			const code = bggCodes[x];
			header += code;
			header += x === bggCodes.length - 1 ? '\n' : ',';
		}


		str += header;

		for (const keyVal of this.responses.entries()) {

			const id = keyVal[0];
			str += id;
			str += ',';


			if (this.includeBFI) {
				const bfiRes = this.bfiMapper.get(id);
				for (const entry of bfiRes.entries()) {
					str += entry[1];
					str += ',';
				}
			}

			for (let x = 0; x < annoCodes.length; x++) {
				const code = annoCodes[x];
				if (this.outputMapperMap.has(code)) {
					str += this.outputMapperMap.get(code)(this.annotations.get(id)[code]);
				} else {
					const val = this.annotations.get(id)[code];
					str += val;
				}
				str += ',';
			}

			for (let x = 0; x < resCodes.length; x++) {
				const code = resCodes[x];
				if (this.outputMapperMap.has(code)) {
					str += this.outputMapperMap.get(code)(this.responses.get(id)[code]);
				} else {
					str += this.responses.get(id)[code];
				}
				str += ',';
			}

			for (let x = 0; x < bggCodes.length; x++) {
				const code = bggCodes[x];
				str += this.bggs.get(id)[code];
				str += x === resCodes.length - 1 ? '\n' : ',';
			}

		}

		this.download('combinedData.csv', str);

	}

	populateOutputMapperMap() {
		const f = (x: string) => {
			let res = -1;
			switch (x) {
				case 'None':
					res = 0;
					break;
				case '4 or less':
					res = 1;
					break;
				case '5-10':
					res = 2;
					break;
				case '11-20':
					res = 3;
					break;
				case '21-50':
					res = 4;
					break;
				case '51-100':
					res = 5;
					break;
				case '101-150':
					res = 6;
					break;
				case '151-200':
					res = 7;
					break;
				case 'more than 200':
					res = 8;
					break;
			}
			return res;
		};
		this.outputMapperMap.set('G3Q00001', f);

		this.outputMapperMap.set('G6Q00007[SQ001]', this.generalScalaParser);
		this.outputMapperMap.set('G6Q00007[SQ002]', this.generalScalaParser);
		this.outputMapperMap.set('G7Q00001[SQ001]', this.generalScalaParser);
		this.outputMapperMap.set('G7Q00001[SQ002]', this.generalScalaParser);
		this.outputMapperMap.set('G7Q00001[SQ003]', this.generalScalaParser);

		for (let x = 1; x < 10; x++) {
			this.outputMapperMap.set('G8Q00004[SQ00' + x + ']', this.generalScalaParser);
		}
		for (let x = 10; x < 20; x++) {
			this.outputMapperMap.set('G8Q00004[SQ0' + x + ']', this.generalScalaParser);
		}

		const f2 = (age: string) => {
			let res = -Infinity;
			switch (age) {
				case 'Under 19': {
					res = 0;
					break;
				}
				case '19-25': {
					res = 1;
					break;
				}
				case '26-32': {
					res = 2;
					break;
				}
				case '33-39': {
					res = 3;
					break;
				}
				case '40-46': {
					res = 4;
					break;
				}
				case '47-53': {
					res = 5;
					break;
				}
				case '54-60': {
					res = 6;
					break;
				}
				case 'Over 60': {
					res = 7;
					break;
				}
				case 'Prefer not to disclose': {
					res = Infinity;
					break;
				}
			}
			return res;
		};

		this.outputMapperMap.set('G2Q00001', f2);

		const f3 = (gender: string) => {
			let res = -Infinity;
			switch (gender) {
				case 'Man': {
					res = 0;
					break;
				}
				case 'Woman': {
					res = 1;
					break;
				}
				case 'Non-binary': {
					res = 2;
					break;
				}
				case 'Prefer not to disclose': {
					res = 3;
					break;
				}
			}
			return res;
		};

		this.outputMapperMap.set('G2Q00002', f3);


	}

	// G8Q00004[SQ001]|G8Q00004[SQ002]|G8Q00004[SQ003]|G8Q00004[SQ004]|G8Q00004[SQ005]|G8Q00004[SQ006]|G8Q00004[SQ007]|G8Q00004[SQ008]|G8Q00004[SQ009]|G8Q00004[SQ010]|G8Q00004[SQ011]|G8Q00004[SQ012]|G8Q00004[SQ013]|G8Q00004[SQ014]|G8Q00004[SQ015]|G8Q00004[SQ016]|G8Q00004[SQ017]|G8Q00004[SQ018]|G8Q00004[SQ019]|G7Q00001[SQ001]|G7Q00001[SQ002]|G7Q00001[SQ003]

	// downloads a CSV of all codes given, filled by the responses given
	async downloadTextQuestionCodes() {
		let responses = this.diff;
		const codes = this.textCodes.split('|');
		let str = '';
		let header = '';
		for (let x = 0; x < codes.length; x++) {
			const code = codes[x];
			header += code;
			header += x === codes.length - 1 ? '\n' : ',';
		}

		str += header;

		for (const response of responses) {
			for (const code of codes) {
				const text = response[code];
				str += '"' + text.replaceAll('"', '\'').replaceAll('#', 'HASH') + '"';
				str += ',';
			}

			str += '\n';

		}

		this.download('trimmedData.csv', str);
	}

	// downloads a CSV of all likert translations for codes given
	async downloadLikertTranslationsCodes() {
		const codes = this.likertCodes.split('|');
		let str = '';
		let header = '';
		for (let x = 0; x < codes.length; x++) {
			const code = codes[x];
			header += code;
			header += x === codes.length - 1 ? '\n' : ',';
		}

		str += header;


		for (const res of this.houseRuleFilteredResponses) {
			for (let x = 0; x < codes.length; x++) {
				const code = codes[x];
				str += `${this.generalScalaParser(res[code])}${x === codes.length - 1 ? '\n' : ','}`;
			}
		}

		this.download('trimmedData.csv', str);
	}

	// Maybe make this into the DAT format for SPSS
	async cleanDataAndDownloadCSV() {

		let str = '';

		const headers = Object.entries(this.filteredResponses[0]).map(x => x[0]);

		for (const entr of headers) {
			str += entr;
			str += ',';
		}
		str += '\n';


		for (const res of this.filteredResponses) {
			const variables = Object.entries(res);
			for (const entr of variables) {
				let adder = ('' + entr[1]);
				adder = adder.replace(/(\r\n|\n|\r)/gm, '');
				// adder = adder.replace(',', '\,');
				str += '"';
				str += adder;
				str += '"';
				str += ',';
			}
			str += '\n';
		}


		this.download('cleanedData.csv', str);
	}

	// TODO NEW SCALES WITHOUT DOTS AND 7 SCALE HCI

	HCICalc(res: Response) {

		function parseHCIanswer(answer: string): number {
			switch (answer) {
				case 'Strongly disagree':
					return 1;
				case 'Disagree':
					return 2;
				case 'Somewhat disagree':
					return 3;
				case 'Neither agree nor disagree':
					return 4;
				case 'Somewhat agree':
					return 5;
				case 'Agree':
					return 6;
				case 'Strongly Agree':
					return 7;
				default:
					return -Infinity;
			}
		}

		if (this.HCIMapper.has(res.id)) {
			console.error('Double HCI calc ' + res.id);
		}
		const map = new Map<string, number>();
		let social = 0;
		let aesthetic = 0;
		let narrative = 0;
		let challenge = 0;
		let goal = 0;

		social += parseHCIanswer(res['G11Q00001[SQ001]']);
		social += 8 - parseHCIanswer(res['G11Q00001[SQ028]']);
		social += 8 - parseHCIanswer(res['G11Q00001[SQ034]']);
		social += parseHCIanswer(res['G11Q00001[SQ019]']);
		social += parseHCIanswer(res['G11Q00001[SQ020]']);
		social /= 5;
		social = Math.round(100 * social) / 100;
		map.set('Social', social);

		aesthetic += parseHCIanswer(res['G11Q00001[SQ002]']);
		aesthetic += parseHCIanswer(res['G11Q00001[SQ029]']);
		aesthetic += parseHCIanswer(res['G11Q00001[SQ030]']);
		aesthetic += parseHCIanswer(res['G11Q00001[SQ018]']);
		aesthetic += parseHCIanswer(res['G11Q00001[SQ021]']);
		aesthetic /= 5;
		aesthetic = Math.round(100 * aesthetic) / 100;
		map.set('Aesthetic', aesthetic);

		narrative += parseHCIanswer(res['G11Q00001[SQ003]']);
		narrative += parseHCIanswer(res['G11Q00001[SQ025]']);
		narrative += 8 - parseHCIanswer(res['G11Q00001[SQ031]']);
		narrative += 8 - parseHCIanswer(res['G11Q00001[SQ016]']);
		narrative += 8 - parseHCIanswer(res['G11Q00001[SQ023]']);
		narrative /= 5;
		narrative = Math.round(100 * narrative) / 100;
		map.set('Narrative', narrative);

		challenge += parseHCIanswer(res['G11Q00001[SQ004]']);
		challenge += parseHCIanswer(res['G11Q00001[SQ026]']);
		challenge += parseHCIanswer(res['G11Q00001[SQ032]']);
		challenge += parseHCIanswer(res['G11Q00001[SQ015]']);
		challenge += parseHCIanswer(res['G11Q00001[SQ024]']);
		challenge /= 5;
		challenge = Math.round(100 * challenge) / 100;
		map.set('Challenge', challenge);

		goal += 8 - parseHCIanswer(res['G11Q00001[SQ005]']);
		goal += parseHCIanswer(res['G11Q00001[SQ027]']);
		goal += parseHCIanswer(res['G11Q00001[SQ033]']);
		goal += parseHCIanswer(res['G11Q00001[SQ017]']);
		goal += parseHCIanswer(res['G11Q00001[SQ022]']);
		goal /= 5;
		goal = Math.round(100 * goal) / 100;
		map.set('Goal', goal);

		this.HCIMapper.set(res.id, map);

		for (const entry of map.entries()) {
			res[`HCI_${entry[0]}`] = entry[1];
		}
	}

	IMGCalc(res: Response) {

		function parseIMGanswer(answer: string): number {
			switch (answer) {
				case 'Completely unimportant':
					return 1;
				case 'Somewhat unimporant':
					return 2;
				case 'Neutral':
					return 3;
				case 'Somewhat important':
					return 4;
				case 'Very important':
					return 5;
				default:
					return -Infinity;
			}
		}

		if (this.IMGMapper.has(res.id)) {
			console.error('Double IMG calc ' + res.id);
		}
		const map = new Map<string, number>();
		let relatedness = 0;
		let competence = 0;
		let autonomy = 0;
		let fun = 0;
		let immersion = 0;

		relatedness += parseIMGanswer(res['G10Q00001[SQ001]']);
		relatedness += parseIMGanswer(res['G10Q00001[SQ002]']);
		relatedness += parseIMGanswer(res['G10Q00001[SQ003]']);
		relatedness /= 3;
		relatedness = Math.round(100 * relatedness) / 100;
		map.set('Relatedness', relatedness);

		competence += parseIMGanswer(res['G10Q00001[SQ004]']);
		competence += parseIMGanswer(res['G10Q00001[SQ005]']);
		competence += parseIMGanswer(res['G10Q00001[SQ006]']);
		competence /= 3;
		competence = Math.round(100 * competence) / 100;
		map.set('Competence', competence);

		immersion += parseIMGanswer(res['G10Q00001[SQ007]']);
		immersion += parseIMGanswer(res['G10Q00001[SQ008]']);
		immersion += parseIMGanswer(res['G10Q00001[SQ009]']);
		immersion /= 3;
		immersion = Math.round(100 * immersion) / 100;
		map.set('Immersion', immersion);

		fun += parseIMGanswer(res['G10Q00001[SQ010]']);
		fun += parseIMGanswer(res['G10Q00001[SQ011]']);
		fun += parseIMGanswer(res['G10Q00001[SQ012]']);
		fun /= 3;
		fun = Math.round(100 * fun) / 100;
		map.set('Fun', fun);

		autonomy += parseIMGanswer(res['G10Q00001[SQ013]']);
		autonomy += parseIMGanswer(res['G10Q00001[SQ014]']);
		autonomy += parseIMGanswer(res['G10Q00001[SQ015]']);
		autonomy /= 3;
		autonomy = Math.round(100 * autonomy) / 100;
		map.set('Autonomy', autonomy);

		this.IMGMapper.set(res.id, map);

		for (const entry of map.entries()) {
			res[`IMG_${entry[0]}`] = entry[1];
		}
	}

	generalScalaParser(answer: string): number {
		switch (answer) {
			case 'Disagree':
				return 1;
			case 'Somewhat disagree':
				return 2;
			case 'Neither agree nor disagree':
				return 3;
			case 'Somewhat agree':
				return 4;
			case 'Agree':
				return 5;
			default:
				return -Infinity;
		}
	}

	yesNoParser(answer: string): number {
		let res = -Infinity;
		switch (answer) {
			case 'Yes':
				res = 1;
				break;
			case 'No':
				res = 0;
				break;
		}
		return res;
	}

	bfiCalc(res: Response) {

		function BFIParser(answer: string): number {
			switch (answer) {
				case 'Disagree strongly':
					return 1;
				case 'Disagree a little':
					return 2;
				case 'Neither agree nor disagree':
					return 3;
				case 'Agree a little':
					return 4;
				case 'Agree strongly':
					return 5;
				default:
					return -Infinity;
			}
		}

		if (this.bfiMapper.has(res.id)) {
			console.error('Double BFI calc ' + res.id);
		}
		const map = new Map<string, number>();
		let extraversion = 0;
		let agreeableness = 0;
		let conscientiousness = 0;
		let neuroticism = 0;
		let openness = 0;

		// Reverse has to be subtracted from 6
		extraversion += 6 - BFIParser(res['G9Q00001[SQ001]']);
		extraversion += BFIParser(res['G9Q00001[SQ006]']);
		extraversion /= 2;
		extraversion = Math.round(100 * extraversion) / 100;
		map.set('Extraversion', extraversion);

		agreeableness += BFIParser(res['G9Q00001[SQ002]']);
		agreeableness += 6 - BFIParser(res['G9Q00001[SQ007]']);
		agreeableness += BFIParser(res['G9Q00001[SQ011]']);
		agreeableness /= 3;
		agreeableness = Math.round(100 * agreeableness) / 100;
		map.set('Agreeableness', agreeableness);

		conscientiousness += 6 - BFIParser(res['G9Q00001[SQ003]']);
		conscientiousness += BFIParser(res['G9Q00001[SQ008]']);
		conscientiousness /= 2;
		conscientiousness = Math.round(100 * conscientiousness) / 100;
		map.set('Conscientiousness', conscientiousness);

		neuroticism += 6 - BFIParser(res['G9Q00001[SQ004]']);
		neuroticism += BFIParser(res['G9Q00001[SQ009]']);
		neuroticism /= 2;
		neuroticism = Math.round(100 * neuroticism) / 100;
		map.set('Neuroticism', neuroticism);

		openness += 6 - BFIParser(res['G9Q00001[SQ005]']);
		openness += BFIParser(res['G9Q00001[SQ010]']);
		openness /= 2;
		openness = Math.round(100 * openness) / 100;
		map.set('Openness', openness);

		this.bfiMapper.set(res.id, map);

		for (const entry of map.entries()) {
			res[`BFI_${entry[0]}`] = entry[1];
		}

	}

	addCountOutput(target: Map<string, number>, source: Map<string, number>, qc: string) {
		for (const entry of source) {
			target.set(qc + ': ' + entry[0], entry[1]);
		}
	}

	generateCountMap(participants: Response[], qc: string) {
		const map = new Map<string, number>();
		for (const part of participants) {
			const val = part[qc];
			if (map.has(val)) {
				map.set(val, map.get(val) + 1);
			} else {
				map.set(val, 1);
			}
		}
		for (const entry of map.entries()) {
			// map.set(entry[0], Math.round(100 * (entry[1] / participants.length) * 100) / 100);
			map.set(entry[0], entry[1]);
		}
		this.addCountOutput(this.numbers, map, qc);
		this.codeMapper.set(qc, map);
	}

	// only use this with agreement scales
	generateAgreementInfo(responses: Response[], qc: string, key: string) {

		if (!this.likertMapper.has(key)) {
			this.likertMapper.set(key, new Map<string, Agreement>());
		}

		const agr: Agreement = {
			mean: -Infinity,
			median: -Infinity,
			variance: -Infinity,
			size: -Infinity,
			dev: -Infinity,
			agreement: -Infinity,
			ttest: -Infinity,
			significant: false,
			numbers: []
		};

		let agreers = 0;

		const numbers = [];
		let mean = 0;
		for (const res of responses) {
			if (res[qc] === '') {
				console.log(res);
			}
			const num = this.generalScalaParser(res[qc]);
			numbers.push(num);
			mean += num;
			if (num >= 4) {
				agreers++;
			}
		}
		mean /= responses.length;

		agr.mean = Math.round(mean * 100) / 100;
		agr.median = Math.round(ss.median(numbers) * 100) / 100;
		agr.agreement = Math.round((agreers / responses.length) * 100) / 100;
		agr.variance = ss.variance(numbers);
		agr.dev = Math.round(Math.sqrt(agr.variance) * 100) / 100;
		agr.size = numbers.length;
		agr.ttest = ss.tTest(numbers, 3);
		agr.numbers = numbers;

		// This is for sample size 60
		let pVal = 1.671;
		if (numbers.length > 120) {
			pVal = 1.658;
		}
		if (numbers.length > 1000) {
			pVal = 1.646;
		}
		if (numbers.length > 2000) {
			pVal = 1.645;
		}
		agr.significant = Math.abs(agr.ttest) > pVal;


		if (questionCodeToNameMapper.has(qc)) {
			this.likertMapper.get(key).set(questionCodeToNameMapper.get(qc), agr);
		} else {
			this.likertMapper.get(key).set(qc, agr);
		}
		this.flatLikertMapper.set(qc, agr);
	}

	download(filename: string, content: string) {
		const element = document.createElement('a');
		element.setAttribute('href', 'data:text/csv;charset=utf-8,' + content);
		element.setAttribute('download', filename);
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	private async generateBoardGameIDMapperShit() {

		let hits = 0;
		let misses = 0;
		for (const res of this.appFilteredResponses) {
			const name = res['G6Q00001'];
			console.log(name);
			let gameHits = await this.backEnd.getBoardGame(name, true);
			console.log(gameHits);
			if (gameHits !== undefined) {
				if (gameHits.length > 0) {
					gameHits = gameHits[0];
				}
				if (gameHits._id !== undefined) {
					hits++;
					this.resultMap.set(res.id, gameHits._id);
				} else {
					misses++;
					this.resultMap.set(res.id, '');
				}
			} else {
				misses++;
				this.resultMap.set(res.id, '');
			}
			await delay(2000);
		}

		console.log(this.resultMap);

		let str = '';
		let header = 'id,bgg_id\n';

		str += header;

		for (const entry of this.resultMap.entries()) {
			str += `${entry[0]},${entry[1]}`;
			str += '\n';
		}

		this.download('bgg_map.csv', str);


		this.numbers.set('# hits of game name BGG search', hits);
		this.numbers.set('# misses of game name BGG search', misses);
	}
}
