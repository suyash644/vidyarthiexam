import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  categoryid:any;
  constructor(private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryid = this._route.snapshot.params.categoryid;
    if(this.categoryid == 0){
      console.log("load all the quiz")
    }else{
      console.log("load specific quiz");
    }
    
  }

}
