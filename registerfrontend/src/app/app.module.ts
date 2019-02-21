import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import { AppRoutingModule, routingComponents } from './/app-routing.module';
import {RouterModule} from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DashboardComponent,
    NavbarComponent,
    
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [AuthService,ValidateService,AuthGuard],
  bootstrap: [AppComponent],
  exports:[HttpModule]
})
export class AppModule { }
