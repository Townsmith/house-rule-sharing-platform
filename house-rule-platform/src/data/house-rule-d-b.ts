import {Tag} from './tag';
import {UserFilled} from './user-d-b';
import {ImageDBOptions} from './image-d-b';
import {CommentDB, ReviewDB} from './review-d-b';
import {GameInfoDB} from './game-info-d-b';

export class HouseRuleDB {
	// my id
	id: number;

	title: string;
	description: string;
	complexity: number;
	video_embedding: string;
	officialRulesDescription: string;
	officialRulesLink: string;
	testing: boolean;
	userAddedTags: Tag[];
	game_edition: string;
	version: number;

	// IDs
	author: number;
	game_info: number;
	tags: number[];
	parent: number;
	variants: number[];
	reviews: number[];
	user_favorites: number[];
	user_likes: number[];
	user_dislikes: number[];
	comments: number[];

	// Thumbnail
	thumbnail: number;
	gallery: number[];

	//External Refs
	BGGGameID: number;

	//Date
	createdAt: string;

	constructor(hrfake: HouseRuleWrapper) {
		this.id = hrfake.id;
		this.version = hrfake.attributes.version;
		this.title = hrfake.attributes.title;
		this.game_edition = hrfake.attributes.game_edition;
		this.description = hrfake.attributes.description;
		this.complexity = hrfake.attributes.complexity;
		this.video_embedding = hrfake.attributes.video_embedding;
		this.officialRulesDescription = hrfake.attributes.officialRulesDescription;
		this.officialRulesLink = hrfake.attributes.officialRulesLink;

		this.author = hrfake.attributes.author;
		this.createdAt = hrfake.attributes.createdAt;

		if (hrfake.attributes.tags == null) {
			// @ts-ignore
			hrfake.attributes.tags = {data: null};
		}
		this.tags = [];

		// @ts-ignore
		if (hrfake.attributes.tags.data) {
			// @ts-ignore
			this.tags = hrfake.attributes?.tags?.data.map(x => {
				return x.id;
			});
		} else {
			if (hrfake.attributes.tags.map) {
				this.tags = hrfake.attributes?.tags.map(x => {
					// @ts-ignore
					return x.id;
				});
			}
		}


		if (hrfake.attributes.parent == null) {
			// @ts-ignore
			hrfake.attributes.parent = {data: null};
		}
		this.parent = hrfake.attributes.parent;


		// @ts-ignore
		if (this.parent.data) {
			// @ts-ignore
			this.parent = this.parent.data.id;
		} else {
			// @ts-ignore
			if (this.parent.id) {
				// @ts-ignore
				this.parent = this.parent.id;
			}
		}


		this.variants = hrfake.attributes.variants;
		if (this.variants === undefined) {
			this.variants = [];
		}

		if (hrfake.attributes.reviews == null) {
			// @ts-ignore
			hrfake.attributes.reviews = {data: []};
		}

		// @ts-ignore
		if (hrfake.attributes.reviews.data) {
			// @ts-ignore
			this.reviews = hrfake.attributes.reviews.data?.map(x => x.id);
		} else {
			// @ts-ignore
			this.reviews = hrfake.attributes.reviews.map(x => x.id);
		}

		if (this.reviews == null) {
			this.reviews = [];
		}

		if (hrfake.attributes.comments == null) {
			// @ts-ignore
			hrfake.attributes.comments = {data: []};
		}

		// @ts-ignore
		if (hrfake.attributes.comments.data) {
			// @ts-ignore
			this.comments = hrfake.attributes.comments.data?.map(x => x.id);
		} else {
			// @ts-ignore
			this.comments = hrfake.attributes.comments.map(x => x.id);
		}

		if (this.comments == null) {
			this.comments = [];
		}

		if (hrfake.attributes.user_favorites == null) {
			// @ts-ignore
			hrfake.attributes.user_favorites = {data: []};
		}

		// @ts-ignore
		if (hrfake.attributes.user_favorites.data) {
			// @ts-ignore
			this.user_favorites = hrfake.attributes.user_favorites.data?.map(x => x.id);
		} else {
			// @ts-ignore
			this.user_favorites = hrfake.attributes.user_favorites.map(x => x.id);
		}

		if (this.user_favorites == null) {
			this.user_favorites = [];
		}


		if (hrfake.attributes.user_likes == null) {
			// @ts-ignore
			hrfake.attributes.user_likes = {data: []};
		}
		// @ts-ignore
		if (hrfake.attributes.user_likes.data) {
			// @ts-ignore
			this.user_likes = hrfake.attributes.user_likes.data?.map(x => x.id);
		} else {
			// @ts-ignore
			this.user_likes = hrfake.attributes.user_likes.map(x => x.id);
		}

		if (this.user_likes == null) {
			this.user_likes = [];
		}


		if (hrfake.attributes.user_dislikes == null) {
			// @ts-ignore
			hrfake.attributes.user_dislikes = {data: []};
		}

		// @ts-ignore
		if (hrfake.attributes.user_dislikes.data) {
			// @ts-ignore
			this.user_dislikes = hrfake.attributes.user_dislikes.data?.map(x => x.id);
		} else {
			// @ts-ignore
			this.user_dislikes = hrfake.attributes.user_dislikes.map(x => x.id);
		}

		if (this.user_dislikes == null) {
			this.user_dislikes = [];
		}


		this.testing = hrfake.attributes.testing;
		this.userAddedTags = hrfake.attributes.userAddedTags;


		if (hrfake.attributes.thumbnail == null) {
			// @ts-ignore
			hrfake.attributes.thumbnail = {data: {id: undefined}};
		}
		// @ts-ignore
		if (hrfake.attributes.thumbnail.data) {
			// @ts-ignore
			this.thumbnail = hrfake.attributes.thumbnail.data?.id;
		} else {
			// @ts-ignore
			this.thumbnail = hrfake.attributes.thumbnail.id;
		}


		if (hrfake.attributes.gallery == null) {
			// @ts-ignore
			hrfake.attributes.gallery = {data: []};
		}
		// @ts-ignore
		if (hrfake.attributes.gallery.data != null) {
			// @ts-ignore
			this.gallery = hrfake.attributes.gallery.data.map(x => x.id);
		} else {
			// @ts-ignore
			hrfake.attributes.gallery = [];
			// @ts-ignore
			this.gallery = hrfake.attributes.gallery.map(x => x.data.id);
		}


		this.BGGGameID = hrfake.attributes.BGGGameID;

	}


}

export class HouseRuleFilled extends HouseRuleDB {
	rating: number;

	tagsFilled: Tag[];

	authorFilled: UserFilled;
	thumbnailData: ImageDBOptions;
	galleryData: ImageDBOptions[];

	parentFilled: HouseRuleDB;
	variantsFilled: HouseRuleDB[];

	reviewsFilled: ReviewDB[];
	reviewComplexity: number;

	commentsFilled: CommentDB[];

	gameInfoFilled: GameInfoDB;

	constructor(hrfake: HouseRuleWrapper) {
		super(hrfake);
		if (this.user_likes === undefined) {
		}
		this.rating = this.user_likes.length - this.user_dislikes.length;

		// @ts-ignore
		if (hrfake.attributes.thumbnail?.data) {
			// @ts-ignore
			this.thumbnailData = hrfake.attributes.thumbnail?.data?.attributes?.formats;
		} else {
			// @ts-ignore
			this.thumbnailData = hrfake.attributes.thumbnail.formats;
		}

		if (hrfake.attributes.gallery == null) {
			// @ts-ignore
			hrfake.attributes.gallery = {data: null};
		}

		// @ts-ignore
		if (hrfake.attributes.gallery?.data) {
			// @ts-ignore
			this.galleryData = hrfake.attributes.gallery?.data.map(x => {
              if (x.attributes) {
                return x.attributes.formats;
              } else {
                if (x.formats) {
                  return x.formats;
                }
              }
            });
		} else {
			// @ts-ignore
			this.galleryData = hrfake.attributes.gallery.formats;
		}


		// @ts-ignore
		if (hrfake.attributes.tags.data) {
			// @ts-ignore
			this.tagsFilled = hrfake.attributes.tags.data?.map(x => {
				return new Tag(x.attributes.name, x.id);
			});
		} else {
			if (hrfake.attributes.tags.map) {
				this.tagsFilled = hrfake.attributes.tags.map(x => {
					// @ts-ignore
					return new Tag(x.name, x.id);
				});
			}
		}


		if (hrfake.attributes.author == null) {
			// @ts-ignore
			hrfake.attributes.author = {data: null};
		}

		// @ts-ignore
		if (hrfake.attributes.author.data) {
			// @ts-ignore
			this.authorFilled = new UserFilled(hrfake.attributes.author.data?.id, hrfake.attributes.author.data?.attributes);
		} else {
			this.authorFilled = undefined;
		}

		if (hrfake.attributes.game_info == null) {
			// @ts-ignore
			hrfake.attributes.game_info = {data: {attributes: null}};
		}
		// @ts-ignore
		if (hrfake.attributes.game_info.data) {
			// @ts-ignore
			this.gameInfoFilled = hrfake.attributes.game_info.data.attributes;
			if (this.gameInfoFilled !== null) {
				// @ts-ignore
				this.gameInfoFilled.game_designers = this.gameInfoFilled.game_designers.data.map(x => x.attributes);
				// @ts-ignore
				this.gameInfoFilled.game_categories = this.gameInfoFilled.game_categories.data.map(x => x.attributes);
			}
		} else {
			this.gameInfoFilled = undefined;
		}


		// @ts-ignore
		if (hrfake.attributes.parent.data) {
			// @ts-ignore
			this.parentFilled = new HouseRuleDB(hrfake.attributes.parent.data);
		} else {
			// @ts-ignore
			this.parentFilled = null;
		}

		this.commentsFilled = [];
		// @ts-ignore
		this.commentsFilled = hrfake.attributes.comments.data?.map(x => new CommentDB(x.id, x.attributes));
		this.commentsFilled?.forEach(x => x.house_rule = this.id);
		if (this.commentsFilled == null) {
			this.commentsFilled = [];
		}

		this.reviewsFilled = [];
		// @ts-ignore
		this.reviewsFilled = hrfake.attributes.reviews.data?.map(x => new ReviewDB(x.id, x.attributes));
		this.reviewsFilled?.forEach(x => x.house_rule = this.id);
		if (this.reviewsFilled == null) {
			this.reviewsFilled = [];
		}

		this.reviewComplexity = 0;
		for (const rev of this.reviewsFilled) {
			this.reviewComplexity += rev.complexity;
		}
		if (this.reviewsFilled.length > 0) {
			this.reviewComplexity = Math.round(this.reviewComplexity / this.reviewsFilled.length);
		}

		this.variantsFilled = [];
	}
}


export interface HouseRuleWrapper {
	id: number;
	attributes: HouseRuleDB;
}
