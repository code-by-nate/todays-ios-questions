import { Component, OnInit } from '@angular/core';
import {DataService} from '../app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./app.component.css']
})
export class MasterComponent {

  questions : any[];
  questionIds: any = "";
  questionComments: any[];
  numComments = 0;

  constructor(private _dataService: DataService, private _router: Router) { }
  
  ngOnInit() {
      this._dataService.getTodaysQuestions("ios")
          .subscribe(
            data => {
              this.questions = data.items;
            },
            err => {
              // handle error TODO
            },
            () => {
              this.questions.forEach(element => {
                this.questionIds += element.question_id;
                this.questionIds += ";";
              });
              this.questionIds = this.questionIds.slice(0, this.questionIds.length-1);
              this.fetchComments(this.questionIds);
            }
          )
  }

  fetchComments(questionIds) {
    this._dataService.getQuestionComments(questionIds).subscribe (
                data => {
                    this.questionComments = data.items;
                },
                err => {
                  // handle error TODO
                }
              )
  }

  showQuestionDetails(question) {
      this._router.navigate(['/details']);
  }
}
