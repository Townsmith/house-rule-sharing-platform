export interface GameInfoDB {
  BGGGameID: number;
  thumbnail: string;
  name: string;
  yearpublished: string;
  game_categories: GameCategoryDB[];
  game_designers: GameDesignerDB[];
}

export interface GameCategoryDB {
  name: string;
}

export interface GameDesignerDB {
  name: string;
}
