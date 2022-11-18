import {Component, Input, OnInit} from '@angular/core';
import {Agreement, questionCodeToNameMapper} from '../../assets/Data/Data';
import {originalOrder} from '../../assets/Data/Data';

@Component({
  selector: 'app-likert-display',
  templateUrl: './likert-display.component.html',
  styleUrls: ['./likert-display.component.scss']
})
export class LikertDisplayComponent implements OnInit {

  originalOrder = originalOrder;

  meanSorted = (a, b) => {
    return  b.value.mean - a.value.mean;
  }

  ARSorted = (a, b) => {
    return  b.value.agreement - a.value.agreement;
  }

  getHouseRuleInterestAuswertung():string {
    const share = this.map.get('House rules should be shared with other people.');
    const exist = this.map.get('There are board games that I typically play with house rules.');
    const like = this.map.get('I like using house rules.');

    return `Our survey showed that participants think house rules should be shared with other people
    (M= ${share.mean},
    Mdn= ${share.median},
    AR= ${share.agreement * 100}%),
    and that they play certain games with house rules in play
    (M= ${exist.mean},
    Mdn= ${exist.median},
    AR= ${exist.agreement * 100}%).
    Participants also reported that they enjoy using house rules
    (M= ${like.mean},
    Mdn= ${like.median},
    AR= ${like.agreement * 100}%).`;
  }

  getAppInterestAuswertung():string {
    const tool = this.map.get('I am interested in a house rule exploring tool for board games.');
    const myself = this.map.get('I would like to use such a tool myself.');
    const add = this.map.get('I would like to add my house rules to the platform.');

    return `As stated above, participants reported a general interest in sharing house rules.
    To investigate if people felt a need for a house rule exploring platform, I briefly described the idea of the app
    and then asked the participants to assess three statements.
    They showed a general interest in the tool
    (M= ${tool.mean},
    Mdn= ${tool.median},
    AR= ${tool.agreement* 100}%)
    as well as an interest in using the platform themselves
    (M= ${myself.mean},
    Mdn= ${myself.median},
    AR= ${myself.agreement* 100}%).
    However, participants reported only slightly above average interest in adding their own houserules to the platform
    (M= ${add.mean},
    Mdn= ${add.median},
    AR= ${add.agreement* 100}%)
    which was ${ add.significant ? '' : 'not'} significant as per a one sided t-test (t(251)= ${ Math.round(add.ttest * 100) / 100}, p<.05).
    Though not all statements produced a majority in agreement rate, they show that there is an audience among board gamers for such a platform.`;
  }

  // Data
  @Input()
  map: Map<string, Agreement>;

  // Index
  @Input()
  index: number;

  // Title for Results
  @Input()
  title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
