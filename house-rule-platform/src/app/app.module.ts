import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AnalysisComponent} from './analysis/analysis.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LikertDisplayComponent} from './likert-display/likert-display.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ProfileComponent} from './profile/profile.component';
import {SearchComponent} from './search/search.component';
import {HouseRuleCardComponent} from './house-rule-card/house-rule-card.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {HouseRuleCreateComponent} from './house-rule-create/house-rule-create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AnimatedIconComponent} from './animated-icon/animated-icon.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {TagPillComponent} from './tag-pill/tag-pill.component';
import {MatRadioModule} from '@angular/material/radio';
import {HouseRuleViewComponent, SafePipe} from './house-rule-view/house-rule-view.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatOptionModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {LoaderComponent} from './loader/loader.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {HrSearchbarComponent} from './hr-searchbar/hr-searchbar.component';
import {MatSelectModule} from '@angular/material/select';
import {HrResolver} from './hr.resolver';
import {TagResolver} from './tag.resolver';
import {BggUserResolver} from './bgg-user.resolver';
import {UserResolver} from './user.resolver';
import {SingleHrResolver} from './single-hr.resolver';
import {MatTabsModule} from '@angular/material/tabs';
import {UserHrsResolver} from './user-hrs.resolver';
import {ReviewComponent} from './review/review.component';
import {UserReviewsResolver} from './user-reviews.resolver';
import {TopMonthHrResolver} from './top-month-hr.resolver';
import {TopMonthDiscResolver} from './top-month-disc.resolver';
import {CatResolver} from './cat.resolver';
import {TopGameHrResolver} from './top-game-hr.resolver';
import { CommentComponent } from './comment/comment.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  // {path: 'analysis', component: AnalysisComponent},
  {
    path: 'create/:parent/:parentName/:gameName/:version', component: HouseRuleCreateComponent, resolve: {
      tags: TagResolver
    }
  },
  {
    path: 'create', component: HouseRuleCreateComponent, resolve: {
      tags: TagResolver
    }
  },
  {path: 'login', component: LoginComponent},
  {
    path: 'user/:id', component: ProfileComponent, resolve: {
      user: UserResolver,
      bgg: BggUserResolver,
      hrs: UserHrsResolver,
      tags: TagResolver,
      cats: CatResolver,
      reviews: UserReviewsResolver
    }
  },
  {
    path: 'user', component: ProfileComponent, resolve: {
      user: UserResolver,
      bgg: BggUserResolver,
      hrs: UserHrsResolver,
      tags: TagResolver,
      cats: CatResolver,
      reviews: UserReviewsResolver
    }
  },
  {
    path: 'search/:playtest', component: SearchComponent, resolve: {
      hrs: HrResolver,
      tags: TagResolver,
      cats: CatResolver
    }
  },
  {
    path: 'search', component: SearchComponent, resolve: {
      hrs: HrResolver,
      tags: TagResolver,
      cats: CatResolver
    }
  },
  {
    path: 'explore/:explore', component: SearchComponent, resolve: {
      hrs: HrResolver,
      tags: TagResolver,
      cats: CatResolver
    }
  },
  {
    path: 'rule/:id', component: HouseRuleViewComponent, resolve: {
      hr: SingleHrResolver,
    }
  },
  {
    path: '**', component: HomeComponent, resolve: {
      top: TopMonthHrResolver,
      disc: TopMonthDiscResolver,
      game: TopGameHrResolver
    }
  },
];

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(
			appRoutes,
		),
		ReactiveFormsModule,
		MatTooltipModule,
		FormsModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatIconModule,
		MatSlideToggleModule,
		MatRadioModule,
		MatAutocompleteModule,
		MatOptionModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatStepperModule,
		MatSelectModule,
		MatTabsModule,
		NgbModule,
	],
  declarations: [
    AppComponent,
    AnalysisComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LikertDisplayComponent,
    LoginComponent,
    ProfileComponent,
    SearchComponent,
    HouseRuleCardComponent,
    HouseRuleCreateComponent,
    AnimatedIconComponent,
    TagPillComponent,
    HouseRuleViewComponent,
    SafePipe,
    LoaderComponent,
    HrSearchbarComponent,
    ReviewComponent,
    CommentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
