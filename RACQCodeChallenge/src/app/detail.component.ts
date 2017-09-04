import { Component, OnInit } from '@angular/core';
import {DataService} from '../app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'question-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})

export class DetailComponent {

    question: any;
    questionComments: any = [];
    questionAnswerThread: any = [];
    answerComments: any = [];
    answers: number = 0;
    answerIds: string;

    constructor(private _dataService: DataService, private _route: ActivatedRoute, private _router: Router) {
        this.question = _dataService.chosenQuestion;
     }

    ngOnInit() {
        this._dataService.getQuestionAnswers(this.question.question_id)
            .subscribe (
                data => {
                    this.questionAnswerThread = data.items;
                    this.questionAnswerThread.forEach(element => {
                        this.answerIds += element.answer_id;
                        this.answerIds += ";";
                    });
                    this.answerIds = this.answerIds.slice(4, this.answerIds.length-1);
                    this._dataService.getAnswerComments(this.answerIds)
                        .subscribe (
                            data => {
                                this.answerComments = data.items;
                            },
                            err => {
                            // handle error TODO
                            },
                            () => {
                                let t = 0;
                           }
                       )
                },
                err => {
                    // handle error TODO
                },
                () => {
                    this.answers = Object.keys(this.questionAnswerThread).length;

                    
                   }
                
               )

            /** Get comments for question */
            this.questionComments = this._dataService.getCommentsForChosenQuestion(this.question.question_id);
            let t = 0;
    }

    
}