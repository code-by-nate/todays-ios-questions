import { Component, OnInit } from '@angular/core';
import {DataService} from '../app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'question-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./app.component.css']
})

export class DetailComponent {

    question: any;
    questionAnswerThread: any = [];
    answers: number = 0;

    constructor(private _dataService: DataService, private _route: ActivatedRoute, private _router: Router) {
        this.question = _dataService.chosenQuestion;
     }

    ngOnInit() {
        this._dataService.getQuestionAnswers(this.question.question_id)
            .subscribe (
                data => {
                    this.questionAnswerThread = data.items;
                },
                err => {
                    // handle error TODO
                },
                () => {
                    this.answers = Object.keys(this.questionAnswerThread).length;
                }
            )
    }
}