import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ExtraOptions,
  PreloadAllModules,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import { TokenInterceptorService } from './guards/auth.interceptor';
import { LoginComponent } from './routes/login/login.component';
import { TeamScoreComponent } from './routes/team-score/team-score.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';import 'bootstrap-icons/font/bootstrap-icons.css';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};
@NgModule({
  declarations: [AppComponent, ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, routerConfig),
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-top-right',
      timeOut: 2500,
    }),
    NgbModule,
  ],
  providers: [
    AppComponent,
    LoginComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
