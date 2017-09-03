import { Component, OnInit } from '@angular/core';
import {DataService} from '../app/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  questions : any[];

  constructor(private _dataService: DataService) { }
  
  ngOnInit() {
      this._dataService.getTodaysQuestions("ios")
          .subscribe(
            data => {
              this.questions = data.items;
            },
            err => {
              // handle error
            }
          )
  }
}
