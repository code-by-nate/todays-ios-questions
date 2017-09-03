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
    chosenQuestion: any = [];

    constructor (private _http: Http) {
       // this.getTodaysQuestions("ios");
     }

    getTodaysQuestions(tag:string) {
        let url = SO_PREFIX_URL + "2.2/questions?fromdate=1504396800&order=desc&sort=activity&tagged=" + tag + "&site=stackoverflow&filter=withbody" + KEY;
        
        return this._http.get(url).map((res:Response)=>res.json())
                 /**  .subscribe(
                       data => {
                            this.todaysQuestions = data.items;
                       },
                       err => {
                           // handle error TODO
                       }
                    
                   )**/
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
        let url = SO_PREFIX_URL;

        return this._http.get(url).map((res:Response) => res.json());
    }

}