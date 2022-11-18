import {KeyValue} from '@angular/common';


export interface Annotation {
  "id" :number;
  "Characters" :number;
  "Type of Rule\Operational" :number;
  "..\Implicit\Group-Focussed" :number;
  "..\Implicit\Game-Focussed" :number;
  "..\Changing/Replacing existing Rule\Other Change" :number;
  "..\Changing/Replacing existing Rule\Removing Restrictions" :number;
  "..\Changing/Replacing existing Rule\Restricted existing Rule" :number;
  "Type of Modification\Unclear" :number;
  "Type of Modification\Removed existing Rule" :number;
  "Type of Modification\Added new Rule" :number;
  "..\Components\Component Customization" :number;
  "..\Components\Required Components" :number;
  "..\Source\Board Game Geek" :number;
  "..\Source\Game Community" :number;
  "..\Source\Family" :number;
  "..\Source\Other Game" :number;
  "..\Source\Friends" :number;
  "..\Unwanted Consequences/Problems\Other Consequences" :number;
  "..\Unwanted Consequences/Problems\Unfun" :number;
  "..\Unwanted Consequences/Problems\Low Difficulty" :number;
  "..\Unwanted Consequences/Problems\Edge Cases" :number;
  "..\Description\Game/Official Rule" :number;
  "..\Difficulty\Other Difficulty Aspect" :number;
  "..\Difficulty\D Difficulty" :number;
  "..\Difficulty\I Difficulty" :number;
  "..\Randomness\Other Randomness Aspect" :number;
  "..\Randomness\D Randomness" :number;
  "..\Randomness\I Randomness" :number;
  "..\Player Number\D Player Number" :number;
  "..\Player Number\I Player Number" :number;
  "..\Player Number\Other Player Number Aspect" :number;
  "..\Official Rule Problems\Unclear Original Rules" :number;
  "..\Official Rule Problems\Fixing Issues" :number;
  "Aspects\Cheating" :number;
  "Aspects\Conversion" :number;
  "Aspects\Accessibility" :number;
  "Aspects\Attentiveness/Engagement/Interest" :number;
  "Aspects\Replayability" :number;
  "Aspects\Customization" :number;
  "Aspects\Player Choice" :number;
  "Aspects\Loose Condition/Death" :number;
  "Aspects\Combining Games" :number;
  "..\Physical Space\I Physical Space" :number;
  "..\Physical Space\D Physical Space" :number;
  "Aspects\Combat" :number;
  "Aspects\Movement" :number;
  "Aspects\Game Setup" :number;
  "..\Communication\I Communication" :number;
  "..\Information\D Information" :number;
  "..\Information\I Information" :number;
  "..\Realism\I Realism" :number;
  "Aspects\Turn Order" :number;
  "Aspects\Resource" :number;
  "..\Fun\I Fun" :number;
  "Aspects\Balance" :number;
  "..\Balance\I Balance" :number;
  "Aspects\Scoring" :number;
  "Aspects\Duration" :number;
  "..\Duration\D Duration" :number;
  "..\Duration\I Duration" :number;
  "..\Strategy\D Strategy" :number;
  "..\Strategy\I Strategy" :number;
  "Aspects\Narrative" :number;
  "Aspects\Win/End Condition" :number;
  "..\Teamwork/Cooperation\I Teamwork/Cooperation" :number;
  "Aspects\Variety" :number;
  "..\Complexity\D Complexity" :number;
  "..\Complexity\I Complexity" :number;
  "Aspects\Content Depth" :number;
  "..\Content Depth\I Content Depth" :number;
  "..\Content Breadth\D Content Breadth" :number;
  "..\Content Breadth\I Content Breadth" :number;
  "..\Competetiveness\D Competitiveness" :number;
  "..\Competetiveness\I Competitiveness" :number;
  "..\Intensity\D Intensity" :number;
  "..\Intensity\I Intensity" :number;
  "Aspects\Social Behavior" :number;
  "..\Efficiency/Speed/Flow\D Speed" :number;
  "..\Efficiency/Speed/Flow\I Efficiency/Speed/Flow" :number;
  "..\Fairness\I Fairness" :number;
  "..\Style/Coolness\I Style/Coolness" :number;
  "..\Immersion\I Immersion" :number;
  "Context/Conditions\Game Edition" :number;
  "Context/Conditions\Religion" :number;
  "Context/Conditions\Consensus" :number;
  "..\Player Age\Difference in Player Age" :number;
  "..\Player Age\Low Player Age" :number;
  "..\Player Skill\Low Player Skill" :number;
  "Context/Conditions\Group Constellation" :number;
  "..\Disability\Mental" :number;
  "..\Disability\Sight" :number;
  "Context/Conditions\Game Expansion" :number;
  "Context/Conditions\Misunderstanding" :number;
  "..\Seriousness of Play\Casual Play" :number;
  "Context/Conditions\Player Number" :number;
  "..\Player Experience\Difference of Player Experience" :number;
  "..\Player Experience\High Player Experience" :number;
  "..\Player Experience\Low Player Experience" :number;
  "Context/Conditions\Frustration/Annoyance" :number;
  "QCs\G6Q00001" :number;
  "QCs\G6Q00002" :number;
  "QCs\G6Q00009" :number;
  "QCs\G4Q00002" :number;
  "QCs\G6Q00019" :number;
  "QCs\G6Q00020" :number;
}

export interface Response {

  id: string;
  submitdate: string;
  lastpage: string;
  startlanguage: string;
  seed: string;
  startdate: string;
  datestamp: string;
  'G1Q00001[SQ001]': string;
  G2Q00001: string;
  G2Q00002: string;
  'G2Q00002[other]': string;
  G2Q00003: string;
  G2Q00004: string;
  G2Q00005: string;
  G3Q00001: string;
  G3Q00002: string;
  G3Q00003: string;
  G3Q00004: string;
  G3Q00005: string;
  G5Q00001: string;
  'G4Q00001[SQ001]': string;
  'G4Q00001[SQ002]': string;
  'G4Q00001[SQ003]': string;
  'G4Q00001[SQ004]': string;
  G4Q00002: string;
  G4Q00003: string;
  G4Q00004: string;
  G4Q00005: string;
  G4Q00006: string;
  G4Q00007: string;
  G6Q00001: string;
  G6Q00002: string;
  G6Q00003: string;
  'G6Q00004[SQ002]': string;
  'G6Q00004[SQ003]': string;
  'G6Q00004[SQ004]': string;
  G6Q00005: string;
  'G6Q00006[SQ001]': string;
  'G6Q00006[SQ002]': string;
  'G6Q00006[SQ004]': string;
  'G6Q00006[other]': string;
  'G6Q00007[SQ001]': string;
  'G6Q00007[SQ002]': string;
  'G6Q00008[SQ001]': string;
  'G6Q00008[SQ002]': string;
  'G6Q00008[SQ003]': string;
  'G6Q00008[SQ004]': string;
  'G6Q00008[SQ005]': string;
  'G6Q00008[SQ006]': string;
  'G6Q00008[SQ008]': string;
  'G6Q00008[SQ009]': string;
  'G6Q00008[SQ010]': string;
  'G6Q00008[SQ011]': string;
  'G6Q00008[SQ014]': string;
  'G6Q00008[SQ015]': string;
  'G6Q00008[SQ016]': string;
  'G6Q00008[SQ017]': string;
  'G6Q00008[SQ018]': string;
  'G6Q00008[SQ019]': string;
  'G6Q00008[SQ020]': string;
  'G6Q00008[SQ021]': string;
  'G6Q00008[other]': string;
  G6Q00009: string;
  'G6Q00010[SQ001]': string;
  'G6Q00010[SQ002]': string;
  'G6Q00010[SQ003]': string;
  'G6Q00010[SQ004]': string;
  'G6Q00010[SQ005]': string;
  'G6Q00010[SQ006]': string;
  'G6Q00010[SQ007]': string;
  'G6Q00010[SQ008]': string;
  'G6Q00010[SQ009]': string;
  'G6Q00010[SQ010]': string;
  'G6Q00010[SQ011]': string;
  'G6Q00010[SQ012]': string;
  'G6Q00010[SQ013]': string;
  'G6Q00010[SQ014]': string;
  'G6Q00010[SQ015]': string;
  'G6Q00010[other]': string;
  G06Q55: string;
  G6Q00011: string;
  G6Q00012: string;
  G06Q56: string;
  'G6Q00013[SQ001]': string;
  G6Q00014: string;
  G6Q00015: string;
  G6Q00016: string;
  G6Q00017: string;
  G6Q00018: string;
  G6Q00019: string;
  G6Q00020: string;
  G6Q00021: string;
  G6Q00022: string;
  'G7Q00001[SQ001]': string;
  'G7Q00001[SQ002]': string;
  'G7Q00001[SQ003]': string;
  G7Q00002: string;
  G8Q00001: string;
  G8Q00002: string;
  G8Q00003: string;
  'G8Q00004[SQ003]': string;
  'G8Q00004[SQ004]': string;
  'G8Q00004[SQ005]': string;
  'G8Q00004[SQ007]': string;
  'G8Q00004[SQ006]': string;
  'G8Q00004[SQ008]': string;
  'G8Q00004[SQ009]': string;
  'G8Q00004[SQ010]': string;
  'G8Q00004[SQ011]': string;
  'G8Q00004[SQ012]': string;
  'G8Q00004[SQ013]': string;
  'G8Q00004[SQ014]': string;
  'G8Q00004[SQ015]': string;
  'G8Q00004[SQ016]': string;
  'G8Q00004[SQ017]': string;
  'G8Q00004[SQ018]': string;
  'G8Q00004[SQ019]': string;
  'G8Q00004[SQ002]': string;
  'G8Q00004[SQ001]': string;
  G8Q00005: string;
  'G8Q00005[other]': string;
  G8Q00006: string;
  'G9Q00001[SQ001]': string;
  'G9Q00001[SQ002]': string;
  'G9Q00001[SQ003]': string;
  'G9Q00001[SQ004]': string;
  'G9Q00001[SQ005]': string;
  'G9Q00001[SQ006]': string;
  'G9Q00001[SQ007]': string;
  'G9Q00001[SQ008]': string;
  'G9Q00001[SQ009]': string;
  'G9Q00001[SQ010]': string;
  'G9Q00001[SQ011]': string;
  'G10Q00001[SQ001]': string;
  'G10Q00001[SQ002]': string;
  'G10Q00001[SQ003]': string;
  'G10Q00001[SQ004]': string;
  'G10Q00001[SQ005]': string;
  'G10Q00001[SQ006]': string;
  'G10Q00001[SQ007]': string;
  'G10Q00001[SQ008]': string;
  'G10Q00001[SQ009]': string;
  'G10Q00001[SQ010]': string;
  'G10Q00001[SQ011]': string;
  'G10Q00001[SQ012]': string;
  'G10Q00001[SQ013]': string;
  'G10Q00001[SQ014]': string;
  'G10Q00001[SQ015]': string;
  'G11Q00001[SQ001]': string;
  'G11Q00001[SQ002]': string;
  'G11Q00001[SQ003]': string;
  'G11Q00001[SQ004]': string;
  'G11Q00001[SQ005]': string;
  'G11Q00001[SQ015]': string;
  'G11Q00001[SQ016]': string;
  'G11Q00001[SQ017]': string;
  'G11Q00001[SQ018]': string;
  'G11Q00001[SQ019]': string;
  'G11Q00001[SQ020]': string;
  'G11Q00001[SQ021]': string;
  'G11Q00001[SQ022]': string;
  'G11Q00001[SQ023]': string;
  'G11Q00001[SQ024]': string;
  'G11Q00001[SQ025]': string;
  'G11Q00001[SQ026]': string;
  'G11Q00001[SQ027]': string;
  'G11Q00001[SQ028]': string;
  'G11Q00001[SQ029]': string;
  'G11Q00001[SQ030]': string;
  'G11Q00001[SQ031]': string;
  'G11Q00001[SQ032]': string;
  'G11Q00001[SQ033]': string;
  'G11Q00001[SQ034]': string;
  G12Q00001: string;
  G12Q00002: string;
  interviewtime: string;
  groupTime907: string;
  G1Q00001Time: string;
  groupTime909: string;
  G2Q00001Time: string;
  G2Q00002Time: string;
  G2Q00003Time: string;
  G2Q00004Time: string;
  G2Q00005Time: string;
  groupTime910: string;
  G3Q00001Time: string;
  G3Q00002Time: string;
  G3Q00003Time: string;
  G3Q00004Time: string;
  G3Q00005Time: string;
  groupTime912: string;
  G5Q00001Time: string;
  groupTime911: string;
  G4Q00001Time: string;
  G4Q00002Time: string;
  G4Q00003Time: string;
  G4Q00004Time: string;
  G4Q00005Time: string;
  G4Q00006Time: string;
  G4Q00007Time: string;
  groupTime908: string;
  G6Q00001Time: string;
  G6Q00002Time: string;
  G6Q00003Time: string;
  G6Q00004Time: string;
  G6Q00005Time: string;
  G6Q00006Time: string;
  G6Q00007Time: string;
  G6Q00008Time: string;
  G6Q00009Time: string;
  G6Q00010Time: string;
  G06Q55Time: string;
  G6Q00011Time: string;
  G6Q00012Time: string;
  G06Q56Time: string;
  G6Q00013Time: string;
  G6Q00014Time: string;
  G6Q00015Time: string;
  G6Q00016Time: string;
  G6Q00017Time: string;
  G6Q00018Time: string;
  G6Q00019Time: string;
  G6Q00020Time: string;
  G6Q00021Time: string;
  G6Q00022Time: string;
  groupTime913: string;
  G7Q00001Time: string;
  G7Q00002Time: string;
  groupTime914: string;
  G8Q00001Time: string;
  G8Q00002Time: string;
  G8Q00003Time: string;
  G8Q00004Time: string;
  G8Q00005Time: string;
  G8Q00006Time: string;
  groupTime915: string;
  G9Q00001Time: string;
  groupTime916: string;
  G10Q00001Time: string;
  groupTime917: string;
  G11Q00001Time: string;
  groupTime918: string;
  G12Q00001Time: string;
  G12Q00002Time: string;
}

export async function delay(ms: number): Promise<void> {
  await new Promise<void>((executor) => setTimeout(() => executor(), ms)).then(() => {});
}

// Type of Rule\Operational|..\Implicit\Group-Focussed|..\Implicit\Game-Focussed|..\Changing/Replacing existing Rule\Other Change|..\Changing/Replacing existing Rule\Removing Restrictions|..\Changing/Replacing existing Rule\Restricted existing Rule|Type of Modification\Unclear|Type of Modification\Removed existing Rule|Type of Modification\Added new Rule|..\Components\Component Customization|..\Components\Required Components|..\Source\Board Game Geek|..\Source\Game Community|..\Source\Family|..\Source\Other Game|..\Source\Friends|..\Unwanted Consequences/Problems\Other Consequences|..\Unwanted Consequences/Problems\Unfun|..\Unwanted Consequences/Problems\Low Difficulty|..\Unwanted Consequences/Problems\Edge Cases|..\Description\Game/Official Rule|..\Difficulty\Other Difficulty Aspect|..\Difficulty\D Difficulty|..\Difficulty\I Difficulty|..\Randomness\Other Randomness Aspect|..\Randomness\D Randomness|..\Randomness\I Randomness|..\Player Number\D Player Number|..\Player Number\I Player Number|..\Player Number\Other Player Number Aspect|..\Official Rule Problems\Unclear Original Rules|..\Official Rule Problems\Fixing Issues|Aspects\Cheating|Aspects\Conversion|Aspects\Accessibility|Aspects\Attentiveness/Engagement/Interest|Aspects\Replayability|Aspects\Customization|Aspects\Player Choice|Aspects\Loose Condition/Death|Aspects\Combining Games|..\Physical Space\I Physical Space|..\Physical Space\D Physical Space|Aspects\Combat|Aspects\Movement|Aspects\Game Setup|..\Communication\I Communication|..\Information\D Information|..\Information\I Information|..\Realism\I Realism|Aspects\Turn Order|Aspects\Resource|..\Fun\I Fun|Aspects\Balance|..\Balance\I Balance|Aspects\Scoring|Aspects\Duration|..\Duration\D Duration|..\Duration\I Duration|..\Strategy\D Strategy|..\Strategy\I Strategy|Aspects\Narrative|Aspects\Win/End Condition|..\Teamwork/Cooperation\I Teamwork/Cooperation|Aspects\Variety|..\Complexity\D Complexity|..\Complexity\I Complexity|Aspects\Content Depth|..\Content Depth\I Content Depth|..\Content Breadth\D Content Breadth|..\Content Breadth\I Content Breadth|..\Competetiveness\D Competitiveness|..\Competetiveness\I Competitiveness|..\Intensity\D Intensity|..\Intensity\I Intensity|Aspects\Social Behavior|..\Efficiency/Speed/Flow\D Speed|..\Efficiency/Speed/Flow\I Efficiency/Speed/Flow|..\Fairness\I Fairness|..\Style/Coolness\I Style/Coolness|..\Immersion\I Immersion|Context/Conditions\Game Edition|Context/Conditions\Religion|Context/Conditions\Consensus|..\Player Age\Difference in Player Age|..\Player Age\Low Player Age|..\Player Skill\Low Player Skill|Context/Conditions\Group Constellation|..\Disability\Mental|..\Disability\Sight|Context/Conditions\Game Expansion|Context/Conditions\Misunderstanding|..\Seriousness of Play\Casual Play|Context/Conditions\Player Number|..\Player Experience\Difference of Player Experience|..\Player Experience\High Player Experience|..\Player Experience\Low Player Experience|Context/Conditions\Frustration/Annoyance|QCs\G6Q00001|QCs\G6Q00002|QCs\G6Q00009|QCs\G4Q00002|QCs\G6Q00019|QCs\G6Q00020

export const blacklist: string[] = [
  "1792",
  "2103",
  "2154",
  "2322",
  "573",
  "750",
  "821",
  "998",
  "1199",
  "2510",
  "2326",
  "1518",
  "1252",
  "2445",
  "87",
  "310",
  "85",
  "88",
  "126",
  "137",
  "159",
  "163",
  "173",
  "212",
  "222",
  "224",
  "230",
  "238",
  "269",
  "273",
  "295",
  "320",
  "326",
  "328",
  "356",
  "389",
  "433",
  "440",
  "446",
  "447",
  "474",
  "476",
  "481",
  "483",
  "485",
  "486",
  "537",
  "576",
  "577",
  "584",
  "646",
  "649",
  "658",
  "688",
  "689",
  "699",
  "727",
  "728",
  "742",
  "747",
  "753",
  "760",
  "790",
  "792",
  "802",
  "832",
  "846",
  "869",
  "870",
  "908",
  "940",
  "953",
  "981",
  "994",
  "1014",
  "1035",
  "1038",
  "1052",
  "1076",
  "1079",
  "1090",
  "1094",
  "1102",
  "1103",
  "1135",
  "1140",
  "1163",
  "1166",
  "1190",
  "1196",
  "1200",
  "1203",
  "1211",
  "1218",
  "1222",
  "1229",
  "1244",
  "1266",
  "1299",
  "1312",
  "1331",
  "1336",
  "1355",
  "1393",
  "1399",
  "1402",
  "1444",
  "1452",
  "1536",
  "1538",
  "1540",
  "1550",
  "1555",
  "1560",
  "1570",
  "1588",
  "1610",
  "1631",
  "1643",
  "1694",
  "1695",
  "1701",
  "1746",
  "1747",
  "1774",
  "1784",
  "1813",
  "1840",
  "1846",
  "1981",
  "2024",
  "2050",
  "2061",
  "2071",
  "2078",
  "2081",
  "2112",
  "2138",
  "2157",
  "2166",
  "2182",
  "2202",
  "2217",
  "2238",
  "2251",
  "2265",
  "2284",
  "2288",
  "2293",
  "2303",
  "2307",
  "2319",
  "2330",
  "2351",
  "2366",
  "2410",
  "2418",
  "2447",
  "2458",
  "2475",
  "2537",
  "2556",
  "2561",
  "2590",
  "2593"
]

export const questionCodeToNameMapper = new Map<string, string>([
  ['G4Q00001[SQ001]', 'I like using house rules.'],
  ['G4Q00001[SQ002]', 'I like creating house rules.'],
  ['G4Q00001[SQ003]', 'There are board games that I typically play with house rules.'],
  ['G4Q00001[SQ004]', 'House rules should be shared with other people.'],
  ['G7Q00001[SQ001]', 'I am interested in a house rule exploring tool for board games.'],
  ['G7Q00001[SQ002]', 'I would like to use such a tool myself.'],
  ['G7Q00001[SQ003]', 'I would like to add my house rules to the platform.'],
  ['G8Q00004[SQ001]', 'I want to develop house rules together with other users via a developer page on the platform.'],
  ['G8Q00004[SQ002]', 'I would like to be able to test my house rules with the help of others on the platform by having playtesting tools on the platform.'],
  ['G8Q00004[SQ003]', 'I would like to be able to rate and endorse house rules.'],
  ['G8Q00004[SQ004]', 'I would like to be able to write user reviews for other people’s house rules.'],
  ['G8Q00004[SQ005]', 'I would like to be able to communicate with other users.'],
  ['G8Q00004[SQ006]', 'I would like to be able to keep up to date with new house rules that are added for my favorite games.'],
  ['G8Q00004[SQ007]', 'I would like to be able to explore house rules for games I don’t know yet.'],
  ['G8Q00004[SQ008]', 'I would like to be able to keep up to date with new house rules that are added to the platform.'],
  ['G8Q00004[SQ009]', 'I would like to be able to bookmark house rules for games.'],
  ['G8Q00004[SQ010]', 'I would like to get recommendations for house rules based on the preferences of other users that play similar games as I do.'],
  ['G8Q00004[SQ011]', 'I would like to get recommendations for house rules based on the preferences (e.g., based on personality/player traits) of other users similar to me.'],
  ['G8Q00004[SQ012]', 'I would like to be able to see videos of the house rules (seeing the house rule in play or an explanation video, for example).'],
  ['G8Q00004[SQ013]', 'I would like to be able to see images of the house rules (setup explanations, for example).'],
  ['G8Q00004[SQ014]', 'I would like to be able to see the official rules for the game in addition to the house rules.'],
  ['G8Q00004[SQ015]', 'I would like to be able to differentiate between house rules from hobbyists and professionals (Game designers etc.).'],
  ['G8Q00004[SQ016]', 'I would like to be able to monetize my house rules.'],
  ['G8Q00004[SQ017]', 'I would like to be able to have game elements in which I can make progress (e.g., virtual points, badges, ranks) for my contributions to the platform.'],
  ['G8Q00004[SQ018]', 'I would like to participate in competitions and events.'],
  ['G8Q00004[SQ019]', 'I would like to be able to see the most popular house rules highlighted on the landing page.'],
  ['G6Q00004[SQ002]', 'I have put a lot of effort into creating this house rule.'],
  ['G6Q00004[SQ003]', 'I am proud of this house rule.'],
  ['G6Q00004[SQ004]', 'I enjoyed developing this house rule.'],
  ['G6Q00007[SQ001]', 'The house rule made the game more enjoyable for me.'],
  ['G6Q00007[SQ002]', 'I think that the house rule made the game more enjoyable for my fellow players.'],
  ['G6Q00007[SQ003]', 'The modified game is among my favorite board games.'],
  ['G6Q00013[SQ001]', 'The house rule achieved its goal.'],

]);

export type Agreement = { mean: number, median: number, dev: number, variance: number, size: number, agreement: number, ttest: number, significant: boolean, numbers: number[] };


export function originalOrder(a: KeyValue<any, any>, b: KeyValue<any, any>): number{
  return 0;
};
