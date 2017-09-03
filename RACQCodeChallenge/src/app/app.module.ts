import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MasterComponent } from './master.component';
import { DetailComponent } from './detail.component';

import { DataService } from './services/data.service';

const routes =[
      {
        path: '',
        component: MasterComponent
      },{
        path: 'master',
        component: MasterComponent
      },
      {
        path: 'details',
        component: DetailComponent
      },
      {
        path: '**', redirectTo: ''
      }
      
    ]

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
