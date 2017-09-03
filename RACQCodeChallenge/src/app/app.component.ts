import { Component, OnInit } from '@angular/core';
import {DataService} from '../app/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  questions : any[];
  questionIds: any = "";
  questionComments: any[];
  numComments = 0;

  constructor(private _dataService: DataService) { }
  
  ngOnInit() {
      this._dataService.getTodaysQuestions("ios")
          .subscribe(
            data => {
              this.questions = data.items;
            },
            err => {
              // handle error
            },
            () => {
              this.questions.forEach(element => {
                this.questionIds += element.question_id;
                this.questionIds += ";";
              });
              this.questionIds = this.questionIds.slice(0, this.questionIds.length-1);
              this._dataService.getQuestionComments(this.questionIds).subscribe (
                data => {
                    this.questionComments = data.items;
                }
              )
            }
          )
  }

  fetchComments(questionIds) {
    
  }
}
