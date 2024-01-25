import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe, orderSearchPipe } from './search.pipe';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MaterialModule } from './material.module';
import { SidenavComponent } from './navbar/sidenav/sidenav.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { BodyComponent } from './body/body.component';
import { HeadersComponent } from './headers/headers.component';
import { SharedModule } from './shared-module/shared.module';
import { SplashScreenModule } from './splash-screen/splash-screen.module';
import { ErrorInterceptor } from './services/core/error-interceptor';
import { JwtInterceptor } from './services/core/jwt-interceptor';
import { AuthGuard } from './services/core/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    orderSearchPipe,
    SidenavComponent,
    AnalyticsComponent,
    BodyComponent,
    HeadersComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    MaterialModule,
    SharedModule,SplashScreenModule
  ],

  providers: [DatePipe,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
  },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
