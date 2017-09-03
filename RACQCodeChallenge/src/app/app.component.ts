import { Component, OnInit } from '@angular/core';
import {DataService} from '../app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet><router-outlet>
  `,
})
export class AppComponent {
}
