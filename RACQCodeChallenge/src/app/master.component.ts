import { Component, OnInit} from '@angular/core';
import {DataService} from '../app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent {

  questionIds: any = "";

  constructor(private _dataService: DataService, private _router: Router) {
      
   }
  
  ngOnInit() {
      //this.questions = this._dataService.todaysQuestions;
      if(!this._dataService.todaysQuestions) {
          this._dataService.getTodaysQuestions("ios")
          .subscribe(
            data => {
              this._dataService.todaysQuestions = data.items;
            },
            err => {
              // handle error TODO
            },
            () => {
              this._dataService.todaysQuestions.forEach(element => {
                this.questionIds += element.question_id;
                this.questionIds += ";";
              });
              this.questionIds = this.questionIds.slice(0, this.questionIds.length-1);
              this.fetchComments(this.questionIds);
            }
          )
      }
      
  }

  fetchComments(questionIds) {
    this._dataService.getQuestionComments(questionIds).subscribe (
                data => {
                    this._dataService.todaysQuestionComments = data.items;
                },
                err => {
                  // handle error TODO
                }
              )
  }

  showQuestionDetails(question) {
      this._dataService.chosenQuestion = question;
      this._router.navigate(['/details']);
  }
}
