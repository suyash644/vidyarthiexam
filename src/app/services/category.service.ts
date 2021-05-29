import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  //load all categories
  public getAllCategories(){
    return this._http.get(`${baserUrl}/category/`);
  }

  //add category
  public addCategory(category:any){
    return this._http.post(`${baserUrl}/category/`,category);
  }
}
