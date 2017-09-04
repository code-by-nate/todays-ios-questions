import { Injectable } from '@angular/core';

import { Http, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const SO_PREFIX_URL:string = 'http://api.stackexchange.com/';
const KEY:string = "&key=Nj6GQQcgNBY3w1InUR)Vgg((";

@Injectable()
export class DataService {

    todaysQuestions: any[];
    todaysQuestionComments: any[];
    chosenQuestion: any = [];
    chosenQuestionComments: any[];

    constructor (private _http: Http) {
       // this.getTodaysQuestions("ios");
     }

    getTodaysQuestions(tag:string) {
        let d = Math.round(Date.now()/1000);
       // let url = SO_PREFIX_URL + "2.2/questions?fromdate=" + Math.floor(Date.now()/1000) + "&order=desc&sort=activity&tagged=" + tag + "&site=stackoverflow&filter=withbody" + KEY;
         let url = SO_PREFIX_URL + "2.2/questions?fromdate=1504396800&order=desc&sort=activity&tagged=" + tag + "&site=stackoverflow&filter=withbody" + KEY;
        return this._http.get(url).map((res:Response)=>res.json())
    }

    getQuestionComments(questionIds: string):Observable<any> {
        let url = SO_PREFIX_URL + "2.2/questions/" + questionIds + "/comments?order=desc&sort=creation&site=stackoverflow&filter=withbody" + KEY;

        return this._http.get(url).map((res:Response)=>res.json());
    }

    getQuestionAnswers(questionID):Observable<any> {
        let url = SO_PREFIX_URL + "2.2/questions/" + questionID + "/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody" + KEY;

        return this._http.get(url).map((res:Response)=>res.json());
    }

    getAnswerComments(answerID):Observable<any> {
        let url = SO_PREFIX_URL + "/2.2/answers/" + answerID + "/comments?order=desc&sort=creation&site=stackoverflow&filter=withbody" + KEY;

        return this._http.get(url).map((res:Response) => res.json());
    }

    getCommentsForChosenQuestion(questionID) {
        this.todaysQuestionComments.forEach(element => {
            if(element.question_id == questionID) {
                this.chosenQuestionComments.push(element);
            }
        });
    }

}