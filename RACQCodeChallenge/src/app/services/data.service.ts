import { Injectable } from '@angular/core';

import { Http, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const SO_PREFIX_URL:string = 'http://api.stackexchange.com/';

@Injectable()
export class DataService {

    constructor (private _http: Http) {

    }

    getTodaysQuestions(tag:string):Observable<any> {
        let url = SO_PREFIX_URL + "2.2/questions?fromdate=1504310400&order=desc&sort=activity&tagged=" + tag + "&site=stackoverflow";

        return this._http.get(url).map((res:Response)=>res.json());
    }

    getQuestionComments(questionIds: string):Observable<any> {
        let url = SO_PREFIX_URL + "2.2/questions/" + questionIds + "/comments?order=desc&sort=creation&site=stackoverflow&filter=withbody";

        return this._http.get(url).map((res:Response)=>res.json());
    }

}