import { Injectable } from '@angular/core';

import { Http, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CoolLocalStorage } from 'angular2-cool-storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const SO_PREFIX_URL:string = 'http://api.stackexchange.com/';
const KEY:string = "&key=Nj6GQQcgNBY3w1InUR)Vgg((";

@Injectable()
export class DataService {

    isConnected: boolean;

    todaysQuestions: any[];
    todaysQuestionComments: any[];
    chosenQuestion: any = [];
    chosenQuestionComments: any = [];;
    chosenQuestionAnswer: any[];

    lastPollDate: string = "0";

    localStorage: CoolLocalStorage;

    constructor (private _http: Http, _localStorage: CoolLocalStorage) { 
        this.localStorage = _localStorage;
        /** Check Internet Connection */
        this.isConnected  = navigator.onLine
    }

    /** Stackoverflow API Calls */

    getTodaysQuestions(tag:string) {
        let url = SO_PREFIX_URL + "2.2/questions?fromdate=" + this.getCurrentDateUnixEpochFormat(false) + "&order=desc&sort=activity&tagged=" + tag + "&site=stackoverflow&filter=withbody" + KEY;
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

    getAnswerComments(answerIDs: string):Observable<any> {
        let url = SO_PREFIX_URL + "2.2/answers/" + answerIDs + "/comments?order=desc&sort=creation&site=stackoverflow&filter=withbody" + KEY;

        return this._http.get(url).map((res:Response) => res.json());
    }

    getCommentsForChosenQuestion(questionID) {
        this.chosenQuestionComments = [];
        this.todaysQuestionComments.forEach(element => {
            if(element.post_id == questionID) {
                this.chosenQuestionComments.push(element);
            }
        });
    }

    /** Persist to Local Storage */
    saveTodaysQuestions() {
        this.localStorage.setItem("questions", JSON.stringify(this.todaysQuestions));
    }

    restoreTodaysQuestions() {
        if(this.localStorage.tryGetObject("questions")) {
            this.todaysQuestions = JSON.parse(this.localStorage.getItem("questions"));
        }
    }

    saveQuestionComments() {
        this.localStorage.setItem("todaysQuestionsComments", JSON.stringify(this.todaysQuestionComments));
    }

    restoreQuestionComments() {
        if(this.localStorage.tryGetObject("todaysQuestionsComments")) {
            this.todaysQuestionComments = JSON.parse(this.localStorage.getItem("todaysQuestionsComments"));
        }
    }

    /**saveQuestionAnswers() {
        this.localStorage.setItem("todaysQuestionsComments", JSON.stringify(this.s));
    }**/

    private
    getCurrentDateUnixEpochFormat(time: boolean):string {

        if(this.lastPollDate == "0") {
            return this.lastPollDate;
        }

        let todaysDate = new Date ();
        if(!time) {
            /** We only need date so set time to 0 (nil) */
            todaysDate.setUTCHours   (0);
            todaysDate.setUTCMinutes (0);
            todaysDate.setUTCSeconds (0);
        }

        return Math.round (todaysDate.getTime() / 1000).toString();
    }

    updatePoll(lastActivity: string) {
        this.lastPollDate = lastActivity;
    }

   

}