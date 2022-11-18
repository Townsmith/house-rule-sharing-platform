export interface BGGBoardGameData {
  _objectid: any;
  name: BGGName;
  image: string;
  thumbnail: string;
  _id: string;
  yearpublished: { _value: string };
  minplayers: { _value: string };
  maxplayers: { _value: string };
  minage: { _value: string };
  description: string;
}

export interface BGGSearchData {
  _id: string;
  yearpublished: { _value: string };
  name: BGGName;
}

interface BGGName {
  __text: any;
  _type: string;
  _value: string;
}

export interface BGGV1Data {
  _objectid: string;
  __text: string;
}

export interface BGGV1 {
  age: string;
  boardgameaccessory: BGGV1Data[];
  boardgameartist: BGGV1Data[];
  boardgamecategory: BGGV1Data[];
  boardgamecompilation: BGGV1Data[];
  boardgamedesigner: BGGV1Data;
  boardgameexpansion: BGGV1Data[];
  boardgamefamily: BGGV1Data[];
  boardgamehonor: BGGV1Data[];
  boardgameimplementation: BGGV1Data[];
  boardgamemechanic: BGGV1Data[];
  boardgamepodcastepisode: BGGV1Data[];
  boardgamepublisher: BGGV1Data[];
  boardgamesubdomain: BGGV1Data[];
  boardgameversion: BGGV1Data[];
  commerceweblink: BGGV1Data[];
  description: string;
  image: string;
  maxplayers: string;
  maxplaytime: string;
  minplayers: string;
  minplaytime: string;
  name: BGGV1Data[];
  poll: BGGV1Data[];
  thumbnail: string;
  videogamebg: BGGV1Data[]
  yearpublished: string;
  _objectid: string;
}


export function boardGameSorting(res: BGGSearchData[], term: string) {
  if (term == null) {
    term = '';
  }
  term = term.toLowerCase().trim();
  return res.sort((bgA, bgB) => {
    const nameA = bgA.name._value.toLowerCase();
    const nameB = bgB.name._value.toLowerCase();
    if (nameA == term) {
      return -1;
    }
    if (nameB == term) {
      return 1;
    }
    if (nameA.startsWith(term)) {
      return -1;
    }
    if (nameB.startsWith(term)) {
      return 1;
    }
    if (nameA.endsWith(term)) {
      return -1;
    }
    if (nameB.endsWith(term)) {
      return 1;
    }
    return 0;
  })
}
