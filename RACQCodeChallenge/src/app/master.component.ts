import { Component, OnInit} from '@angular/core';
import {DataService} from '../app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit{

  questionIds: any = "";
  numComments = 0;

  constructor(private _dataService: DataService, private _router: Router) {
      
   }
  
  ngOnInit() {
      if(!this._dataService.todaysQuestions) {
          this.fetchQuestions("ios");
      }
      
  }

  fetchQuestions(tag) {
    if(this._dataService.isConnected) {
        this._dataService.getTodaysQuestions(tag)
          .subscribe(
            data => {
              this._dataService.todaysQuestions = data.items;
            },
            err => {
              // handle error TODO
            },
            () => {
              this._dataService.updatePoll(this._dataService.todaysQuestions[0].last_activity_date);
              this._dataService.saveTodaysQuestions();
              if(this._dataService.todaysQuestions != null) {
                  this._dataService.todaysQuestions.forEach(element => {
                      this.questionIds += element.question_id;
                      this.questionIds += ";";
                  });
                  this.questionIds = this.questionIds.slice(0, this.questionIds.length-1);
                  this.fetchComments(this.questionIds);
              }
            }
          )
    } else {
      // check if there is saved data in local storage
      this._dataService.restoreTodaysQuestions();
    }
      
  }

  fetchComments(questionIds) {
    if(this._dataService.isConnected) {
        this._dataService.getQuestionComments(questionIds).subscribe (
                data => {
                    this._dataService.todaysQuestionComments = data.items;
                },
                err => {
                  // handle error TODO
                },
                () => {
                    this._dataService.saveQuestionComments();
                }
              )
    } else {
        this._dataService.restoreQuestionComments();
    }
    
  }

  showQuestionDetails(question) {
      this._dataService.chosenQuestion = question;
      this._router.navigate(['/details']);
  }

  refreshQuestions() {
     this.fetchQuestions("ios");  
  }

  getNumComments(questionID) {
    if(this._dataService.todaysQuestionComments != null) {
        this._dataService.todaysQuestionComments.forEach(element => {
            if(element.post_id == questionID) {
                this.numComments++;
            }
      });
    }
    return this.numComments;
  }

  resetCommentCount() {
    this.numComments = 0;
  }

}
