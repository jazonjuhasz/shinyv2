import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {AngularMaterialModule} from './angular-material.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/headerAndSidenav/header.component';
import {MatButtonModule} from '@angular/material/button';
import {SidenavContainerComponent} from './components/headerAndSidenav/sidenav-container.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {DarkModeComponent} from './components/headerAndSidenav/dark-mode.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LoginComponent} from './components/login.component';
import {RegisterComponent} from './components/register.component';
import {IndexComponent} from './components/index.component';
import {MatCardModule} from '@angular/material/card';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth.interceptor';
import {AnimatedIconComponent} from './components/animated-icon/animated-icon.component';
import {UserComponent} from './components/user.component';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {DeleteModalComponent} from './modals/delete-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NewUserModalComponent} from './modals/new-user-modal.component';
import {NewUserComponent} from './components/new-user.component';
import {MatSelectModule} from '@angular/material/select';
import {FiltersComponent} from './components/filter.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { FeedbackModalComponent } from './modals/feedback-modal.component';
import { GiftComponent } from './components/gift.component';
import { NewGiftComponent } from './components/new-gift.component';
import { NewGiftModalComponent } from './modals/new-gift-modal.component';
import { MyGiftsComponent } from './components/myGifts.component';
import { MatCardElevation } from './directives/matCardElevation'; 
import { FriendsModalComponent } from './modals/friends-modal.component';
import { GiftAwayModalComponent } from './modals/gift-away-modal.component';
import { WishListModalComponent } from './modals/wishlist-modal.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserLimitedComponent } from './components/user-limited.component';

export function appInit(provider: AuthService) {
  return (): Promise<any> => provider.fetchCurrentUserOnApplication();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavContainerComponent,
    DarkModeComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    AnimatedIconComponent,
    UserComponent,
    DeleteModalComponent,
    NewUserModalComponent,
    NewUserComponent,
    FiltersComponent,
    FeedbackModalComponent,
    GiftComponent,
    NewGiftComponent,
    NewGiftModalComponent,
    MyGiftsComponent,
    MatCardElevation,
    FriendsModalComponent,
    GiftAwayModalComponent,
    WishListModalComponent,
    UserLimitedComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonToggleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [AuthService],
      multi: true,
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
