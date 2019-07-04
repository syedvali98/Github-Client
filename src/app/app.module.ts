import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Custom Imports
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserViewComponent } from './user-view/user-view.component';
import { SearchComponent } from './search/search.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuardService } from './auth-guard.service';
import { HttpService } from './http.service';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserViewComponent,
    SearchComponent,
    ErrorComponent,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'user/:userId', component:UserViewComponent,canActivate:[AuthGuardService]},
      {path:'', redirectTo:'login', pathMatch:'full'},
      {path:'login', component:LoginComponent},
      {path:'search', component:SearchComponent,canActivate:[AuthGuardService]},
      {path:'error', component:ErrorComponent},
      {path:'**',redirectTo:'error', pathMatch:'full'}
    ]),
  ],
  providers: [AuthGuardService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
