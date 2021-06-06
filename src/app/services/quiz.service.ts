import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }
  public getQuiz(){
    return this._http.get(`${baserUrl}/quiz/`);
  }

  public addQuiz(quizData:any){
    return this._http.post(`${baserUrl}/quiz/`,quizData);
  }

  public deleteQuiz(quizId:BigInteger){
    return this._http.delete(`${baserUrl}/quiz/${quizId}`);
  }

  //method to get quiz by id
  public getQuizById(quizid:any){
    return this._http.get(`${baserUrl}/quiz/${quizid}`);
  }

  // quiz to update
  public updateQuiz(quizData:any){
    return this._http.put(`${baserUrl}/quiz/`,quizData);
  }
}
