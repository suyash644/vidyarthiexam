import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionOfQuiz(quizid:any){
    return this._http.get(`${baserUrl}/question/quiz/all/${quizid}`);
  }

  public addQuestionOfQuiz(question:any){
    return this._http.post(`${baserUrl}/question/`, question);
  }

  public deleteQuestionById(questionid:any){
    return this._http.delete(`${baserUrl}/question/${questionid}`);
  }
}
